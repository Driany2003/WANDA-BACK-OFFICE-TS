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
  }
};

