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

const getAllOrphans = async (orphanages) => {
  let allOrphans = [];

  let colRef = collection(db, "orphanage/Turkey/orphans");
  const docSnap = await getDocs(colRef);

  const q = query(collection(db, `allOrphans`));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allOrphans.push(doc.data());
  });

  return allOrphans;
};

const removeOrphanFromBin = async (orphan) => {
  let data = {
    notDeleted: true,
  };

  let newOrphan = orphan;
  newOrphan.notDeleted = true;

  let allOrphansRef = collection(db, "allOrphans");
  const q = query(allOrphansRef, where("id", "==", orphan.id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((document) => {
    const docRef = doc(db, `allOrphans`, document.id);
    console.log(document.data());
    updateDoc(docRef, data, { merge: true })
      .then((docRef) => {
        console.log("Orphan has been re-instated on All Orphans.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  let orphansRef = collection(db, `orphanage/${orphan.orphanageName}/orphans`);
  await addDoc(orphansRef, newOrphan, orphan.id);
};

export { getAllOrphans, removeOrphanFromBin };
