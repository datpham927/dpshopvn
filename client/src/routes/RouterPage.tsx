import {Routes,Route} from "react-router-dom"
import { path } from "../utils/const"
import Home from "../pages/homePage/HomePage"


const RouterPage = () => {
    return (
         <Routes>
            <Route path={path.HOME} element={<Home/>}></Route>
         </Routes>
    )
}

export default RouterPage