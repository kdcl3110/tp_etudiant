import api from './api';

const register = (username, email, password) => {
    return api.post( "auth/signup", {
        username,
        email,
        password,
    });
};
const login = (email, password) => {
    return api
        .post( "auth/signin", {
            login:email,
            password,
        })
        .then((response) => {
            if (response.data.data.token) {
                localStorage.setItem("@Auth:token", JSON.stringify(response.data.data.token));
                localStorage.setItem("user", JSON.stringify(response.data.data.user));
            }
            return response.data.data;
        });
};
const logout = () => {
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("user");
};
const authService = {
    register,
    login,
    logout,
};
export default authService;
