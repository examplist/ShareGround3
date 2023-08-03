export function searchTrimPathVariable(input: string): string {
  // 가장자리 공백 제거
  const trimmed = input.trim();
  // ?를 %3F로 교체
  const replaced1 = trimmed.replaceAll('?', '%3F');
  // &를 %26로 교체
  const replaced2 = replaced1.replaceAll('&', '%26');
  // =를 %3D로 교체
  const replaced3 = replaced2.replaceAll('=', '%3D');

  return replaced3;
}
