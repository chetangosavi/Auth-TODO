import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {

  const isAuthenticated = !!localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={isAuthenticated?<Dashboard />:<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;


