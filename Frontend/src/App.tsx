 import { Route, Routes } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import Login from "./Pages/Login/Login";
const App = () => {
  return (
 <Routes>
   <Route path="/" element={<Login />}></Route>
   <Route path="/test" element={<MainLayout />}></Route>
 </Routes>
 )

};

export default App;
