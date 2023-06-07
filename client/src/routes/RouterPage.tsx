import {Routes,Route} from "react-router-dom"
import { path } from "../utils/const"
import Home from "../pages/homePage/HomePage"
import { DetailPage } from "../pages"


const RouterPage = () => {
    return (
         <Routes>
            <Route path={path.HOME} element={<Home/>}></Route>
            <Route path={path.DETAILPRODUCT} element={<DetailPage/>}></Route>
         </Routes>
    )
}

export default RouterPage