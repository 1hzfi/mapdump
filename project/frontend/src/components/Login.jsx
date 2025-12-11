import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalState from "../utils/useGlobalState";

const Login = () => {
  const globalState = useGlobalState();
  const { user_logged_in_as, api_token } = globalState.user;
  const [wantLogin, setWantLogin] = useState(false);
  const [login, setLogin] = useState(false);
  const [pass, setPass] = useState(false);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    (async () => {
      if (user_logged_in_as) {
        const res = await fetch(
          import.meta.env.VITE_API_URL + "mapdump/self",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + api_token,
            },
          }
        );
        if (res.status === 401) {
          globalState.setUser({});
        }
      }
    })();
  }, [globalState, api_token, user_logged_in_as]);

  React.useEffect(() => {
    if (!wantLogin) {
      setErrors({});
    }
  }, [wantLogin]);

  const onLogout = async () => {
    globalState.setUser({});
  };
  return (
    <div
      style={{
        marginTop: "-80px",
        marginBottom: "40px",
        position: "relative",
        zIndex: 2e3,
      }}
    >
      {user_logged_in_as && (
        <div style={{ textAlign: "right" }}>
          <Link to="/new">
            <button type="button" className="btn btn-secondary btn-sm">
              <i className="fas fa-plus"></i> New Map
            </button>
          </Link>
          &nbsp;
          <button type="button" onClick={onLogout} className="btn btn-danger btn-sm">
            <i className="fas fa-power-off"></i> Logout
          </button>
          &nbsp;
        </div>
      )}
      {!user_logged_in_as && (
        <div style={{ textAlign: "right" }}>
          &nbsp;
          <a className="btn btn-success btn-sm" href="https://dashboard.routechoices.com/signup">
              <i className="fas fa-user-plus"></i> Sign up for free
          </a>
          &nbsp;
        </div>
      )}
    </div>
  );
};

export default Login;
