import React from "react";
import useGlobalState from "../utils/useGlobalState";

const useUser = () => {
    const globalState = useGlobalState();
    const { api_token } = globalState?.user;

    const [userData, setUserData] = React.useState(null);

    React.useEffect(() => {
        if (api_token) {
            (async () => {
                const res = await fetch(
                    import.meta.env.VITE_API_URL + "/v1/auth/user/",
                    {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Token " + api_token,
                    },
                    }
                );
                if (res.ok) {
                    const data = await res.json();
                    setUserData(data);
                } else {
                    globalState.setUser({});
                }
            })();
        };
    }, [api_token]);

    return userData;
}

export default useUser;