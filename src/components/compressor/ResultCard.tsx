import ImagePreview from "./ImagePreview";

type ResultCardProps = {
  originalImage: string;
  compressedImage: string;
  originalSize: string;
  compressedSize: string;
  savings: string;
  downloadFile: () => void;
};

function ResultCard({
  originalImage,
  compressedImage,
  originalSize,
  compressedSize,
  savings,
  downloadFile,
}: ResultCardProps) {
  return (
    <div className="mt-8 w-full max-w-6xl rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
      <h3 className="mb-6 text-center text-2xl font-bold text-green-300">
        ✅ Compression Complete
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        <ImagePreview
          title="Original Image"
          imageUrl={originalImage}
          size={originalSize}
        />

        <ImagePreview
          title="Compressed Image"
          imageUrl={compressedImage}
          size={compressedSize}
          borderColor="border-green-500/20"
        />
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <p className="text-xl font-bold text-green-300">
          🎉 You saved {savings}%
        </p>

        <button
          onClick={downloadFile}
          className="rounded-xl bg-green-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-green-400"
        >
          ⬇ Download Compressed Image
        </button>
      </div>
    </div>
  );
}

export default ResultCard;