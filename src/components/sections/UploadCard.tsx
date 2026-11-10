
import { useState } from "react";

type UploadCardProps = {
  onFileSelect: (file: File) => void;
};

function UploadCard({ onFileSelect }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      alert("Please select an image or video.");
      return;
    }

    onFileSelect(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      className={`mx-auto mt-16 w-full max-w-3xl rounded-3xl border p-10 backdrop-blur-md transition-all duration-300 ${
        isDragging
          ? "border-cyan-400 bg-cyan-500/20 scale-[1.02]"
          : "border-slate-800 bg-slate-900/60"
      }`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 text-6xl">
          {isDragging ? "📥" : "📁"}
        </div>

        <h2 className="text-2xl font-bold text-white">
          {isDragging ? "Drop Your File Here" : "Drag & Drop Your File"}
        </h2>

        <p className="mt-3 text-slate-400">
          or click to browse your device
        </p>

        <label
          htmlFor="file-upload"
          className="mt-8 cursor-pointer rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-900 transition hover:bg-cyan-400"
        >
          Choose File
        </label>

        <input
          id="file-upload"
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />

        <p className="mt-5 text-sm text-slate-500">
          Supports images and videos
        </p>
      </div>
    </div>
  );
}

export default UploadCard;
