export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  0:   'Sin conexión. Verifica tu internet e intenta de nuevo.',
  400: 'Los datos enviados no son válidos. Revisa el formulario.',
  401: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
  403: 'No tienes permisos para realizar esta acción.',
  404: 'No encontramos lo que buscabas.',
  409: 'Ya existe un registro con esos datos.',
  500: 'Ocurrió un error en el servidor. Intenta más tarde.',
  503: 'El servicio no está disponible temporalmente.',
};

export const DEFAULT_ERROR_MESSAGE = 'Ocurrió un error inesperado. Intenta de nuevo.';

export const getErrorMessage = (status: number, backendMessage?: string): string => {
  // Para errores 400, 409 y 404 mostrar el mensaje del backend si existe,
  // ya que son mensajes de negocio comprensibles para el usuario.
  // Para 401, 403, 500, 503, 0 siempre usar el mensaje amigable genérico.
  const businessErrors = [400, 404, 409];
  if (businessErrors.includes(status) && backendMessage) {
    return backendMessage;
  }
  return HTTP_ERROR_MESSAGES[status] ?? DEFAULT_ERROR_MESSAGE;
};
