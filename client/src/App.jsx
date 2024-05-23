import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/layout.jsx'
import { PersistUser } from './components/layout/persistUser.jsx'
import { LoginForm } from './components/pages/dashboard/loginForm.jsx'
import Dashboard from './components/pages/dashboard/index.jsx'
import AddStudent from './components/pages/dashboard/addStudent.jsx'
import AddTeacher from './components/pages/dashboard/addTeacher.jsx'
import AddTest from './components/pages/dashboard/addTest.jsx'
import EditTest from './components/pages/dashboard/editTest.jsx'
import FullTestTable from './components/pages/dashboard/FullTestTable.jsx'
import Marksheet from './components/pages/dashboard/marksheet.jsx'
import EditMarksheet from './components/pages/dashboard/editMarksheet.jsx'
import RBARoute from './components/layout/RBARoute.jsx'
import ViewTest from './components/pages/dashboard/viewTest.jsx'
import PageNotFound from './components/layout/pageNotFound.jsx'
import CustomErrorBoundary from './components/layout/errorBoundary.jsx'
import IndividualTestMarks from './components/pages/dashboard/individualTestMasks.jsx'

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
                <RBARoute roles={['ADMIN']}>
                  <CustomErrorBoundary>
                    <AddStudent />
                  </CustomErrorBoundary>
                </RBARoute>
              }
            />
            <Route
              path="/teacher/new"
              element={
                <RBARoute roles={['ADMIN']}>
                  <CustomErrorBoundary>
                    <AddTeacher />
                  </CustomErrorBoundary>
                </RBARoute>
              }
            />
            <Route
              path="/test/new"
              element={
                <RBARoute roles={['ADMIN', 'TEACHER']}>
                  <CustomErrorBoundary>
                    <AddTest />
                  </CustomErrorBoundary>
                </RBARoute>
              }
            />
            <Route
              path="/edit/test/:testId"
              element={
                <RBARoute roles={['ADMIN', 'TEACHER']}>
                  <CustomErrorBoundary>
                    <EditTest />
                  </CustomErrorBoundary>
                </RBARoute>
              }
            />
            <Route
              path="/view/test/:testId"
              element={
                <RBARoute roles={['ADMIN', 'TEACHER', 'STUDENT']}>
                  <CustomErrorBoundary>
                    <ViewTest />
                  </CustomErrorBoundary>
                </RBARoute>
              }
            />
            <Route
              path="/marksheet/new/:testId"
              element={
                <RBARoute roles={['ADMIN', 'TEACHER']}>
                  <CustomErrorBoundary>
                    <Marksheet />
                  </CustomErrorBoundary>
                </RBARoute>
              }
            />
            <Route
              path="/marksheet/test/:testId"
              element={
                <RBARoute roles={['ADMIN', 'TEACHER']}>
                  <CustomErrorBoundary>
                    <EditMarksheet />
                  </CustomErrorBoundary>
                </RBARoute>
              }
            />
            <Route
              path="/test-table"
              element={
                <RBARoute roles={['ADMIN', 'TEACHER']}>
                  <FullTestTable />
                </RBARoute>
              }
            />
            <Route
              path="/marks/test/:testId/subject/:subjectId"
              element={
                <RBARoute roles={['STUDENT']}>
                  <CustomErrorBoundary>
                    <IndividualTestMarks />
                  </CustomErrorBoundary>
                </RBARoute>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
