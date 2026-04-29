import React from 'react';
import {Route, Routes} from "react-router";
import Home from "../pages/Home.tsx";
import Join from "../pages/Join.tsx";
import Create from "../pages/Create.tsx";
import Game from "../pages/Game.tsx";

const SiteRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/join"} element={<Join/>}/>
            <Route path={"/create"} element={<Create/>}/>
            <Route path={"/game"} element={<Game/>}/>
        </Routes>
    );
};

export default SiteRoutes;