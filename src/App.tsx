import {BrowserRouter, Routes ,Route} from "react-router-dom"
import { Home} from "./Pages/Home"
import Hero from "./components/Hero"
import { AuthPage } from "./Pages/Auth"

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/test" element={<Hero/>}/>
    <Route path="/auth" element={<AuthPage/>}/>
  </Routes>
  </BrowserRouter>
}

