import './App.css'
import {BrowserRouter} from "react-router";
import SiteRoutes from "./utilities/SiteRoutes.tsx";
import {GameStateProvider} from "./utilities/websocket/GameStateContextProvider.tsx";
import Game from "./pages/Game.tsx";


function App() {

  return (
    <>
        <GameStateProvider>
            <BrowserRouter>
                <SiteRoutes/>
            </BrowserRouter>
        </GameStateProvider>
    </>
  )
}

export default App
