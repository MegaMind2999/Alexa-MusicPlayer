import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";
import API_ENDPOINTS from "../config";
import { toast } from "react-toastify";

// Define a User type or interface
export interface User {
  username: string;
  email: string;
  password: string;
  // Add other user properties as needed
}
export interface AuthContextType {
  user: User | null;
  login: (data: User) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [_token, setToken] = useLocalStorage("Token", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: User) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.GET_ROOT}/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: false }
      );
      if (response.status == 200) {
        const userData = response.data;
        setUser(userData.user);
        setToken(response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `${response.data.token}`;
        navigate("/app");
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);

        // Specific handling for 401 Unauthorized
        if (error.response.status === 401) {
          toast.error("Wrong email or password", {
            position: "top-right", // Use the string directly instead of accessing POSITION
            autoClose: 5000, // Duration in milliseconds
          });
        } else {
          toast.error("An unexpected error occurred. Please try again.", {
            position: "top-right", // Use the string directly instead of accessing POSITION
            autoClose: 5000, // Duration in milliseconds
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        toast.error("Network error. Please try again later.", {
          position: "top-right", // Use the string directly instead of accessing POSITION
          autoClose: 5000, // Duration in milliseconds
        });
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up request:", error.message);
        toast.error("An unexpected error occurred.", {
          position: "top-right", // Use the string directly instead of accessing POSITION
          autoClose: 5000, // Duration in milliseconds
        });
      }
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setToken(null);
    axios.defaults.headers.common["Authorization"] = ``;
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
