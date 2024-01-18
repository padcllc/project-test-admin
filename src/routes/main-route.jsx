import { Navigate, Route, Routes } from "react-router-dom";
import Users from "../pages/users";
import User from "../pages/users/user";

const MainRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Users />} />
      <Route path="/users" element={<Navigate to="/" />} />
      <Route path="users/add" element={<User />} />
      <Route path="users/:id" element={<User />} />
    
  </Routes>
  );
};

export default MainRoutes;
