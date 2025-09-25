import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/Errors/NotFound";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import ServerError from "./components/Errors/ServerError";
import Unauthorized from "./components/Errors/Unauthorized";
import UserContextProvider from "./Context/UserContextProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { VoiceProviderAI } from "./context/VoiceContextProvider";
import TestPinAuth from "./components/Service1/Service1";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "TestPinAuth",
        element: (
          <ProtectedRoute>
            <TestPinAuth />
          </ProtectedRoute>
        ),
      },
      {
        path: "server-error",
        element: <ServerError />,
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <UserContextProvider>
        <VoiceProviderAI>
          <RouterProvider router={router} />
        </VoiceProviderAI>
      </UserContextProvider>
    </TooltipProvider>
  );
}

export default App;
