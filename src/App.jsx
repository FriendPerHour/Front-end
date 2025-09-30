// App.jsx
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
import VoiceProviderAI from "./Context/VoiceContextProvider";
import Service1 from "./components/Service1/Service1";
import Service2 from "./components/Service2/Service2";
import Service3 from "./components/Service3/Service3";
import Service4 from "./components/Service4/Service4";
import Service5 from "./components/Service5/Service5";
import CreateRequestForm from "./components/CreateRequestForm/CreateRequestForm";
import Waiting from "./components/Waiting/Waiting";
import VolunteerService1 from "./components/volunteerService1/volunteerService1";
import VolunteerWaiting from "./components/VolunteerWaiting/VolunteerWaiting";
import VideoPage from "./components/VideoPage/VideoPage";
import VideoCall from "./components/VideoCall/VideoCall";
import VolunteerRating from "./components/Rating/VolunteerRating";
import { HMSRoomProvider } from "@100mslive/react-sdk";

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
        path: "Service1",
        element: (
          <ProtectedRoute allowedRoles={["admin", "Disabled"]}>
            <Service1 />
          </ProtectedRoute>
        ),
      },
      {
        path: "Service2",
        element: (
          <ProtectedRoute allowedRoles={["admin", "Disabled"]}>
            <Service2 />
          </ProtectedRoute>
        ),
      },
      {
        path: "Service5",
        element: (
          <ProtectedRoute allowedRoles={["admin", "Disabled"]}>
            <Service5 />
          </ProtectedRoute>
        ),
      },
      {
        path: "Service3",
        element: (
          <ProtectedRoute allowedRoles={["admin", "Disabled"]}>
            <Service3 />
          </ProtectedRoute>
        ),
      },
      {
        path: "Service4",
        element: (
          <ProtectedRoute allowedRoles={["admin", "Disabled"]}>
            <Service4 />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-request",
        element: (
          <ProtectedRoute allowedRoles={["admin", "Disabled"]}>
            <CreateRequestForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "Waiting",
        element: (
          <ProtectedRoute allowedRoles={["admin", "Disabled"]}>
            <Waiting />
          </ProtectedRoute>
        ),
      },
      {
        path: "VolunteerRating",
        element: (
          <ProtectedRoute>
            <VolunteerRating />
          </ProtectedRoute>
        ),
      },
      {
        path: "VolunteerService1",
        element: (
          <ProtectedRoute allowedRoles={["admin", "Volunteer"]}>
            <VolunteerService1 />
          </ProtectedRoute>
        ),
      },
      {
        path: "VolunteerWaiting",
        element: (
          <ProtectedRoute allowedRoles={["admin", "Volunteer"]}>
            <VolunteerWaiting />
          </ProtectedRoute>
        ),
      },
      {
        path: "VideoCall",
        element: (
          <ProtectedRoute allowedRoles={["admin", "Volunteer", "Disabled"]}>
            <HMSRoomProvider>
              <VideoCall />
            </HMSRoomProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: "VideoPage",
        element: (
          <ProtectedRoute>
            <HMSRoomProvider>
              <VideoPage />
            </HMSRoomProvider>
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
