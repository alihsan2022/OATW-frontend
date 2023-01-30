import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import emailJs from "@emailjs/browser";
import axios from "axios";

import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

const getOrphanages = async () => {
  let orphanages = [];
  const q = query(collection(db, "orphanage/"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    orphanages.push(doc.id);
  });

  return orphanages;
};

const getAllLetters = async (orphanageName) => {
  let letters = [];
  const q = query(
    collection(db, `orphanage/${orphanageName}/lettersToApprove`)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    letters.push(doc.data());
  });
  return letters;
};

const getAllVideos = async (orphanageName) => {
  let videos = [];
  const q = query(collection(db, `orphanage/${orphanageName}/videosToApprove`));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    videos.push(doc.data());
  });
  return videos;
};

const getAllUsers = async () => {
  let users = [];
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users;
};

const editUserRole = async (user, userRole, name) => {
  let data = {
    userRole: userRole,
    orphanageName: name,
  };

  const userRef = collection(db, "users");
  const q = query(userRef, where("email", "==", user.email));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((document) => {
    const docRef = doc(db, "users", document.id);
    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("User role has been updated");
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const videoApproval = async (status, video, orphanageName) => {
  let uploaderEmail = video.uploader;

  console.log(video);
  let data = {
    status: status,
  };
  console.log(data);
  const videoRef = collection(db, `orphanage/${orphanageName}/videosToApprove`);
  const q = query(videoRef, where("videoId", "==", video.videoId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    updateVideoStatusForUser(
      video.videoId,
      orphanageName,
      video.orphanId,
      status
    );
    const docRef = doc(
      db,
      `orphanage/${orphanageName}/videosToApprove`,
      document.id
    );
    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("Video status has been updated");
        sendEmailVideoApprovalNotification(video);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const sendEmailLetterApprovalNotification = async (letter) => {
  console.log("Attempting to send letter notification.");
  await axios
    .post(
      "https://oatw-server-draz.vercel.app/sendLetterApprovedNotification",
      letter
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const sendEmailVideoApprovalNotification = async (video) => {
  console.log("Attempting to send video notification.");
  await axios
    .post(
      "https://oatw-server-draz.vercel.app/sendVideoApprovedNotification",
      video
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const letterApproval = async (status, letter, orphanageName) => {
  let data = {
    status: status,
  };
  console.log(data);
  const letterRef = collection(
    db,
    `orphanage/${orphanageName}/lettersToApprove`
  );
  const q = query(letterRef, where("letterId", "==", letter.letterId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((document) => {
    updateLetterStatusForUser(
      letter.letterId,
      orphanageName,
      letter.orphanId,
      status
    );
    const docRef = doc(
      db,
      `orphanage/${orphanageName}/lettersToApprove`,
      document.id
    );
    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("Letter status has been updated");
        sendEmailLetterApprovalNotification(letter);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const updateVideoStatusForUser = async (
  videoId,
  orphanageName,
  orphanId,
  status
) => {
  const orphanRef = collection(db, `orphanage/${orphanageName}/orphans`);
  const q = query(orphanRef, where("id", "==", orphanId));
  const querySnapshot = await getDocs(q);

  let data = {
    status: status,
  };
  querySnapshot.forEach((document) => {
    let fetchedData = document.data().videos;
    var videoInArr = fetchedData.findIndex((item) => item.videoId === videoId);
    console.log(videoInArr);
    if (videoInArr != null || videoInArr != undefined) {
      fetchedData[videoInArr].status = true;
    }
    console.log(fetchedData);

    const docRef = doc(db, `orphanage/${orphanageName}/orphans`, document.id);
    updateDoc(docRef, {
      videos: fetchedData,
    });
  });
};

const updateLetterStatusForUser = async (
  letterId,
  orphanageName,
  orphanId,
  status
) => {
  console.log(letterId);

  const orphanRef = collection(db, `orphanage/${orphanageName}/orphans`);
  const q = query(orphanRef, where("id", "==", orphanId));
  const querySnapshot = await getDocs(q);

  let data = {
    status: status,
  };

  querySnapshot.forEach((document) => {
    let fetchedData = document.data().letters;
    var letterInArr = fetchedData.findIndex(
      (item) => item.letterId === letterId
    );
    console.log(letterInArr);
    if (letterInArr != null || letterInArr != undefined) {
      fetchedData[letterInArr].status = true;
    }
    console.log(fetchedData);

    const docRef = doc(db, `orphanage/${orphanageName}/orphans`, document.id);
    updateDoc(docRef, {
      letters: fetchedData,
    });
  });
};

const removeLetterFromApprovalList = (letter, orphanage) => {};

export {
  getOrphanages,
  getAllUsers,
  editUserRole,
  getAllLetters,
  letterApproval,
  removeLetterFromApprovalList,
  getAllVideos,
  videoApproval,
};
