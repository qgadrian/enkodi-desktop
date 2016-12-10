export default function parseThumbnailUrl(rawUrl) {
  if (rawUrl) {
    const decodedUrl = decodeURIComponent(rawUrl.replace('image://', ''));
    return decodedUrl.slice(0, -1);
  }
}
