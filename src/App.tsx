import {BrowserRouter, Routes ,Route} from "react-router-dom"
import { Home} from "./Pages/Home"
import Hero from "./components/Hero"

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/test" element={<Hero/>}/>
  </Routes>
  </BrowserRouter>
}

