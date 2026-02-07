import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { getToken } from "./utils/auth";

function App() {
  const isLoggedIn = !!getToken();

  return isLoggedIn ? <Dashboard /> : <Login />;
}

export default App;
