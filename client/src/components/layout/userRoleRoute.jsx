import AddStudent from "../pages/dashboard/addStudent";
import AddTeacher from "../pages/dashboard/addTeacher";
import AddTest from "../pages/dashboard/addTest";
import FullTestTable from "../pages/dashboard/FullTestTable";
import EditTest from "../pages/dashboard/editTest";
import Marksheet from "../pages/dashboard/marksheet";
import EditMarksheet from "../pages/dashboard/editMarksheet";
import { useAuthCtx } from "../../context/authContext";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { PersistUser } from "./persistUser";
import { LoginForm } from "../ui/loginForm";

const USER_ROLES_ROUTES = {
  ADMIN: [
    {
      path: "/dashboard",
      element: <AdminDashboard />,
      childRoutes: [
        {
          path: "add-student",
          element: <AddStudent />,
          childRoutes: [],
        },

        {
          path: "add-teacher",
          element: <AddTeacher />,
          childRoutes: [],
        },
        {
          path: "add-test",
          element: <AddTest />,
          childRoutes: [],
        },
      ],
    },
    {
      path: "/test-table",
      element: <FullTestTable />,
      childRoutes: [],
    },
    {
      path: "/edit/test/:testId",
      element: <EditTest />,
      childRoutes: [],
    },
    {
      path: "/marksheet/test/:testId",
      element: <Marksheet />,
      childRoutes: [],
    },
    {
      path: "/edit/marksheet/test/:testId",
      element: <EditMarksheet />,
      childRoutes: [],
    },
  ],
  STUDENT: {},
  TEACHER: {},
};

const CreateRoute = (node, i) => {
  const { path, element, childRoutes } = node;
  return childRoutes.length ? (
    <Route key={i} path={path} element={element}>
      {childRoutes.map((childNode) => CreateRoute(childNode))}
    </Route>
  ) : (
    <Route key={i} path={path} element={element} />
  );
};

const UserRoleRoute = () => {
  const { user } = useAuthCtx();
  const routeTree = USER_ROLES_ROUTES[user.role[0]];
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginForm />} />
          {routeTree && routeTree.map((node, i) => CreateRoute(node, i))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default UserRoleRoute;
