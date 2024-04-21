import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/layout/dashboard";
import { LoginForm } from "./components/ui/loginForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/" element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
