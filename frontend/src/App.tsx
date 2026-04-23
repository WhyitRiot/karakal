import './App.css'
import {BrowserRouter} from "react-router";
import SiteRoutes from "./utilities/SiteRoutes.tsx";


function App() {

  return (
    <>
        <BrowserRouter>
            <SiteRoutes/>
        </BrowserRouter>
    </>
  )
}

export default App
