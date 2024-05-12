import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/layout.jsx";
import { PersistUser } from "./components/layout/persistUser.jsx";
import { LoginForm } from "./components/ui/loginForm";
import Dashboard from "./components/pages/dashboard/index.jsx";
import AddStudent from "./components/pages/dashboard/addStudent.jsx";
import AddTeacher from "./components/pages/dashboard/addTeacher.jsx";
import AddTest from "./components/pages/dashboard/addTest.jsx";
import EditTest from "./components/pages/dashboard/editTest.jsx";
import FullTestTable from "./components/pages/dashboard/FullTestTable.jsx";
import Marksheet from "./components/pages/dashboard/marksheet.jsx";
import EditMarksheet from "./components/pages/dashboard/editMarksheet.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginForm />} />
          <Route element={<PersistUser />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student/new" element={<AddStudent />} />
            <Route path="/teacher/new" element={<AddTeacher />} />
            <Route path="/test/new" element={<AddTest />} />
            <Route path="/test/:testId" element={<EditTest />} />
            <Route path="/marksheet/new/:testId" element={<Marksheet />} />
            <Route path="/marksheet/test/:testId" element={<EditMarksheet />} />
            <Route path="/test-table" element={<FullTestTable />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
