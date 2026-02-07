import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { getToken } from "./utils/auth";

function App() {
  const isLoggedIn = !!getToken();
  const [showSignup, setShowSignup] = useState(false);

  if (isLoggedIn) return <Dashboard />;

  return showSignup ? (
    <Signup onSwitch={() => setShowSignup(false)} />
  ) : (
    <Login onSwitch={() => setShowSignup(true)} />
  );
}

export default App;
