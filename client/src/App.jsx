import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import WelcomePage from "./components/WelcomePage";

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCurrentPage("login");
  };

  const handleRegisterSuccess = () => {
    setCurrentPage("login");
  };

  if (user) {
    return <WelcomePage user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage("login")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentPage === "login"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentPage("register")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                currentPage === "register"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {currentPage === "login" ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        )}
      </div>
    </div>
  );
}

export default App;
