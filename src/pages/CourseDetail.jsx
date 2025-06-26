import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../redux/coursesSlice";
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
const CourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.courseDetails[id]);

  const [openChapters, setOpenChapters] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const playerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [userSelectedSpeed, setUserSelectedSpeed] = useState(1.0); // Lưu tốc độ do người dùng chọn
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [touchTimer, setTouchTimer] = useState(null);

  let timeoutRef = useRef(null);
  // Kiểm tra xem thiết bị có hỗ trợ orientation không
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  // Toggle Play/Pause
  const togglePlayPause = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  // Tua nhanh hoặc tua lùi
  const seekTo = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + seconds);
    }
  };

  // Khi thay đổi tốc độ từ dropdown, cập nhật tốc độ do người dùng chọn
  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    setUserSelectedSpeed(newSpeed); // Cập nhật giá trị lưu trữ
  };
  // Lắng nghe sự kiện bàn phím
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        seekTo(5); // Tua nhanh 5 giây
      } else if (e.key === "ArrowLeft") {
        seekTo(-5); // Tua lùi 5 giây
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault(); // Ngăn trang web cuộn khi nhấn Space
        togglePlayPause(); // Play/Pause
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayPause]);
  // Cập nhật thanh timeline
  const handleProgress = (state) => {
    setPlayed(state.played);
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };
  // Xử lý khi thay đổi thanh seek bar
  const handleSeekChange = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    playerRef.current.seekTo(newPlayed);
  };

  // Ẩn control sau 1.5s nếu không thao tác
  const resetHideControlsTimer = () => {
    setShowControls(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1500);
  };

  useEffect(() => {
    resetHideControlsTimer();
  }, []);

  const updateViewport = (scale) => {
    let metaViewport = document.querySelector("meta[name=viewport]");
    if (metaViewport) {
      metaViewport.setAttribute(
        "content",
        `width=device-width, initial-scale=${scale}, maximum-scale=1, user-scalable=no`
      );
    }
  };
  // Xử lý Fullscreen + Xoay ngang trên mobile
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await videoContainerRef.current.requestFullscreen();
      setIsFullscreen(true);

      if (isMobile && screen.orientation) {
        await screen.orientation.lock("landscape");
      }

      updateViewport(1); // Khi vào fullscreen, giữ initial-scale=1
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);

      if (isMobile && screen.orientation) {
        await screen.orientation.unlock();
      }

      updateViewport(1); // Khi thoát fullscreen, reset lại initial-scale=1
    }
  };
  const handleTouchStart = () => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setUserSelectedSpeed(speed); // Lưu tốc độ trước đó
        setSpeed(2.0);
      }, 250); // Chờ 0.5s trước khi đổi tốc độ

      setTouchTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      clearTimeout(touchTimer); // Hủy nếu chưa đủ 0.5s
      if (userSelectedSpeed !== null) {
        setSpeed(userSelectedSpeed); // Khôi phục tốc độ cũ
      }
    }
  };

  // Xử lý nhấn đúp chuột để fullscreen
  const handleDoubleClick = () => {
    toggleFullscreen();
  };
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (id) dispatch(fetchCourseById(id));
  }, [dispatch, id]);

  const toggleChapter = (index) => {
    setOpenChapters((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setIsSidebarOpen(false);
  };

  // if (status === "loading")
  //   return <div className="p-10">Đang tải khóa học...</div>;
  // if (status === "failed")
  //   return <div className="p-10 text-red-500">{error}</div>;
  if (!course) return <div className="p-10">Không tìm thấy khóa học</div>;
  // console.log("Dữ liệu khóa học trong component:", course);

  return (
    <div className="flex md:h-screen h-120 ">
      {/* Nút mở sidebar trên mobile */}
      <button
        className="md:hidden absolute left-2 top-2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 bg-gray-100 p-4 w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:w-1/4 z-50 shadow-lg md:shadow-none`}
      >
        <button
          className="md:hidden absolute top-4 right-4"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>
        <h2 className="sm:text-xl text-lg pr-10 font-bold mb-4">
          {course.title}
        </h2>
        {course.chapters?.map((chapter, chIndex) => (
          <div key={chapter._id} className="mb-2">
            <button
              className="w-full text-left font-semibold flex items-center bg-gray-200 p-2 rounded-md hover:bg-gray-300"
              onClick={() => toggleChapter(chIndex)}
            >
              <ChevronRight
                size={18}
                className={`transition-transform ${
                  openChapters[chIndex] ? "rotate-90" : ""
                }`}
              />
              <span className="ml-2">{chapter.title}</span>
            </button>
            {openChapters[chIndex] && (
              <div className="ml-4 mt-2">
                {chapter?.lessons.map((lesson) => (
                  <button
                    key={lesson._id}
                    className={`block w-full text-left p-2 rounded-md ${
                      selectedLesson?._id === lesson._id
                        ? "bg-blue-200 font-semibold"
                        : "hover:bg-gray-300"
                    }`}
                    onClick={() => handleLessonSelect(lesson)}
                  >
                    {lesson.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {/* Bước 2: Hiển thị danh sách bài kiểm tra */}
        <div className="mt-6">
          <h3 className="sm:text-l text-lg font-bold mb-2">Bài kiểm tra</h3>
          {course.tests?.length > 0 ? (
            <div>
              {course.tests.map((test) => (
                <Link
                  key={test._id}
                  // Giả sử bạn có route вида `/course/:courseId/test/:testId`
                  to={`/course/${id}/test/${test._id}`}
                  className="block w-full text-left p-2 rounded-md hover:bg-gray-300"
                  onClick={() => setIsSidebarOpen(false)} // Ẩn sidebar khi click trên mobile
                >
                  📝 {test.title}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm ml-2">
              Chưa có bài kiểm tra nào.
            </p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <button
          className="md:hidden mb-4 bg-gray-200 p-2 rounded-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        {selectedLesson ? (
          <>
            <h1 className="text-2xl font-bold">{selectedLesson.title}</h1>
            {/* <iframe
              className="w-full h-64 md:h-110 mt-4 rounded-lg shadow-md"
              src={selectedLesson.youtubeUrl}
              title={selectedLesson.title}
              frameBorder="0"
              allowFullScreen
            ></iframe> */}

            <div
              ref={videoContainerRef}
              className="relative w-full md:w-4xl mx-auto md:h-9/12 h-1/2 bg-none rounded-lg overflow-hidden cursor-pointer"
              onMouseMove={resetHideControlsTimer} // Reset khi di chuột
              // onDoubleClick={isMobile ? undefined : handleDoubleClick} // Nhấn đúp để fullscreen
              onContextMenu={(e) => e.preventDefault()} // Chặn chuột phải
              onTouchStart={handleTouchStart} // Khi chạm vào màn hình
              onTouchEnd={handleTouchEnd} // Khi thả tay ra
            >
              {/* Video Player */}
              <ReactPlayer
                ref={playerRef}
                url={selectedLesson.lectureUrl}
                playing={playing}
                controls={false} // Ẩn control mặc định
                width="100%"
                height="100%"
                playbackRate={speed}
                volume={muted ? 0 : volume}
                onProgress={handleProgress}
                onDuration={handleDuration} // Lấy tổng thời lượng video
              />

              {/* Overlay Controls */}
              <div
                className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Vùng chạm để tua */}
                <div className="absolute inset-0 flex">
                  {/* Bên trái - Tua lại */}
                  <div
                    className="w-1/2 h-full"
                    onDoubleClick={() =>
                      isMobile ? seekTo(-10) : toggleFullscreen()
                    } // Tua lại 10 giây khi double tap
                    onClick={togglePlayPause}
                  ></div>

                  {/* Bên phải - Tua nhanh */}
                  <div
                    className="w-1/2 h-full"
                    onDoubleClick={() =>
                      isMobile ? seekTo(10) : toggleFullscreen()
                    } // Tua nhanh 10 giây khi double tap
                    onClick={togglePlayPause}
                  ></div>
                </div>
                {/* Điều khiển video */}
                {/*Hiện thời gian*/}

                <div className="absolute bottom-0 w-full bg-black/30 bg-opacity-50 p-2 pt-12 flex justify-between items-center">
                  {/* Tua lại */}
                  <div className="text-white text-sm absolute bottom-16 md:left-5 left-2">
                    {formatTime(playedSeconds)} / {formatTime(duration)}
                  </div>
                  {/* Thanh tiến trình */}
                  <div className="absolute top-7.5 w-full h-1 bg-gray-400 rounded-full mt-2">
                    {/* Phần đã xem (màu đỏ) */}
                    <div
                      className="absolute top-0 left-0 h-1 bg-red-500 rounded-full"
                      style={{ width: `${played * 100}%` }}
                    ></div>

                    {/* Input range ẩn để điều chỉnh */}
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="0.01"
                      value={played}
                      onChange={handleSeekChange}
                      className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer z-10"
                    />

                    {/* Nút tròn (thumb) màu đỏ */}
                    <div
                      className="absolute w-4 h-4 bg-red-500 rounded-full -top-1.5 transform -translate-x-1/2 cursor-pointer"
                      style={{ left: `${played * 100}%` }}
                    ></div>
                  </div>
                  <button
                    onClick={() => seekTo(-5)}
                    className="text-white p-2 rounded-full hover:bg-gray-700"
                  >
                    <FaBackward size={20} />
                  </button>

                  {/* Play / Pause */}
                  <button
                    onClick={togglePlayPause}
                    className="text-white p-2 rounded-full bg-blue-500 hover:bg-blue-700 text-center"
                  >
                    {playing ? <FaPause size={12} /> : <FaPlay size={12} />}
                  </button>

                  {/* Tua tới */}
                  <button
                    onClick={() => seekTo(5)}
                    className="text-white p-2 rounded-full hover:bg-gray-700"
                  >
                    <FaFastForward size={20} />
                  </button>

                  {/* Chỉnh âm lượng */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setMuted(!muted)}
                      className="text-white md:p-1 p-0 rounded-full hover:bg-gray-700"
                    >
                      {muted || volume === 0 ? (
                        <FaVolumeMute size={20} />
                      ) : (
                        <FaVolumeUp size={20} />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="0.05"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-16 h-1 appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #4a90e2 0%, #4a90e2 ${
                          volume * 100
                        }%, #d1d5db ${volume * 100}%, #d1d5db 100%)`,
                      }}
                    />
                  </div>
                  {/* Tốc độ phát */}
                  <select
                    value={speed}
                    onChange={handleSpeedChange}
                    className="text-white bg-black/50 md:p-1 p-0 rounded border border-white"
                  >
                    <option value="0.5">0.5x</option>
                    <option value="1">1x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="text-white p-2 rounded-full hover:bg-gray-700"
                  >
                    {isFullscreen ? (
                      <FaCompress size={20} />
                    ) : (
                      <FaExpand size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-5 mt-4 space-y-2">
              {selectedLesson.pdfLecture && (
                <a
                  href={selectedLesson.pdfLecture}
                  className="text-blue-500 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 Tải bài giảng {`(file PDF)`}
                </a>
              )}
              {selectedLesson.pdfExercise && (
                <a
                  href={selectedLesson.pdfExercise}
                  className="text-blue-500 flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📝 Tải bài tập {`(file PDF)`}
                </a>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500">
            Chọn một bài giảng từ danh sách bên trái.
          </p>
        )}
      </main>
    </div>
  );
};

export default CourseDetail;
