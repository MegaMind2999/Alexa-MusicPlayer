import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/Login";
import { Home } from "./components/Home";
import { Logout } from "./components/Logout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { AuthProvider } from "./hooks/useAuth";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { SignupPage } from "./components/Signup";
import AudioUpload from "./components/AudioUpload";
import { NotFound } from "./components/NotFound";
function App() {
  axios.defaults.withCredentials = true;
  return (
    <AuthProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploadyourmusic"
          element={
            <ProtectedRoute>
              <AudioUpload />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
