import { useAuthCtx } from "../../../context/authContext";
import AdminDashboard from "./adminDashboard";
import StudentDashboard from "./studentDashboard";
import TeacherDashboard from "./teacherDashboard";

const Dashboard = () => {
  const { user } = useAuthCtx();
  let content;

  switch (user.role[0]) {
    case "ADMIN":
      content = <AdminDashboard />;
      break;
    case "TEACHER":
      content = <TeacherDashboard />;
      break;
    case "STUDENT":
      content = <StudentDashboard />;
      break;
    default:
      content = <p>No Role Assigned</p>;
      break;
  }

  return content;
};

export default Dashboard;
