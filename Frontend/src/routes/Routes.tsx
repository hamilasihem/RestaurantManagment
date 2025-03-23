import { Route, Routes } from "react-router-dom";
import Dashboard from "../Services/Dashboard";
import Login from "../Services/Login"

export const appRoutes = [{
    path :"/" ,
    element: Dashboard
},
{
   path :"/login" ,
    element: Login  
}];
export const renderRoutes = () =>{
    return (<Routes>
        {appRoutes?.map((route,index)=>{const Component = route.element;
            return <Route key ={index} path = {route.path} element={<Component/>}/>;}
)}
    </Routes>
);
};
