import React, { useEffect } from "react";
import Login from "./components/Login";
import { useStateProvider } from "./utils/StateProvider";
import Spotify from "./components/Spotify";
import { reducerCases } from "./utils/Constants";
function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    // console.log("Here is the hash", hash);
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      console.log("Here is the token", token);
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  return <div>{token ? <Spotify /> : <Login />}</div>;
}

export default App;
