
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();

let isLoaded = false;

export async function compressVideo(file: File): Promise<Blob> {
  if (!isLoaded) {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";

    await ffmpeg.load({
      coreURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.js`,
        "text/javascript"
      ),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });

    isLoaded = true;
  }

  const inputName = "input-video";
  const outputName = "compressed-video.mp4";

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  await ffmpeg.exec([
    "-i", inputName,
    "-vcodec", "libx264",
    "-crf", "28",
    "-preset", "ultrafast",
    "-acodec", "aac",
    outputName,
  ]);

  const data = await ffmpeg.readFile(outputName);

  return new Blob([data as Uint8Array<ArrayBuffer>], {
    type: "video/mp4",
  });
}
