// components/VideoPlayer.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaPause,
  FaFastForward,
  FaBackward,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

const VideoPlayer = ({ url }) => {
  const playerRef = useRef(null);
  const videoContainerRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [touchTimer, setTouchTimer] = useState(null);
  const [userSelectedSpeed, setUserSelectedSpeed] = useState(1.0);

  let timeoutRef = useRef(null);
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  const togglePlayPause = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const seekTo = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds);
    }
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    setUserSelectedSpeed(newSpeed);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = (d) => {
    setDuration(d);
  };

  const handleSeekChange = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(newPlayed);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const resetHideControlsTimer = () => {
    setShowControls(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1500);
  };

  const updateViewport = (scale) => {
    let meta = document.querySelector("meta[name=viewport]");
    if (meta) {
      meta.setAttribute(
        "content",
        `width=device-width, initial-scale=${scale}, maximum-scale=1, user-scalable=no`
      );
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await videoContainerRef.current.requestFullscreen();
      setIsFullscreen(true);
      if (isMobile && screen.orientation)
        await screen.orientation.lock("landscape");
      updateViewport(1);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
      if (isMobile && screen.orientation) await screen.orientation.unlock();
      updateViewport(1);
    }
  };

  const handleTouchStart = () => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setUserSelectedSpeed(speed);
        setSpeed(2.0);
      }, 250);
      setTouchTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      clearTimeout(touchTimer);
      if (userSelectedSpeed !== null) setSpeed(userSelectedSpeed);
    }
  };

  const handleDoubleClick = () => {
    toggleFullscreen();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        seekTo(5);
      } else if (e.key === "ArrowLeft") {
        seekTo(-5);
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayPause]);

  useEffect(() => {
    resetHideControlsTimer();
  }, []);

  return (
    <div
      ref={videoContainerRef}
      className="relative w-full h-[60vh] md:h-[70vh] bg-black rounded-lg overflow-hidden"
      onMouseMove={resetHideControlsTimer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        playbackRate={speed}
        volume={volume}
        muted={muted}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onDuration={handleDuration}
      />

      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3 flex flex-col items-center space-y-2">
          <div className="flex justify-between w-full items-center px-3">
            <span>{formatTime(playedSeconds)}</span>
            <input
              type="range"
              min={0}
              max={1}
              step="0.01"
              value={played}
              onChange={handleSeekChange}
              className="flex-1 mx-2"
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex justify-center gap-5">
            <button onClick={() => seekTo(-10)}>
              <FaBackward />
            </button>
            <button onClick={togglePlayPause}>
              {playing ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={() => seekTo(10)}>
              <FaFastForward />
            </button>
            <button onClick={() => setMuted(!muted)}>
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <button onClick={toggleFullscreen}>
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>

          <div className="flex items-center">
            <label className="mr-2 text-sm">Speed:</label>
            <select
              value={speed}
              onChange={handleSpeedChange}
              className="text-sm"
            >
              {[0.5, 1.0, 1.25, 1.5, 2.0].map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
