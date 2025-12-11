import React, { useEffect, useState } from "react";
import useGlobalState from "../utils/useGlobalState";
import { Helmet } from "react-helmet";

const RCLoginPage = (props) => {
  const globalState = useGlobalState();
  const { user_logged_in_as } = globalState.user;
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    if (user_logged_in_as || denied) {
      props.history.push("/");
    }
  }, [denied, user_logged_in_as, props]);


  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isLoggedIn = window.location.href.match(accessTokenRegex);
    const accessDeniedRegex = /error=access_denied/;
    const isDenied = window.location.href.match(accessDeniedRegex);

    if (isLoggedIn) {
      const accessToken = isLoggedIn[1];
      (async () => {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}mapdump/self`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        if (res.status === 401) {
          globalState.setUser({});
        } else {
          const json = await res.json();
          globalState.setUser({ user_logged_in_as: json.username, api_token: accessToken });
        }
      })();
    } else if (isDenied) {
      globalState.setUser({});
      setDenied(true);
    } else {
      const callbackUrl = `${import.meta.env.VITE_APP_URL}/login`;
      const routechoicesClientId = import.meta.env.VITE_RC_CLIENT_ID;
      const targetUrl = `${import.meta.env.VITE_API_URL}oauth2/authorize/?redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=token&client_id=${routechoicesClientId}&scope=mapdump`;
      window.location.href = targetUrl;
    }
  }, []);

  return (
    <Helmet>
      <title>Login into MapDump.com</title>
    </Helmet>
  );
};

export default RCLoginPage;
