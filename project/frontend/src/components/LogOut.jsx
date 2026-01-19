import React from "react";
import useGlobalState from "../utils/useGlobalState";


const LogOut = () => {
  const globalState = useGlobalState();

  const onLogout = async () => {
    globalState.setUser({});
  };

  return (
    <>
    <h3><i className="fas fa-power-off"></i> Logout</h3>
    <button type="button" onClick={onLogout} className="btn btn-danger">
      <i className="fas fa-power-off"></i> Logout
    </button>
    </>
  )
};


export default LogOut;