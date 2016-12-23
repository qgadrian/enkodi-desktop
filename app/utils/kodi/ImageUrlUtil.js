const imageUrlPrefix = 'image://';

export default function parseThumbnailUrl(rawUrl) {
  if (rawUrl && rawUrl.startsWith(imageUrlPrefix)) {
    const decodedUrl = decodeURIComponent(rawUrl.replace(imageUrlPrefix, ''));
    return decodedUrl.slice(0, -1);
  }

  return rawUrl;
}
