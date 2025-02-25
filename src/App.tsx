import {BrowserRouter, Routes ,Route} from "react-router-dom"
import { Home} from "./Pages/Home"
import { AuthPage } from "./Pages/Auth"
import { RecoilRoot } from "recoil"

export default function App() {
  return <RecoilRoot>
  <BrowserRouter>
  <Routes>
    
    <Route path="/" element={<Home/>}/>
    <Route path="/auth" element={<AuthPage/>}/>
  </Routes>
  </BrowserRouter>
  </RecoilRoot>
}

