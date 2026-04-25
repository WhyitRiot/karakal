import React from 'react';
import {Route, Routes} from "react-router";
import Home from "../pages/Home.tsx";
import Join from "../pages/Join.tsx";
import Create from "../pages/Create.tsx";

const SiteRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Home />}/>
            <Route path={"/join"} element={<Join/>}/>
            <Route path={"/create"} element={<Create/>}/>
        </Routes>
    );
};

export default SiteRoutes;