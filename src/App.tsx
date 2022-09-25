import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import { AuthProvider } from "./components/Auth/Auth";
import { Dashboard } from "./components/Auth/Dashboard";
import { Login } from "./components/Auth/Login";
import { PrivateRoute } from "./components/Auth/PrivateRoute";
import { Signup } from "./components/Auth/Signup";
import Expenses from "./components/Logic/Expenses/Expenses";
import Stats from "./components/Logic/Stats/Stats";
import "./index.scss";

function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/statistiques" element={<Stats />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
