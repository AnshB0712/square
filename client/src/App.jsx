import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/layout.jsx";
import { PersistUser } from "./components/layout/persistUser.jsx";
import { LoginForm } from "./components/pages/dashboard/loginForm.jsx";
import Dashboard from "./components/pages/dashboard/index.jsx";
import AddStudent from "./components/pages/dashboard/addStudent.jsx";
import AddTeacher from "./components/pages/dashboard/addTeacher.jsx";
import AddTest from "./components/pages/dashboard/addTest.jsx";
import EditTest from "./components/pages/dashboard/editTest.jsx";
import FullTestTable from "./components/pages/dashboard/FullTestTable.jsx";
import Marksheet from "./components/pages/dashboard/marksheet.jsx";
import EditMarksheet from "./components/pages/dashboard/editMarksheet.jsx";
import RBARoute from "./components/layout/RBARoute.jsx";
import ViewTest from "./components/pages/dashboard/viewTest.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginForm />} />
          <Route element={<PersistUser />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/student/new"
              element={
                <RBARoute roles={["ADMIN"]}>
                  <AddStudent />
                </RBARoute>
              }
            />
            <Route
              path="/teacher/new"
              element={
                <RBARoute roles={["ADMIN"]}>
                  <AddTeacher />
                </RBARoute>
              }
            />
            <Route
              path="/test/new"
              element={
                <RBARoute roles={["ADMIN", "TEACHER"]}>
                  <AddTest />
                </RBARoute>
              }
            />
            <Route
              path="/edit/test/:testId"
              element={
                <RBARoute roles={["ADMIN", "TEACHER"]}>
                  <EditTest />
                </RBARoute>
              }
            />
            <Route
              path="/view/test/:testId"
              element={
                <RBARoute roles={["ADMIN", "TEACHER", "STUDENT"]}>
                  <ViewTest />
                </RBARoute>
              }
            />
            <Route
              path="/marksheet/new/:testId"
              element={
                <RBARoute roles={["ADMIN", "TEACHER"]}>
                  <Marksheet />
                </RBARoute>
              }
            />
            <Route
              path="/marksheet/test/:testId"
              element={
                <RBARoute roles={["ADMIN", "TEACHER"]}>
                  <EditMarksheet />
                </RBARoute>
              }
            />
            <Route
              path="/test-table"
              element={
                <RBARoute roles={["ADMIN", "TEACHER"]}>
                  <FullTestTable />
                </RBARoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
