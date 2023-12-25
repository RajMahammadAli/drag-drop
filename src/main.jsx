import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import TaskManagementDashboard from "./Pages/TaskManagementDashboard/TaskManagementDashboard.jsx";
import SignIn from "./Pages/SignIn/SignIn.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import EditForm from "./Components/ListCard/EditForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "taskManageDashBoard",
        element: (
          <PrivateRoute>
            <TaskManagementDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "edittodolists/:id",
        element: (
          <PrivateRoute>
            <EditForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://my-drag-drop-server.vercel.app/toDoLists/${params.id}`
          ),
      },
      { path: "signIn", element: <SignIn /> },
      { path: "signUp", element: <SignUp /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </AuthProvider>
);
