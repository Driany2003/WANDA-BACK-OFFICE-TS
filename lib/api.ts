// API service functions for the application

const API_BASE_URL = 'http://localhost:8080/api';

// Promoción Types
export interface PromocionCreateDTO {
  promNombre: string;
  promMonto: number;
  promDescripcion?: string;
  promFechaInicio: string; // Format: YYYY-MM-DD
  promFechaFin: string; // Format: YYYY-MM-DD
  promHoraInicio?: string; // Format: HH:mm
  promHoraFin?: string; // Format: HH:mm
  promImagen: File;
  promTerminoCondiciones?: string;
  promIsActive: boolean;
}

export interface PromocionResponse {
  promId?: number;
  promNombre?: string;
  promMonto?: number;
  promDescripcion?: string;
  promFechaInicio?: string;
  promFechaFin?: string;
  promHoraInicio?: string;
  promHoraFin?: string;
  promImagen?: string;
  promTerminoCondiciones?: string;
  promIsActive?: boolean;
  mensaje?: string;
  success?: boolean;
}

export interface PromocionActualDTO {
  promId: number;
  promNombre: string;
  promocionesSolicitadas: number;
  promMonto: number;
  estado: string;
}

export interface PromocionSolicitadaDTO {
  solId: number;
  suscNombre: string;
  suscUsuarioTikTok: string;
  promNombre: string;
  estado: string;
  solCanje: string;
  solFechaSolicitud: string;
}

export interface PromocionVencidaDTO {
  promId: number;
  promNombre: string;
  promocionesSolicitadas: number;
  promMonto: number;
  estado: string;
}

export interface UsuarioAdminDTO {
  id: string;
  authUsername: string;
  nombre: string;
  apellido: string;
  correo: string;
  authRol: string;
  estado: string;
  fechaCreacion?: string;
  fechaUltimaModificacion?: string;
}

export interface AnfitrionDTO {
  id: number;
  nombre: string;
}

export interface ConcursoCreateDTO {
  concNombre: string;
  concFechaPropuesta: string; 
  usuaId: number;
  concWc: number;
  concIsActive: boolean;
}

export interface ConcursoUpdateDTO {
  concId: number;
  concNombre: string;
  concFechaPropuesta: string;
  usuaId: number;
  concWc: number;
  concImagen?: string;
  concIsActive: boolean;
}

export interface ConcursoResponse {
  concId?: number;
  mensaje?: string;
  success?: boolean;
}

export interface ConcursoAdminDTO {
  concId: number;
  concNombre: string;
  concFechaPropuesta: string;
  usuaId: number;
  nombreAnfitrion: string;
  concWc: number;
  concImagen: string;
  estado: string; // El backend retorna "Activo"/"Inactivo" como string
  fechaRegistrado: string;
}

export interface UsuarioResponseDTO {
  id?: number;
  nombre?: string;
  apellido?: string;
  correo?: string;
  username?: string;
  authRol?: string;
  isActive?: boolean;
  fechaRegistrado?: string;
  fechaModificado?: string;
  mensaje: string;
  success: boolean;
}

