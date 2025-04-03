 import { Route, Routes } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import Login from "./Pages/Login/Login";
import Dashboard from "./Services/Dashboard";
import Default from "./Services/Default";
import VerificationCode from "./Pages/ForgetPassWord/VerificationCode";
import Verify from "./Pages/ForgetPassWord/Verify";
import ResetPassWord from "./Pages/ForgetPassWord/ResetPassWord";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/test" element={<MainLayout />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/Default" element={<Default />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/VerificationCode" element={<VerificationCode />}></Route>
      <Route path="/Verify" element={<Verify />}></Route>
      <Route path="/ResetPassWord" element={<ResetPassWord />}></Route>
    </Routes>
  );

};

export default App;
