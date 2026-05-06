import React from 'react';
import {Route, Routes} from "react-router";
import Home from "../pages/Home.tsx";
import Join from "../pages/Join.tsx";
import Create from "../pages/Create.tsx";
import Game from "../pages/Game.tsx";
import Login from "../pages/Login.tsx";
import Replay from "../pages/Replay.tsx";
import {ReplayContextProvider} from "./context/ReplayContextProvider.tsx";

const SiteRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={"/home"} element={<Home />}/>
            <Route path={"/join"} element={<Join/>}/>
            <Route path={"/create"} element={<Create/>}/>
            <Route path={"/game"} element={<Game/>}/>
            <Route path={"/replay"} element={<ReplayContextProvider><Replay /></ReplayContextProvider>}/>
        </Routes>
    );
};

export default SiteRoutes;