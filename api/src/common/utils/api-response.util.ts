export function ApiResponse<T>(
  data: T,
  message = 'Success',
  success = true,
) {
  return { success, message, data };
}
