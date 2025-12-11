import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import EventPage from "./components/EventPage";
import RCLoginPage from "./components/RCLoginPage";
import UserView from "./components/UserView";
import NewMap from "./components/NewMap";
import NotFound from "./components/NotFound";
import { GlobalStateProvider } from "./utils/useGlobalState";

window.drawmyroute = {};

function App() {
  const onClickHome = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.location.reload();
    }
  };

  React.useEffect(() => {
    window.addEventListener('beforeunload', function (event) {
      event.stopImmediatePropagation();
      return null;
    });
    window.beforeunload = null;
  }, [window.beforeunload])

  return (
    <GlobalStateProvider>
      <Router basename="/">
        <div className="jumbotron text-center">
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#33333366",
              position: "absolute",
              top: "0",
              left: "0",
              zIndex: -1,
            }}
          ></div>
          <Link
            to="/"
            onClick={onClickHome}
            style={{
              textDecoration: "none",
              color: "#f3f",
              textShadow:
                "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
            }}
          >
            <h1 style={{ whiteSpace: "nowrap" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#f4f4f4",
                  width: "60px",
                  borderRadius: "50%",
                }}
              >
                <img
                  src="/static/logo.svg?v=20231023"
                  alt="logo"
                  height="60px"
                  style={{ padding: "5px" }}
                />
              </span>{" "}
              <small>MapDump.com</small>
            </h1>
            <p style={{ padding: "0 0 0 30px", margin: "-10px 0 0 0" }}>
              WHERE MAPS END THEIR LIFE...
            </p>
          </Link>
        </div>
        <Login />
        <Route path="/" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={NewMap} />
          <Route exact path="/login" component={RCLoginPage} />
          <Route exact path="/map/:uid/" component={EventPage} />
          <Route exact path="/:username" component={UserView} />
          <Route
            exact
            path="/:username/:year(\d{4})"
            component={UserView}
          />
          <Route
            exact
            path="/:username/:date(\d{4}-\d{2}-\d{2})"
            component={UserView}
          />
          <Route exact path="*" component={NotFound} />
        </Switch>
        <footer className="container-fluid text-center">
          <span>
            &copy;2019-{new Date().getFullYear()}&nbsp;mapdump.com -{" "}
            <a href="mailto:info@mapdump.com">Contact</a> -{" "}
            <a href="/privacy-policy">Privacy Policy</a> -{" "}
            <a href="/tos">Terms of Service</a>
          </span>
          <br />
          <img
            alt="Compatible with strava"
            width="200px"
            src="/static/compatibleWithStrava.png"
          ></img>
        </footer>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
