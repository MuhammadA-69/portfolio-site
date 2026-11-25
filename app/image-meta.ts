import dimensions from "./image-dimensions.json";

type ImageSize = { width?: number; height?: number };

const map = dimensions as Record<string, { width: number; height: number }>;

export function imageSize(src: string): ImageSize {
  return map[src] ?? {};
}
