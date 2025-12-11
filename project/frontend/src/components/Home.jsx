import React from "react";
import LatestRoutes from "./LatestRoutes";
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";
import useGlobalState from "../utils/useGlobalState";
import { capitalizeFirstLetter } from "../utils";

const Home = ({}) => {
  const [userData, setUserData] = React.useState(null);
  const globalState = useGlobalState();
  const { api_token, user_logged_in_as } = globalState.user;

  React.useEffect(() => {
    if (api_token) {
      (async () => {
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
        const data = await res.json();
        setUserData(data);
      })();
    } else {
      setUserData(null);
    }
  }, [api_token]);

  return (
    <>
      <Helmet>
        <title>my.mapdump.com</title>
      </Helmet>
      <div className="container" style={{ textAlign: "center" }}>
          {user_logged_in_as && userData && (
          <div
            className="col-12 col-md-6 offset-md-3"
            style={{ marginBottom: "15px", zIndex: 100 }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ textAlign: "center" }}>
                <i className="fa-5x fa-solid fa-circle-user text-muted"></i>
              </div>
              <Link
                to={"/" + userData.username}
                style={{
                  color: "black",
                  fontSize: "1.7em",
                  fontWeight: "bold",
                }}
              >
                {userData.first_name && userData.last_name
                  ? capitalizeFirstLetter(userData.first_name) +
                    " " +
                    capitalizeFirstLetter(userData.last_name)
                  : userData.username}
              </Link>
            </div>
            <hr />
            <div>
              <Link to={"/" + userData.username}>Your Activities</Link> -{" "}
              <Link to="/new">Upload New Map</Link>
            </div>
          </div>
        )}
        {!user_logged_in_as && (
          <div
            className="col-12 col-md-6 offset-md-3"
            style={{ marginBottom: "15px" }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "1.7em",
                fontWeight: "bold",
              }}
            >
              You are not logged in...
              <br />
              <a href="https://dashboard.routechoices.com/signup" className="btn btn-primary btn-success">Sign Up</a>
              <span style={{ fontSize: ".7em", fontWeight: "normal" }}>
                {" "}
                or <Link to={"/login"}>Login</Link>
              </span>
            </div>
            <hr />
            <div>
              <Link to="/new">Test without Registering</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
