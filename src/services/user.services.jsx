
import { api } from ".";

/*API calls for Team */
export const getUsers = () => {
    return api.get("user");
}
export const createUser = (data) => {     
    return api.post("user", data);
}
export const getUserById = (id) => {
    return api.get(`user/${id}`);
}
export const updateUserById = (data) => {
    return api.patch(`user/${data.id}`, data.data);
}
export const deleteUserById = (id) => {
    return api.delete(`user/${id}`);
}