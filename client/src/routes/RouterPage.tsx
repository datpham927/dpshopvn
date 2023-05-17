import {BrowserRouter,Routes,Route} from "react-router-dom"
import { path } from "../utils/const"
import Home from "../pages/Home/Home"


const RouterPage = () => {
    return (
     <BrowserRouter>
         <Routes>
            <Route path={path.HOME} element={<Home/>}></Route>
         </Routes>
     </BrowserRouter>
    )
}

export default RouterPage