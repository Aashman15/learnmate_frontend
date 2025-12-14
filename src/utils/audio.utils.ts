export type AudioMimeType =
  | "audio/webm;codecs=opus"
  | "audio/ogg;codecs=opus"
  | "audio/mp4";

export const mimeToExtension: Record<AudioMimeType, string> = {
  "audio/webm;codecs=opus": "webm",
  "audio/ogg;codecs=opus": "ogg",
  "audio/mp4": "m4a",
};

export function getSupportedAudioFormat() {
  const mimeTypes: AudioMimeType[] = [
    "audio/webm;codecs=opus",
    "audio/ogg;codecs=opus",
    "audio/mp4",
  ];

  const supportedType = mimeTypes.find((type) =>
    MediaRecorder.isTypeSupported(type)
  );

  if (!supportedType) {
    throw new Error("No supported audio format!");
  }

  const extension = mimeToExtension[supportedType];
  return { mimeType: supportedType, extension };
}
