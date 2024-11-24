import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";

import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Root path with Body wrapper */}
          <Route path="/" element={<Body />}>
            {/* Nested route under Body */}
            <Route index element={<Feed />} />  {/* Render Feed at the root path */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            
          </Route>

          {/* Login page route should be at the root level */}
          <Route path="/login" element={<Body showProfile={false} />}>
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
