import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import TwitterLoginCb from "./TwitterLoginCb.tsx";

declare global {
  interface Window {
    Telegram: {
      Login: {
        auth: (options: any, callback: (data: any) => void) => void;
      }
    };
  }
}

window.Telegram = window.Telegram || {};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/twitter-login-callback" element={<TwitterLoginCb/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
