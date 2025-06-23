"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IVideo } from "@/models/Video";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVideo, setModalVideo] = useState<IVideo | null>(null);
  const { data: session } = useSession();

  const fetchVideos = () => {
    setLoading(true);
    fetch("/api/video")
      .then((res) => res.json())
      .then((data) => {
        setVideos(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await fetch(`/api/video?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete video");
        return;
      }
      fetchVideos();
    } catch {
      alert("Failed to delete video");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-700 drop-shadow">Video Feed</h1>
      <div className="flex gap-4 items-center flex-col sm:flex-row w-full justify-between mb-8 max-w-4xl mx-auto">
        <a
          className="rounded-full border border-blue-500 transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-semibold text-base h-12 px-6 shadow-lg"
          href="/upload"
        >
          Upload Video
        </a>
      </div>
      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading videos...</div>
      ) : videos.length === 0 ? (
        <div className="text-center text-gray-600">No videos uploaded yet. Be the first to <Link href="/upload" className="text-blue-600 underline">upload a video</Link>!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {videos.filter(v => v._id).map((video) => (
            <div
              key={video._id!.toString()}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow flex flex-col cursor-pointer group border border-gray-100 relative"
            >
              <div className="relative w-full h-56 bg-black">
                <Image
                  src={typeof video.thumbnailUrl === "string" && video.thumbnailUrl ? video.thumbnailUrl : "/fallback-thumbnail.png"}
                  alt={video.title}
                  width={400}
                  height={225}
                  unoptimized
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={e => { e.stopPropagation(); setModalVideo(video); }}
                  aria-label="Play video"
                >
                  <svg className="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 84 84"><circle cx="42" cy="42" r="42" fill="rgba(0,0,0,0.4)"/><polygon points="34,26 62,42 34,58" fill="white"/></svg>
                </button>
                {/* Delete button, only show if authenticated */}
                {session && (
                  <button
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow hover:bg-red-700 transition z-10"
                    onClick={e => { e.stopPropagation(); handleDelete(video._id!.toString()); }}
                    title="Delete video"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="font-bold text-xl mb-2 line-clamp-2 text-gray-900">{video.title}</h2>
                <p className="text-gray-500 text-sm flex-1 line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal Video Player */}
      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setModalVideo(null)}>
          <div className="bg-white rounded-xl shadow-2xl p-4 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold" onClick={() => setModalVideo(null)}>&times;</button>
            <video
              src={modalVideo.videoUrl}
              controls
              autoPlay
              poster={modalVideo.thumbnailUrl}
              className="w-full h-96 object-contain bg-black rounded-lg"
            />
            <div className="mt-4">
              <h2 className="font-bold text-2xl mb-2 text-gray-900">{modalVideo.title}</h2>
              <p className="text-gray-600 text-base">{modalVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
