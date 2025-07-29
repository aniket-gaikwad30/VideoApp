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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Enhanced Background with Animated Gradients */}
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20"></div>
          </div>
          
          {/* Floating Animation Elements */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 py-12 px-4">
          {/* Glassmorphism Header */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-12 max-w-6xl mx-auto shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                🎬 VideoVault Pro
              </h1>
              <p className="text-xl text-white/80 font-medium">
                Discover Amazing Content ✨
              </p>
            </div>

            {/* Enhanced Controls */}
            <div className="flex gap-6 items-center flex-col lg:flex-row justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/20"
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-6 py-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-purple-500 text-white shadow-lg transform scale-105' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-6 py-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-purple-500 text-white shadow-lg transform scale-105' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Upload Button */}
              <Link
                href="/upload"
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl text-white font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 hover:-rotate-1 border border-white/20 backdrop-blur-sm"
              >
                <span className="relative flex items-center gap-3">
                  <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Video
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{videos.length}</div>
                <div className="text-white/60 text-sm">Total Videos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{filteredVideos.length}</div>
                <div className="text-white/60 text-sm">Showing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">∞</div>
                <div className="text-white/60 text-sm">Possibilities</div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-pink-400 border-b-transparent rounded-full animate-spin animate-reverse"></div>
              </div>
              <span className="ml-4 text-2xl text-white font-semibold">Loading magic...</span>
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-20">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6">🎬</div>
                <h3 className="text-2xl font-bold text-white mb-4">No Videos Found</h3>
                <p className="text-white/70 mb-6">
                  {searchTerm ? 'Try a different search term' : 'Be the first to upload something amazing!'}
                </p>
                <Link 
                  href="/upload" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-300"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Video
                </Link>
              </div>
            </div>
          ) : (
            /* Video Grid/List */
            <div className={`max-w-7xl mx-auto ${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8' 
                : 'space-y-6'
            }`}>
              {filteredVideos.filter(v => v._id).map((video, index) => (
                <div
                  key={video._id!.toString()}
                  className={`group backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-rotate-1 shadow-2xl hover:shadow-purple-500/25 ${
                    viewMode === 'list' ? 'flex items-center p-6' : 'flex flex-col'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Video Thumbnail */}
                  <div className={`relative bg-black/50 rounded-2xl overflow-hidden ${
                    viewMode === 'list' ? 'w-48 h-28 flex-shrink-0' : 'w-full h-48'
                  }`}>
                    <Image
                      src={typeof video.thumbnailUrl === "string" && video.thumbnailUrl ? video.thumbnailUrl : "/fallback-thumbnail.png"}
                      alt={video.title}
                      width={400}
                      height={225}
                      unoptimized
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Play Button Overlay */}
                    <button
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      onClick={(e) => { e.stopPropagation(); setModalVideo(video); }}
                      aria-label="Play video"
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </button>

                    {/* Delete Button */}
                    {session && (
                      <button
                        className="absolute top-3 right-3 w-10 h-10 bg-red-500/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                        onClick={(e) => { e.stopPropagation(); handleDelete(video._id!.toString()); }}
                        title="Delete video"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-lg">
                      {Math.floor(Math.random() * 10) + 1}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className={`${viewMode === 'list' ? 'ml-6 flex-1' : 'p-6'}`}>
                    <h2 className="font-bold text-xl mb-2 text-white group-hover:text-purple-300 transition-colors duration-300 line-clamp-2">
                      {video.title}
                    </h2>
                    <p className="text-white/70 text-sm line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                      {video.description}
                    </p>
                    
                    {viewMode === 'list' && (
                      <div className="flex items-center gap-4 mt-4">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                          Video
                        </span>
                        <span className="text-white/50 text-xs">
                          {Math.floor(Math.random() * 1000) + 100} views
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal Video Player */}
      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl max-w-4xl w-full relative overflow-hidden">
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-red-500/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 transition-all duration-300"
              onClick={() => setModalVideo(null)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Player */}
            <div className="p-6">
              <video
                src={modalVideo.videoUrl}
                controls
                autoPlay
                poster={modalVideo.thumbnailUrl}
                className="w-full h-96 object-contain bg-black rounded-2xl shadow-2xl"
              />
              
              {/* Video Details */}
              <div className="mt-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h2 className="font-bold text-3xl mb-3 text-white">
                  {modalVideo.title}
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  {modalVideo.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    Like
                  </button>
                  <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
