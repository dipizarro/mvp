// Tipo estándar para datos de nacimiento de una carta astral
export type BirthData = {
  name?: string;
  date: string; // formato: YYYY-MM-DD
  time: string; // formato: HH:mm
  place: string; // ciudad o lugar de nacimiento
  latitude?: number;
  longitude?: number;
  timezone?: string;
};

// Tipo para los datos requeridos por el backend de carta astral
export type ChartRequest = {
  date: string; // formato: YYYY/MM/DD HH:mm
  latitude: number;
  longitude: number;
  type: string; // profesional, espiritual, etc.
};

export async function calculateChart(data: ChartRequest) {
  try {
    // Si no hay API_URL configurada, usar la URL relativa para el mismo servidor
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
    const endpoint = API_URL + '/api/chart/';
    
    console.log('Intentando conectar a:', endpoint);
    
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Respuesta del backend:", errorText);
      return { error: "Error al generar la carta astral: " + errorText };
    }

    const result = await res.json();
    console.log('Respuesta exitosa del servidor:', result);
    return result;
  } catch (error: unknown) {
    console.error("Error de red o inesperado:", error);
    
    // Proporcionar mensajes de error más específicos
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return { error: "No se pudo conectar con el servidor. Verifica tu conexión a internet." };
    }
    
    return { error: "Error inesperado al procesar la solicitud. Intenta más tarde." };
  }
}
