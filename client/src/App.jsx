import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/layout/dashboard";
import { PersistUser } from "./components/layout/persistUser.jsx";
import { LoginForm } from "./components/ui/loginForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<p>Hii</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
