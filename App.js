// App.js
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white transition-all duration-300">
        {user ? (
          <Home user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default App;