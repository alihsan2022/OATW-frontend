import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAuth, {
  setUserData,
  login,
  logout,
  setVerification,
  setCustomerId,
  setBillingAddress,
} from "../Redux/userAuth";
const auth = getAuth();
const db = getFirestore();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [orphanageName, setOrphanageName] = useState(null);
  const [verified, setVerified] = useState(false);
  const [stripeCustomerId, setStripeCustomerId] = useState();
  const [loaded, setLoaded] = useState();

  /////////////////REDUX///////////////
  const dispatch = useDispatch();
  /////////////////REDUX///////////////

  const { billingAddress, fullName } = useSelector((state) => state.userAuth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(auth.currentUser);
      if (auth.currentUser != null) {
        dispatch(setUserData(auth.currentUser));
        getVerificationAndStripeId();

        const getBillingDetails = async () => {
          const docRef = doc(db, "users", user?.uid);
          const docSnap = await getDoc(docRef);
          dispatch(setBillingAddress(docSnap?.data()?.billingAddress));
        };

        getBillingDetails();

        console.log("Refreshed");
      } else {
        dispatch(logout());
      }
    });
  }, []);

  useEffect(() => {
    if (user != null) {
      getVerificationAndStripeId();
    }
  }, [user]);

  const getVerificationAndStripeId = async () => {
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);
    console.log(stripeCustomerId);
    console.log(docSnap.data());

    if (docSnap?.exists() && docSnap?.data()?.userVerified === true) {
      dispatch(setVerification());
    }
    if (docSnap?.exists() && docSnap?.data()?.stripeCustomerId != "") {
      console.log(docSnap?.data()?.stripeCustomerId);
      dispatch(setCustomerId(docSnap?.data()?.stripeCustomerId));
    }
  };

  useEffect(() => {
    const updateBillingDetailsFirebase = async () => {
      const data = {
        billingDetails: billingAddress,
        fullName: fullName,
      };

      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);

      await updateDoc(docRef, data)
        .then((docRef) => {
          console.log("Billing updated on firebase");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    updateBillingDetailsFirebase();
  }, [billingAddress, fullName]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (auth.currentUser != null) {
        const getRole = async () => {
          const docRef = doc(db, "users", user?.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserRole(docSnap?.data()?.userRole);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setUserRole(0);
          }
        };
        getRole();
      }

      setLoaded(true);
    });
  }, [user]);

  // useEffect(() => {
  //   const getStripeId = async () => {
  //     const docRef = doc(db, "users", user?.uid);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       setStripeCustomerId(docSnap?.data()?.stripeCustomerId);
  //     }
  //   };

  //   getStripeId();
  // }, [loaded]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        orphanageName,
        verified,
        stripeCustomerId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
