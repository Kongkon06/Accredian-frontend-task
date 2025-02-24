import {BrowserRouter, Routes ,Route} from "react-router-dom"
import { Home} from "./Pages/Home"
import ReferralBenefits from "./components/test"

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/test" element={<ReferralBenefits/>}/>
  </Routes>
  </BrowserRouter>
}