export interface UsuarioUpdateDTO {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  authUsername: string;
  authRol: string;
  isActive: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Usuario API functions
export const usuarioApi = {
  // Get all users for admin
  async findAll(): Promise<UsuarioAdminDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/find-all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Add authentication token if needed
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // Assuming the API returns the array directly
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Create a new user
  async create(userData: {
    nombre: string;
    apellido: string;
    correo: string;
    authUsername: string;
    authPassword: string;
    validarAuthPassword: string;
    authRol: string;
    isActive: boolean;
  }): Promise<UsuarioResponseDTO> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.mensaje || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update a user
  async update(userData: UsuarioUpdateDTO): Promise<UsuarioResponseDTO> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.mensaje || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete a user
  async delete(id: string): Promise<UsuarioResponseDTO> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.mensaje || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Reset password
  async resetPassword(id: string, newPassword: string): Promise<UsuarioResponseDTO> {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/${id}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.mensaje || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
};

// Anfitriones API functions
export const anfitrionApi = {
  // Get all active anfitriones
  async getActiveAnfitriones(): Promise<AnfitrionDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/concurso/anfitriones-active`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching anfitriones:', error);
      throw error;
    }
  }
};

// Concursos API functions
export const concursoApi = {
  // Get all concursos for admin
  async findAllForAdmin(): Promise<ConcursoAdminDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/concurso/find-all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching concursos:', error);
      throw error;
    }
  },

  async createWithImage(concursoData: ConcursoCreateDTO, imageFile: File): Promise<ConcursoResponse> {
    try {
      const formData = new FormData();
      
      // Agregar cada campo individualmente como espera el backend
      formData.append('concNombre', concursoData.concNombre);
      formData.append('concFechaPropuesta', concursoData.concFechaPropuesta);
      formData.append('usuaId', concursoData.usuaId.toString());
      formData.append('concWc', concursoData.concWc.toString());
      formData.append('concIsActive', concursoData.concIsActive.toString());
      formData.append('concImagen', imageFile);

      const response = await fetch(`${API_BASE_URL}/concurso/create`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      // El backend retorna HttpStatus.CREATED (201) cuando concId != null
      if (!response.ok || (response.status !== 201 && !data.success)) {
        throw new Error(data.mensaje || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Error creating concurso with image:', error);
      throw error;
    }
  },

  // Update a concurso (with or without image) - using FormData like CREATE
  async updateWithImage(concursoData: ConcursoUpdateDTO, imageFile?: File): Promise<ConcursoResponse> {
    try {
      console.log('🔄 Enviando datos para actualizar concurso:', concursoData);
      
      const formData = new FormData();
      formData.append('concId', concursoData.concId.toString());
      formData.append('concNombre', concursoData.concNombre);
      formData.append('concFechaPropuesta', concursoData.concFechaPropuesta);
      formData.append('usuaId', concursoData.usuaId.toString());
      formData.append('concWc', concursoData.concWc.toString());
      formData.append('concIsActive', concursoData.concIsActive.toString());
      
      // Solo agregar la imagen si se proporciona una nueva
      if (imageFile) {
        formData.append('concImagen', imageFile);
        console.log('📸 Incluyendo nueva imagen en la actualización');
      } else {
        console.log('📝 Actualizando sin cambiar imagen');
      }

      const response = await fetch(`${API_BASE_URL}/concurso/update`, {
        method: 'PUT',
        body: formData,
      });

      console.log('📡 Respuesta del servidor - Status:', response.status);
      const data = await response.json();
      console.log('📡 Respuesta del servidor - Data:', data);

      // Si el status es 200, consideramos que fue exitoso independientemente del campo success
      if (response.status === 200) {
        console.log('✅ Actualización exitosa');
        return data;
      }

      // Para otros códigos de estado, verificamos el campo success
      if (!response.ok || !data.success) {
        throw new Error(data.mensaje || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Error updating concurso:', error);
      throw error;
    }
  },

  // Delete a concurso
  async delete(id: number): Promise<ConcursoResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/concurso/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log('📡 Respuesta del servidor - Status:', response.status);
      const data = await response.json();
      console.log('📡 Respuesta del servidor - Data:', data);

      // Si el status es 200, consideramos que fue exitoso independientemente del campo success
      if (response.status === 200) {
        console.log('✅ Eliminación exitosa');
        return data;
      }

      // Para otros códigos de estado, verificamos el campo success
      if (!response.ok || !data.success) {
        throw new Error(data.mensaje || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Error deleting concurso:', error);
      throw error;
    }
  }
};

// Promocion API
export const promocionAPI = {
  // Create a new promoción
  async create(data: PromocionCreateDTO): Promise<PromocionResponse> {
    try {
      const formData = new FormData();
      formData.append('promNombre', data.promNombre);
      formData.append('promMonto', data.promMonto.toString());
      
      if (data.promDescripcion) {
        formData.append('promDescripcion', data.promDescripcion);
      }
      
      formData.append('promFechaInicio', data.promFechaInicio);
      formData.append('promFechaFin', data.promFechaFin);
      
      if (data.promHoraInicio) {
        formData.append('promHoraInicio', data.promHoraInicio);
      }
      
      if (data.promHoraFin) {
        formData.append('promHoraFin', data.promHoraFin);
      }
      
      formData.append('promImagen', data.promImagen);
      
      if (data.promTerminoCondiciones) {
        formData.append('promTerminoCondiciones', data.promTerminoCondiciones);
      }
      
      formData.append('promIsActive', data.promIsActive.toString());

      const response = await fetch(`${API_BASE_URL}/promocion/create`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: PromocionResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating promoción:', error);
      throw error;
    }
  },

  // Get all promociones
  async findAll(): Promise<PromocionResponse[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/promocion/find-all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: PromocionResponse[] = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching promociones:', error);
      throw error;
    }
  },

  // Get promoción by ID
  async findById(id: number): Promise<PromocionResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/promocion/find-by-id/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: PromocionResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching promoción:', error);
      throw error;
    }
  },

  // Get promociones actuales (activas)
  async getActuales(): Promise<PromocionActualDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/promocion/actuales`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: PromocionActualDTO[] = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching promociones actuales:', error);
      throw error;
    }
  },

