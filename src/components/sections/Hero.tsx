
import { useMemo, useState } from "react";
import { compressImage } from "../../utils/compressImage";
import { compressVideo } from "../../utils/compressVideo";

import Container from "../layout/Container";
import UploadCard from "./UploadCard";

function Hero() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const originalPreview = useMemo(
    () => selectedFile ? URL.createObjectURL(selectedFile) : "",
    [selectedFile]
  );

  const compressedPreview = useMemo(
    () => compressedFile ? URL.createObjectURL(compressedFile) : "",
    [compressedFile]
  );

  async function handleCompressFile() {
    if (!selectedFile) {
      alert("Please choose a file first.");
      return;
    }

    setIsCompressing(true);

    try {
      if (selectedFile.type.startsWith("image/")) {
        const result = await compressImage(selectedFile);
        setCompressedFile(result);
      } else if (selectedFile.type.startsWith("video/")) {
        const result = await compressVideo(selectedFile);

        const compressedVideo = new File(
          [result],
          `compressed-${selectedFile.name.replace(/\.[^/.]+$/, "")}.mp4`,
          { type: "video/mp4" }
        );

        setCompressedFile(compressedVideo);
      } else {
        alert("Unsupported file type.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to compress file.");
    } finally {
      setIsCompressing(false);
    }
  }

  function formatSize(bytes: number) {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }

    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }

  function getSavings() {
    if (!selectedFile || !compressedFile) return "0";

    const saved =
      ((selectedFile.size - compressedFile.size) / selectedFile.size) * 100;

    return saved.toFixed(1);
  }

  return (
    <Container>
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden text-center">
        <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <p className="mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          ⚡ Fast • 🔒 Secure • 🌍 Browser-Based
        </p>

        <h1 className="max-w-4xl bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl">
          Compress Images & Videos
          <span className="block text-cyan-400">
            Without Losing Quality
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Reduce file sizes in seconds. Everything runs directly in your
          browser, keeping your files private and secure.
        </p>

        <UploadCard
          onFileSelect={(file) => {
            setSelectedFile(file);
            setCompressedFile(null);
          }}
        />

        {selectedFile && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <p className="text-white">
              Selected: <span className="text-cyan-300">{selectedFile.name}</span>
            </p>

            <button
              onClick={handleCompressFile}
              disabled={isCompressing}
              className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCompressing ? "Compressing..." : "Compress Image"}
            </button>
          </div>
        )}

        {compressedFile && (
          <div className="mt-8 w-full max-w-6xl rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
            <h3 className="mb-6 text-center text-2xl font-bold text-green-300">
              ✅ Compression Complete
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
                <h4 className="mb-3 text-lg font-semibold text-white">
                 Original File
                </h4>

                {selectedFile?.type.startsWith("video/") ? (
                  <video
                    src={originalPreview}
                    controls
                    className="h-72 w-full rounded-lg object-cover"
                  />
                ) : (
                  <img
                    src={originalPreview}
                    alt="Original"
                    className="h-72 w-full rounded-lg object-cover"
                  />
                )}

                <p className="mt-3 text-sm text-slate-400">Original Size</p>
                <p className="font-semibold text-white">
                  {formatSize(selectedFile!.size)}
                </p>
              </div>

              <div className="rounded-xl border border-green-500/20 bg-slate-900/50 p-4">
                <h4 className="mb-3 text-lg font-semibold text-green-300">
                  Compressed File
                </h4>

                {compressedFile.type.startsWith("video/") ? (
                  <video
                    src={compressedPreview}
                    controls
                    className="h-72 w-full rounded-lg object-cover"
                  />
                ) : (
                  <img
                    src={compressedPreview}
                    alt="Compressed"
                    className="h-72 w-full rounded-lg object-cover"
                  />
                )}
                <p className="mt-3 text-sm text-slate-400">Compressed Size</p>
                <p className="font-semibold text-green-300">
                  {formatSize(compressedFile.size)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
              <p className="text-xl font-bold text-green-300">
                🎉 You saved {getSavings()}%
              </p>

              {selectedFile && compressedFile && (
                <a
                  href={compressedPreview}
                  download={`compressed-${selectedFile.name}`}
                  className="rounded-xl bg-green-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-green-400"
                >
                  Download Compressed File
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </Container>
  );
}

export default Hero;
