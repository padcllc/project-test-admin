
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../pages/auth";

const AuthRoutes= () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AuthRoutes;