  // Get promociones solicitadas
  async getSolicitadas(): Promise<PromocionSolicitadaDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/promocion/solicitadas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: PromocionSolicitadaDTO[] = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching promociones solicitadas:', error);
      throw error;
    }
  },

  // Get promociones vencidas
  async getVencidas(): Promise<PromocionVencidaDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/promocion/vencidas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: PromocionVencidaDTO[] = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching promociones vencidas:', error);
      throw error;
    }
  },

  // Delete promoción
  async delete(id: number): Promise<{ success: boolean; response?: PromocionResponse }> {
    try {
      const response = await fetch(`${API_BASE_URL}/promocion/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log('📡 Respuesta del servidor - Status:', response.status);
      
      if (!response.ok) {
        // Intentar obtener el mensaje de error del servidor
        let errorMessage = `Error HTTP: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.mensaje || errorData.message || errorMessage;
          console.error('📡 Error del servidor:', errorData);
        } catch (e) {
          const errorText = await response.text();
          console.error('📡 Error del servidor (texto):', errorText);
        }
        throw new Error(errorMessage);
      }

      // Si la respuesta es 200 OK, la eliminación fue exitosa
      const result: PromocionResponse = await response.json();
      console.log('📡 Respuesta del servidor - Data:', result);
      return { success: true, response: result };
    } catch (error) {
      console.error('Error deleting promoción:', error);
      throw error;
    }
  }
};

// Novedades Types
export interface NovedadesCreateDTO {
  noveTitulo: string;
  noveDescripcion: string;
  noveFechaInicio: Date; // Date object that will be converted to ISO string
  noveFechaFin: Date; // Date object that will be converted to ISO string
  noveHoraInicio?: string; // Format: HH:mm
  noveHoraFin?: string; // Format: HH:mm
  noveImagen: File;
  noveIsActive: boolean;
  noveEstado?: string; // "Activa", "Inactiva", "Borrador" - opcional para actualización
}

export interface NovedadesResponse {
  noveId?: number;
  noveTitulo?: string;
  noveDescripcion?: string;
  noveFechaInicio?: string;
  noveFechaFin?: string;
  noveHoraInicio?: string;
  noveHoraFin?: string;
  noveImagen?: string;
  noveIsActive?: boolean;
  mensaje?: string;
  success?: boolean;
}

