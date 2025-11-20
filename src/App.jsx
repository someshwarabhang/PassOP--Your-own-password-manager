import { useState } from "react";
import "./App.css";

import Navbar from "./componenets/Navbar";
import Manager from "./componenets/Manager";
import Footer from "./componenets/Footer";
import Authenticator from "./componenets/Authenticator";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="h-screen w-full flex flex-col">

      {/* 🔐 Show Authenticator first */}
      {!isAuthenticated ? (
        <Authenticator onAuthenticated={handleAuthenticated} />
      ) : (
        <>
          <Navbar />

          <div className="min-h-[84vh] flex-1 overflow-y-auto">
            <Manager />
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
