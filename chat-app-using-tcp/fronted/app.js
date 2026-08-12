import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./componates/homepage";
import HostRoomCreation from "./componates/hostroompage";
import JoinRoom from "./componates/joinroompage";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./componates/notfoundpage";
import FinalRoom from "./componates/charscreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/host" element={<HostRoomCreation />}></Route>
          <Route path="/joinroom" element={<JoinRoom />}></Route>
          <Route path="/chat" element={<FinalRoom/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
