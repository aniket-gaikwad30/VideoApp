"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "../components/FileUpload";
import { signIn, useSession } from "next-auth/react";

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  if (status === "loading") return <div>Loading...</div>;
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="mb-4 text-xl font-semibold">You must be logged in to upload videos.</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => signIn()}
        >
          Login
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to upload video");
      }
      setSuccess("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error("Error uploading video:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />
        <div>
          <label className="block mb-1 font-medium">Video File</label>
          <FileUpload
            fileType="video"
            onSuccess={res => {
              console.log("Video upload result:", res);
              if (typeof res === "object" && res !== null && ("url" in res || "fileUrl" in res)) {
                // @ts-expect-error: We know res has url or fileUrl
                setVideoUrl(res.url || res.fileUrl || "");
              }
            }}
          />
          {videoUrl && <p className="text-green-600 text-sm mt-1">Video uploaded!</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Thumbnail Image</label>
          <FileUpload
            fileType="image"
            onSuccess={res => {
              console.log("Thumbnail upload result:", res);
              if (typeof res === "object" && res !== null && ("url" in res || "fileUrl" in res)) {
                // @ts-expect-error: We know res has url or fileUrl
                setThumbnailUrl(res.url || res.fileUrl || "");
              }
            }}
          />
          {thumbnailUrl && <p className="text-green-600 text-sm mt-1">Thumbnail uploaded!</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading || !videoUrl || !thumbnailUrl}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
        {success && <p className="text-green-600 text-sm">{success}</p>}
      </form>
    </div>
  );
} 