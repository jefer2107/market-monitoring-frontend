import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MoreDetails from "./pages/MoreDetails"


const RoutesController = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/ticker/:tickerId/:region" element={<MoreDetails />} />
            </Routes>
        </BrowserRouter>
    )
    
}

export default RoutesController