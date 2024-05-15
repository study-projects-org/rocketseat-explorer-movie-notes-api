
export function getCurrentDateString() {
  return new Date().toISOString().replace('T', ' ').split('.')[0];
}