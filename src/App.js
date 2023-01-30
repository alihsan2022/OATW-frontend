import "./App.css";
import Cart from "./Components/Cart/Cart";
import Homepage from "./Components/Homepage/Homepage";
import Footer from "./Components/Navbars/Footer";
import Header from "./Components/Navbars/Header";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, setUser } from "./Redux/userAuth";
import counter from "./Redux/counter";
import userAuth from "./Redux/userAuth";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Homepage />
      <Cart />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
