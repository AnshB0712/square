import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/layout.jsx";
import { PersistUser } from "./components/layout/persistUser.jsx";
import { LoginForm } from "./components/ui/loginForm";
import Dashboard from "./components/pages/dashboard/index.jsx";
import AddStudent from "./components/pages/dashboard/addStudent.jsx";
import AddTeacher from "./components/pages/dashboard/addTeacher.jsx";
import AddTest from "./components/pages/dashboard/addTest.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginForm />} />
          <Route element={<PersistUser />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="add-student" element={<AddStudent />} />
              <Route path="add-teacher" element={<AddTeacher />} />
              <Route path="add-test" element={<AddTest />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
