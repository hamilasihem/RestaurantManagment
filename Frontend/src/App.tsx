 import { Route, Routes } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import Login from "./Pages/Login/Login";
import Dashboard from "./Services/Dashboard";
import Default from "./Services/Default";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/test" element={<MainLayout />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/Default" element={<Default />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );

};

export default App;
