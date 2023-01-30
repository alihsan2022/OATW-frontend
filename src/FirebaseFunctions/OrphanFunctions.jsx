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

import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

function getRandomNumberInRange() {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

  var str = "";
  for (var i = 0; i < 10; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

const getOrphansList = async (orphanageName) => {
  const dataArray = [];

  const orphansRef = collection(db, `orphanage/${orphanageName}/orphans`);
  const q = query(orphansRef);
  const s = await getDocs(q);
  s.docs.map((d) => {
    dataArray.push(d.data());
  });
  return dataArray;
};

const uploadProfilePhoto = async (
  file,
  orphanId,
  orphanageId,
  orphanageName
) => {
  console.log(orphanId);
  const metaData = {
    contentType: "image/jpeg",
  };
  const orphanFolderRef = ref(storage, `profilePics/${orphanId}ProfilePic`);
  const uploadTask = uploadBytesResumable(orphanFolderRef, file, metaData);
  let downloadUrl;
  await uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      return getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        updateOrphanProfilePic(orphanId, url, orphanageName);

        return url;
      });
    }
  );
};

const updateOrphanProfilePic = async (
  orphanId,
  profilePicUrl,
  orphanageName
) => {
  const data = {
    profilePic: profilePicUrl,
  };

  console.log(orphanId);

  const orphansRef = collection(db, `orphanage/${orphanageName}/orphans`);
  const q = query(orphansRef, where("id", "==", orphanId));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((document) => {
    const docRef = doc(db, `orphanage/${orphanageName}/orphans`, document.id);
    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("Profile Pic has been updated in orphans.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const allOrphansref = collection(db, `allOrphans`);
  const p = query(allOrphansref, where("id", "==", orphanId));
  const querySnapshotP = await getDocs(p);
  querySnapshotP.forEach((document) => {
    const docRef = doc(db, `allOrphans`, document.id);
    updateDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("Profile Pic has been updated in allOrphans.");
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const orphanDetailsUpdate = async (orphanData, orphanId, orphanageName) => {
  console.log(orphanageName);
  const orphansRef = collection(db, `orphanage/${orphanageName}/orphans`);
  const q = query(orphansRef, where("id", "==", orphanId));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((document) => {
    const docRef = doc(db, `orphanage/${orphanageName}/orphans`, document.id);
    setDoc(docRef, orphanData, { merge: true })
      .then((docRef) => {
        console.log("Data has been updated.");
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const addOrphanToBin = async (orphan, docId, orphanageName) => {
  const rubbishRef = collection(db, `allOrphans`);

  const q = query(rubbishRef, where("id", "==", orphan.id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((document) => {
    const docRef = doc(db, `allOrphans`, document.id);

    let data = {
      notDeleted: false,
    };

    updateDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("Data has been updated.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // addDoc(rubbishRef, orphan, orphan.id)
  //   .then((docRef) => {
  //     console.log("Orphan has been added to bin.");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

const getLetters = async (orphanId, orphanageName) => {
  const orphansRef = collection(db, "orphanage/${orphanageName}/orphans");
  const q = query(orphansRef, where("id", "==", orphanId));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach(async (document) => {
    const docRef = doc(db, "orphanage/turkey/orphans", document.id);
    const docSnap = await getDoc(docRef);
    data.push(docSnap.data());
  });
  return data;
};

const uploadOrphanLetter = async (
  file,
  orphanId,
  orphanageName,
  orphanFirstname,
  orphanLastname
) => {
  const user = auth.currentUser;
  const orphanRef = collection(db, `orphanage/${orphanageName}/orphans`);
  const q = query(orphanRef, where("id", "==", orphanId));
  const querySnapshot = await getDocs(q);

  let id = getRandomNumberInRange();
  const orphanFolderRef = ref(storage, `letter/${orphanId}/${file.name}`);
  const uploadTask = uploadBytesResumable(orphanFolderRef, file);
  await uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;

        // ...

        case "storage/unknown":
          break;
      }
    },
    async () => {
      // Upload completed successfully, now we can get the download URL
      let url = await getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadUrl) => {
          return downloadUrl;
        }
      );

      let data = {
        fileName: file.name,
        filePath: file.path,
        status: false,
        urlDownload: url,
        orphanageName: orphanageName,
        orphanId: orphanId,
        letterId: getRandomNumberInRange(),
        uploader: user.email,
        orphanfirstName: orphanFirstname,
        orphanLastname: orphanLastname,
      };

      console.log(data);

      querySnapshot.forEach((document) => {
        let fetchedData = document.data().letters;
        fetchedData.push(data);

        const docRef = doc(
          db,
          `orphanage/${orphanageName}/orphans`,
          document.id
        );
        updateDoc(docRef, {
          letters: fetchedData,
        });
      });

      let dbRef = collection(db, `orphanage/${orphanageName}/lettersToApprove`);
      addDoc(dbRef, data)
        .then((docRef) => {
          console.log("Document has been added");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // await addDoc(colRef, data);
  );
};

const uploadVideo = async (
  file,
  orphanId,
  orphanageName,
  orphanFirstName,
  orphanLastName
) => {
  const user = auth.currentUser;
  const orphanRef = collection(db, `orphanage/${orphanageName}/orphans`);
  const q = query(orphanRef, where("id", "==", orphanId));
  const querySnapshot = await getDocs(q);

  const orphanFolderRef = ref(storage, `videos/${orphanId}/${file.name}`);
  const uploadTask = uploadBytesResumable(orphanFolderRef, file);
  await uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;

        // ...

        case "storage/unknown":
          break;
      }
    },
    async () => {
      let url = await getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadUrl) => {
          return downloadUrl;
        }
      );

      let data = {
        fileName: file.name,
        filePath: file.path,
        status: false,
        urlDownload: url,
        orphanageName: orphanageName,
        orphanId: orphanId,
        videoId: getRandomNumberInRange(),
        uploader: user.email,
        orphanfirstname: orphanFirstName,
        orphanlastName: orphanLastName,
      };

      console.log(data);

      querySnapshot.forEach((document) => {
        let fetchedData = document.data().videos;
        fetchedData.push(data);

        const docRef = doc(
          db,
          `orphanage/${orphanageName}/orphans`,
          document.id
        );
        updateDoc(docRef, {
          videos: fetchedData,
        });
      });

      let dbRef = collection(db, `orphanage/${orphanageName}/videosToApprove`);
      addDoc(dbRef, data)
        .then((docRef) => {
          console.log("Video has been added");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
};

// const uploadVideo = async (file, orphanId) => {
//   const videoRef = ref(storage, `videos/${orphanId}/${file.name}`);
//   const uploadTask = uploadBytesResumable(videoRef, file);
//   let downloadUrl;
//   await uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log("Upload is " + progress + "% done");
//       switch (snapshot.state) {
//         case "paused":
//           console.log("Upload is paused");
//           break;
//         case "running":
//           console.log("Upload is running");
//           break;
//       }
//     },
//     (error) => {
//       switch (error.code) {
//         case "storage/unauthorized":
//           break;
//         case "storage/canceled":
//           break;

//         // ...

//         case "storage/unknown":
//           break;
//       }
//     },
//     () => {
//       // Upload completed successfully, now we can get the download URL
//     }
//   );
// };

const getVideos = async (orphanId) => {
  const listRef = ref(storage, `videos/${orphanId}`);
  let data = [];
  listAll(listRef)
    .then(async (res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach(async (itemRef) => {
        // All the items under listRef.
        // let url = await getDownloadURL(itemRef);
        let url = await getDownloadURL(itemRef);
        console.log(url);

        let fileRef = {
          fileName: itemRef.name,
          url: url,
          ref: itemRef.fullPath,
        };
        data.push(fileRef);
        // let fileRef = {
        //   fileName: itemRef.name,
        //   url: url,
        //   ref: itemRef.fullPath,
        // };
        // data.push(fileRef);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  return data;
};

const deleteFile = (fileType, fileName, filePath, orphanId) => {
  const fileRef = ref(storage, `${fileType}/${orphanId}/${fileName}`);
  deleteObject(fileRef)
    .then(() => {
      console.log("File deleted");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getAllOrphans = async () => {
  // const allOrphansRef = collection(db, "allOrphans");
  // const docSnap = await getDocs(allOrphansRef);
  // let data = [];
  // docSnap.forEach((doc) => {
  //   data.push(doc.data());
  // });
  // console.log(data);
  // return data;
};

const getOrphan = async (orphanId) => {
  const orphansRef = collection(db, "allOrphans");
  const q = query(orphansRef, where("id", "==", orphanId));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach(async (document) => {
    const docRef = doc(db, "allOrphans", document.id);
    const docSnap = await getDoc(docRef);
    data.push(docSnap.data());
  });
  return data;
};

export {
  getOrphansList,
  uploadProfilePhoto,
  orphanDetailsUpdate,
  uploadOrphanLetter,
  getLetters,
  uploadVideo,
  getVideos,
  deleteFile,
  addOrphanToBin,
  getAllOrphans,
  getOrphan,
};
