import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/userAuth";
const auth = getAuth();

const HandleSignout = async () => {
  const dispatch = useDispatch();
  await signOut(auth)
    .then(() => {
      console.log("Signed out.");
      dispatch(logout);
    })
    .catch((error) => {
      console.log("Sign out error");
    });
};

export { HandleSignout };
