import { useEffect, useState, useRef } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import VideoCall from "../VideoCall/VideoCall";
import api from "@/api/axios";

export default function VideoPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomId = searchParams.get("roomId");
  const requestId = searchParams.get("requestId");
  const location = useLocation();
  const tokenFromState = location.state?.token;

  const [token, setToken] = useState(tokenFromState ?? null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!tokenFromState);
  const hasFetchedToken = useRef(false);

  useEffect(() => {
    if (!roomId) {
      setError("No room ID provided");
      setLoading(false);
      return;
    }

    if (!token && !hasFetchedToken.current) {
      hasFetchedToken.current = true;

      (async () => {
        try {
          setLoading(true);
          const res = await api.get(`video-call/${roomId}/token`);

          if (res.data.statusCode === 200) {
            setToken(res.data.data);
            setError(null);
          } else {
            setError("Failed to fetch video call token");
          }
        } catch (err) {
          console.error("Error fetching token:", err);
          setError(err.response?.data?.message || "Failed to join video call");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [roomId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading video call...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center max-w-md p-8 bg-gray-800 rounded-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-white text-xl font-semibold mb-2">
            Unable to Join Call
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-white text-lg">No token available</p>
      </div>
    );
  }

  return (
    <HMSRoomProvider>
      <VideoCall token={token} requestId={requestId} userName="Volunteer Disabled" />
    </HMSRoomProvider>
  );
}
