
import { api } from ".";

/*API calls for auth */
export const adminLogin = (data) => {
    return api.post("/auth/login", data);
}