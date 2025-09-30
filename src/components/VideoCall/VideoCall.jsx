
import { useEffect, useRef } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectIsConnectedToRoom,
  selectLocalPeer,
  selectCameraStreamByPeerID,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
} from "@100mslive/react-sdk";
import { Video, VideoOff, Mic, MicOff, PhoneOff, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

function VideoCall({ token, userName, requestId }) {
  const navigate = useNavigate();

  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);
  const isLocalAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(localPeer?.id));
  const isLocalVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(localPeer?.id));
  const hasJoinedRef = useRef(false);
  const isJoiningRef = useRef(false);

  useEffect(() => {
    const joinRoom = async () => {
      if (token && !hasJoinedRef.current && !isJoiningRef.current) {
        isJoiningRef.current = true;

        try {
          await hmsActions.join({
            userName,
            authToken: token,
            settings: {
              isAudioMuted: false,
              isVideoMuted: false
            },
            rememberDeviceSelection: true
          });
          hasJoinedRef.current = true;
        } catch (error) {
          console.error("Failed to join room:", error);
          hasJoinedRef.current = false;
        } finally {
          isJoiningRef.current = false;
        }
      }
    };

    joinRoom();

    return () => {
      if (hasJoinedRef.current) {
        hmsActions.leave().catch(console.error);
      }
    };
  }, [token, userName]);

  const toggleAudio = async () => {
    try {
      await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
    } catch (error) {
      console.error("Error toggling audio:", error);
    }
  };

  const toggleVideo = async () => {
    try {
      await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
    } catch (error) {
      console.error("Error toggling video:", error);
    }
  };

  const leaveCall = async () => {
    try {
      await hmsActions.leave();
      hasJoinedRef.current = false;
      navigate(`/VolunteerRating?requestId=${requestId}`, { replace: true });
    } catch (error) {
      console.error("Error leaving call:", error);
    }
  };

  if (!isConnected || !localPeer) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Connecting to call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col">
      <div className="bg-gray-800 p-4 shadow-lg">
        <h1 className="text-white text-xl font-semibold">Video Call Session</h1>
        <p className="text-gray-400 text-sm">{peers.length} participant(s)</p>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <div
          className={`grid gap-4 h-full ${
            peers.length === 1
              ? "grid-cols-1"
              : peers.length === 2
              ? "grid-cols-2"
              : peers.length <= 4
              ? "grid-cols-2 grid-rows-2"
              : "grid-cols-3"
          }`}
        >
          {peers.map((peer) => (
            <VideoTile key={peer.id} peer={peer} />
          ))}
        </div>
      </div>

      <div className="bg-gray-800 p-6 shadow-lg">
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full transition-all ${
              isLocalAudioEnabled
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-red-600 hover:bg-red-700"
            }`}
            title={isLocalAudioEnabled ? "Mute" : "Unmute"}
          >
            {isLocalAudioEnabled ? (
              <Mic className="w-6 h-6 text-white" />
            ) : (
              <MicOff className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full transition-all ${
              isLocalVideoEnabled
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-red-600 hover:bg-red-700"
            }`}
            title={isLocalVideoEnabled ? "Turn off camera" : "Turn on camera"}
          >
            {isLocalVideoEnabled ? (
              <Video className="w-6 h-6 text-white" />
            ) : (
              <VideoOff className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={leaveCall}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-all"
            title="Leave call"
          >
            <PhoneOff className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function VideoTile({ peer }) {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  const isAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const isVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));

  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }

    return () => {
      if (videoRef.current && videoTrack) {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    };
  }, [videoTrack, hmsActions]);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video shadow-xl">
      {isVideoEnabled ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-300 font-medium">{peer.name}</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium text-sm">{peer.name}</span>
          <div className="flex gap-2">
            {!isAudioEnabled && (
              <div className="bg-red-600 p-1.5 rounded-full">
                <MicOff className="w-4 h-4 text-white" />
              </div>
            )}
            {!isVideoEnabled && (
              <div className="bg-red-600 p-1.5 rounded-full">
                <VideoOff className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {peer.isLocal && (
        <div className="absolute top-3 right-3 bg-blue-600 px-3 py-1 rounded-full">
          <span className="text-white text-xs font-semibold">You</span>
        </div>
      )}
    </div>
  );
}

export default VideoCall;