export interface NovedadesListResponse {
  noveId: number;
  noveTitulo: string;
  noveDescripcion: string;
  noveFechaInicio: string; // Timestamp from backend
  noveFechaFin: string; // Timestamp from backend
  noveHoraInicio?: string; // Timestamp from backend
  noveHoraFin?: string; // Timestamp from backend
  noveImagen: string;
  noveEstado: string; // "Activa", "Inactiva", "Borrador"
}

// Helper function to convert date and time to Timestamp format: yyyy-MM-dd HH:mm:ss
const createTimestamp = (date: Date, time?: string): string => {
  const dateTime = new Date(date)
  
  // Si hay hora, combinarla con la fecha
  if (time) {
    const [hours, minutes] = time.split(':')
    dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0)
  }
  
  // Formatear a yyyy-MM-dd HH:mm:ss
  const year = dateTime.getFullYear()
  const month = String(dateTime.getMonth() + 1).padStart(2, '0')
  const day = String(dateTime.getDate()).padStart(2, '0')
  const hours = String(dateTime.getHours()).padStart(2, '0')
  const minutes = String(dateTime.getMinutes()).padStart(2, '0')
  const seconds = String(dateTime.getSeconds()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// Novedades API functions
export const novedadesAPI = {
  // Create novedad from DTO
  async createFromDTO(novedadData: NovedadesCreateDTO): Promise<NovedadesResponse> {
    try {
      // Crear FormData para enviar archivos (necesario para MultipartFile)
      const formData = new FormData();
      
      // Agregar campos de texto
      formData.append('noveTitulo', novedadData.noveTitulo);
      formData.append('noveDescripcion', novedadData.noveDescripcion);
      
      // Convertir fechas a LocalDate formato: yyyy-MM-dd (solo fecha, sin hora)
      formData.append('noveFechaInicio', createLocalDate(novedadData.noveFechaInicio));
      formData.append('noveFechaFin', createLocalDate(novedadData.noveFechaFin));
      
      // Convertir horas a LocalTime formato: HH:mm (solo hora, sin fecha) si están presentes
      if (novedadData.noveHoraInicio) {
        formData.append('noveHoraInicio', createLocalTime(novedadData.noveHoraInicio));
      }
      if (novedadData.noveHoraFin) {
        formData.append('noveHoraFin', createLocalTime(novedadData.noveHoraFin));
      }
      
      // Agregar imagen (MultipartFile)
      formData.append('noveImagen', novedadData.noveImagen);
      
      // Agregar estado activo
      formData.append('noveIsActive', novedadData.noveIsActive.toString());

      const response = await fetch(`${API_BASE_URL}/novedades/create-from-dto`, {
        method: 'POST',
        body: formData, // FormData will set the correct Content-Type header (multipart/form-data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensaje || errorData.message || `Error HTTP: ${response.status}`);
      }

      const result: NovedadesResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating novedad:', error);
      throw error;
    }
  },

  // Get novedades activas
  async getActivas(): Promise<NovedadesListResponse[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/novedades/activas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: NovedadesListResponse[] = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching novedades activas:', error);
      throw error;
    }
  },

  // Get novedades inactivas
  async getInactivas(): Promise<NovedadesListResponse[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/novedades/inactivas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: NovedadesListResponse[] = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching novedades inactivas:', error);
      throw error;
    }
  },

  // Get novedades borrador
  async getBorrador(): Promise<NovedadesListResponse[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/novedades/borrador`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result: NovedadesListResponse[] = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching novedades borrador:', error);
      throw error;
    }
  },

  // Get novedad by ID
  async findById(id: number): Promise<NovedadesResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/novedades/find-by-id/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensaje || errorData.message || `Error HTTP: ${response.status}`);
      }

      const result: NovedadesResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error getting novedad by ID:', error);
      throw error;
    }
  },

  // Update novedad from DTO (imagen es opcional en update)
  async updateFromDTO(id: number, novedadData: Omit<NovedadesCreateDTO, 'noveImagen'> & { noveImagen?: File }): Promise<NovedadesResponse> {
    try {
      // Crear FormData para enviar archivos (necesario para MultipartFile)
      const formData = new FormData();
      
      // Agregar campos de texto
      formData.append('noveTitulo', novedadData.noveTitulo);
      formData.append('noveDescripcion', novedadData.noveDescripcion);
      
      // Convertir fechas a Timestamp formato: yyyy-MM-dd HH:mm:ss
      // Las fechas se envían con hora 00:00:00
      formData.append('noveFechaInicio', createTimestamp(novedadData.noveFechaInicio));
      formData.append('noveFechaFin', createTimestamp(novedadData.noveFechaFin));
      
      // Convertir horas a Timestamp si están presentes (combinando fecha + hora)
      // Formato: yyyy-MM-dd HH:mm:ss
      if (novedadData.noveHoraInicio) {
        formData.append('noveHoraInicio', createTimestamp(novedadData.noveFechaInicio, novedadData.noveHoraInicio));
      }
      if (novedadData.noveHoraFin) {
        formData.append('noveHoraFin', createTimestamp(novedadData.noveFechaFin, novedadData.noveHoraFin));
      }
      
      // Agregar imagen solo si hay una nueva (MultipartFile) - opcional en update
      if (novedadData.noveImagen) {
        formData.append('noveImagen', novedadData.noveImagen);
      }
      
      // Agregar estado - priorizar noveEstado si está presente, sino usar noveIsActive
      if (novedadData.noveEstado) {
        formData.append('noveEstado', novedadData.noveEstado);
      } else {
        formData.append('noveIsActive', novedadData.noveIsActive.toString());
      }

      const response = await fetch(`${API_BASE_URL}/novedades/update-from-dto/${id}`, {
        method: 'PUT',
        body: formData, // FormData will set the correct Content-Type header (multipart/form-data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensaje || errorData.message || `Error HTTP: ${response.status}`);
      }

      const result: NovedadesResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating novedad:', error);
      throw error;
    }
  },

  // Delete novedad
  async delete(id: number): Promise<{ success: boolean, response?: NovedadesResponse, message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/novedades/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log('📡 Respuesta del servidor - Status:', response.status);
      const data: NovedadesResponse = await response.json();
      console.log('📡 Respuesta del servidor - Data:', data);

      if (!response.ok) {
        throw new Error(data.mensaje || `Error HTTP: ${response.status}`);
      }

      return { success: true, response: data };
    } catch (error) {
      console.error('Error deleting novedad:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al eliminar la novedad';
      return { success: false, message: errorMessage };
    }
  }
};

// Helper function to convert date to LocalDate format: yyyy-MM-dd
const createLocalDate = (date: Date): string => {
  const isoString = date.toISOString()
  return isoString.split('T')[0]
}

// Helper function to convert time to LocalTime format: HH:mm
const createLocalTime = (time: string): string => {
  if (time.length === 8) {
    return time.substring(0, 5) // Toma solo HH:mm
  }
  return time
}

// Sponsors Types
export interface SponsorCreateDTO {
  sponNombre: string;
  sponDescripcion: string;
  sponLink: string;
  sponFechaInicio: Date; // Date object that will be converted to LocalDate format
  sponFechaFin: Date; // Date object that will be converted to LocalDate format
  sponHoraInicio?: string; // Format: HH:mm - will be converted to LocalTime format
  sponHoraFin?: string; // Format: HH:mm - will be converted to LocalTime format
  sponImagen: File;
}

export interface SponsorResponse {
  sponId?: number;
  sponNombre?: string;
  sponDescripcion?: string;
  sponLink?: string;
  sponFechaInicio?: string;
  sponFechaFin?: string;
  sponHoraInicio?: string;
  sponHoraFin?: string;
  sponImagen?: string;
  mensaje?: string;
  success?: boolean;
}

export interface SponsorListDTO {
  sponId: number;
  sponNombre: string;
}

export interface SponsorUpdateDTO {
  sponId: number;
  sponNombre: string;
  sponDescripcion: string;
  sponLink: string;
  sponFechaInicio: Date; // Date object that will be converted to LocalDate format
  sponFechaFin: Date; // Date object that will be converted to LocalDate format
  sponHoraInicio?: string; // Format: HH:mm - will be converted to LocalTime format
  sponHoraFin?: string; // Format: HH:mm - will be converted to LocalTime format
  sponImagen: string; // String (URL o path de la imagen, no File)
}

// Sponsors API functions
export const sponsorsAPI = {
  // Get all sponsors (solo retorna sponId y sponNombre)
  async getAll(): Promise<SponsorListDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/sponsor/find-all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensaje || errorData.message || `Error HTTP: ${response.status}`);
      }

      const result: SponsorListDTO[] = await response.json();
      return result;
    } catch (error) {
      console.error('Error getting sponsors:', error);
      throw error;
    }
  },

  // Get sponsor by ID (retorna todos los datos del sponsor)
  async getById(id: number): Promise<SponsorResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/sponsor/find-by-id/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensaje || errorData.message || `Error HTTP: ${response.status}`);
      }

      const result: SponsorResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error getting sponsor by ID:', error);
      throw error;
    }
  },

  // Create sponsor from DTO
  async createFromDTO(sponsorData: SponsorCreateDTO): Promise<SponsorResponse> {
    try {
      // Crear FormData para enviar archivos (necesario para MultipartFile)
      const formData = new FormData();
      
      // Agregar campos de texto
      formData.append('sponNombre', sponsorData.sponNombre);
      formData.append('sponDescripcion', sponsorData.sponDescripcion);
      formData.append('sponLink', sponsorData.sponLink);
      
      // Convertir fechas a LocalDate formato: yyyy-MM-dd
      formData.append('sponFechaInicio', createLocalDate(sponsorData.sponFechaInicio));
      formData.append('sponFechaFin', createLocalDate(sponsorData.sponFechaFin));
      
      // Convertir horas a LocalTime formato: HH:mm si están presentes
      if (sponsorData.sponHoraInicio) {
        formData.append('sponHoraInicio', createLocalTime(sponsorData.sponHoraInicio));
      }
      if (sponsorData.sponHoraFin) {
        formData.append('sponHoraFin', createLocalTime(sponsorData.sponHoraFin));
      }
      
      // Agregar imagen (MultipartFile)
      formData.append('sponImagen', sponsorData.sponImagen);

      const response = await fetch(`${API_BASE_URL}/sponsor/create`, {
        method: 'POST',
        body: formData, // FormData will set the correct Content-Type header (multipart/form-data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensaje || errorData.message || `Error HTTP: ${response.status}`);
      }

      const result: SponsorResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating sponsor:', error);
      throw error;
    }
  },

  // Update sponsor from DTO
  async update(sponsorData: SponsorUpdateDTO): Promise<SponsorResponse> {
    try {
      // Crear objeto JSON para enviar (no FormData, es @RequestBody)
      const requestBody = {
        sponId: sponsorData.sponId,
        sponNombre: sponsorData.sponNombre,
        sponDescripcion: sponsorData.sponDescripcion,
        sponLink: sponsorData.sponLink,
        sponFechaInicio: createLocalDate(sponsorData.sponFechaInicio), // Convertir a yyyy-MM-dd
        sponFechaFin: createLocalDate(sponsorData.sponFechaFin), // Convertir a yyyy-MM-dd
        sponHoraInicio: sponsorData.sponHoraInicio ? createLocalTime(sponsorData.sponHoraInicio) : null, // Convertir a HH:mm
        sponHoraFin: sponsorData.sponHoraFin ? createLocalTime(sponsorData.sponHoraFin) : null, // Convertir a HH:mm
        sponImagen: sponsorData.sponImagen // String (URL o path)
      };

      const response = await fetch(`${API_BASE_URL}/sponsor/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensaje || errorData.message || `Error HTTP: ${response.status}`);
      }

      const result: SponsorResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating sponsor:', error);
      throw error;
    }
  },
};

