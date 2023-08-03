export function makePhotoURL(photoBlob: number[]) {
  const data = new Uint8Array(photoBlob);
  const blob = new Blob([data]);
  return URL.createObjectURL(blob);
}
