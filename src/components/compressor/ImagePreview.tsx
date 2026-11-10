type ImagePreviewProps = {
  title: string;
  imageUrl: string;
  size: string;
  borderColor?: string;
};

function ImagePreview({
  title,
  imageUrl,
  size,
  borderColor = "border-slate-700",
}: ImagePreviewProps) {
  return (
    <div
      className={`rounded-xl ${borderColor} border bg-slate-900/50 p-4`}
    >
      <h4 className="mb-3 text-lg font-semibold text-white">
        {title}
      </h4>

      <img
        src={imageUrl}
        alt={title}
        className="h-72 w-full rounded-lg object-cover"
      />

      <div className="mt-3">
        <p className="text-sm text-slate-400">File Size</p>

        <p className="font-semibold text-white">
          {size}
        </p>
      </div>
    </div>
  );
}

export default ImagePreview;