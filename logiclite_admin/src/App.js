import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Blog/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/admin/*"
            element={
              isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;