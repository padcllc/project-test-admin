import { useSelector } from "react-redux";
import AuthRoutes from "./auth-routes";
import MainRoutes from "./main-route";
import { getAccessToken } from "../store/slices/auth/login";

const Routing = () => {
 
  const token  = useSelector(getAccessToken);

  return (!(token) ? <AuthRoutes /> : <MainRoutes />);
};

export default Routing;
