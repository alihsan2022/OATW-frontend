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

import { getAuth, signOut } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const handleLogout = async () => {
  await signOut(auth)
    .then(() => {
      console.log("Sign out successful");
    })
    .catch((error) => {
      console.log("Sign out error");
    });
};

const updateVerificatonStatus = async (user) => {
  console.log(user);
  const userRef = collection(db, "users");
  const q = query(userRef, where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);

  const data = {
    userVerified: true,
  };

  querySnapshot.forEach((document) => {
    const docRef = doc(db, "users", document.id);
    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("User has been verified");
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
};

const updateUserRole = async (user, newRole, orphanageName) => {
  console.log(user);
  const userRef = collection(db, `users`);
  const q = query(userRef, where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);

  const data = {
    orphanageName: orphanageName,
    userRole: newRole,
  };

  querySnapshot.forEach((document) => {
    const docRef = doc(db, `users`, document.id);
    setDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("User profile has been updated.");
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export { updateUserRole, updateVerificatonStatus, handleLogout };
