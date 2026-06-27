import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJobs from "./components/admin/PostJobs";
import Applicants from "./components/admin/Applicants";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/job",
    element: <Jobs />,
  },
   {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/Browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  // admin ke sare route iider se honge
  {
  path: "/admin/companies",
  element: (
    <ProtectedRoutes>
      <Companies />
    </ProtectedRoutes>
  ),
},
{
  path: "/admin/companies/create",
  element: (
    <ProtectedRoutes>
      <CompanyCreate />
    </ProtectedRoutes>
  ),
},
{
  path: "/admin/companies/:id",
  element: (
    <ProtectedRoutes>
      <CompanySetup />
    </ProtectedRoutes>
  ),
},
{
  path: "/admin/jobs",
  element: (
    <ProtectedRoutes>
      <AdminJobs />
    </ProtectedRoutes>
  ),
},
{
  path: "/admin/jobs/create",
  element: (
    <ProtectedRoutes>
      <PostJobs />
    </ProtectedRoutes>
  ),
},
{
  path: "/admin/jobs/:id/applicants",
  element: (
    <ProtectedRoutes>
      <Applicants />
    </ProtectedRoutes>
  ),
},

]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
