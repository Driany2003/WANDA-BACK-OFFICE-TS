# 🏗️ Arquitectura del Sistema WANDA Backoffice

## 📋 Descripción General

Sistema de administración web construido con **Next.js (Frontend)** y **Spring Boot (Backend)**, diseñado para gestionar usuarios administradores, concursos, suscriptores y transacciones.

## 🌐 Arquitectura General

```
Frontend (Next.js) ←→ Backend (Spring Boot) ←→ Base de Datos (MySQL)
     ↓                        ↓                        ↓
  Puerto 3001            Puerto 8080              Puerto 3306
  localhost:3001         localhost:8080           localhost:3306
```

## 🔄 Flujo de Comunicación Frontend ↔ Backend

### **1. Registro de Administrador**

```
Frontend (Modal) → API Call → Backend (Controller) → Base de Datos
```

#### **Frontend (Modal de Agregar Usuario):**
```tsx
// components/modals/administracion/agregar-usuario-modal.tsx
const handleSubmit = async (e: React.FormEvent) => {
  const userData = {
    nombre: formData.nombre,
    apellido: formData.apellido,
    correo: formData.correo,
    authUsername: formData.authUsername,
    authPassword: formData.authPassword,
    validarAuthPassword: formData.validarAuthPassword,
    authRol: formData.authRol,
    isActive: formData.isActive
  }

  // Llamada al backend
  const response = await usuarioApi.create(userData)
}
```

#### **API Function (Frontend):**
```typescript
// lib/api.ts
export const usuarioApi = {
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
    
    const response = await fetch(`${API_BASE_URL}/usuario/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  }
}
```

#### **Backend (Spring Boot Controller):**
```java
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    
    @PostMapping("/create")
    public ResponseEntity<UsuarioResponseDTO> createUsuario(
        @RequestBody @Valid UsuarioCreateDTO usuarioData) {
        
        // Validar datos
        if (!usuarioData.getAuthPassword().equals(usuarioData.getValidarAuthPassword())) {
            return ResponseEntity.badRequest()
                .body(new UsuarioResponseDTO("Las contraseñas no coinciden", false));
        }
        
        // Crear usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(usuarioData.getNombre());
        usuario.setApellido(usuarioData.getApellido());
        usuario.setCorreo(usuarioData.getCorreo());
        usuario.setAuthUsername(usuarioData.getAuthUsername());
        usuario.setAuthPassword(passwordEncoder.encode(usuarioData.getAuthPassword()));
        usuario.setAuthRol(usuarioData.getAuthRol());
        usuario.setIsActive(usuarioData.getIsActive());
        
        // Guardar en base de datos
        Usuario savedUsuario = usuarioRepository.save(usuario);
        
        return ResponseEntity.ok(new UsuarioResponseDTO(
            "Usuario creado exitosamente", true, savedUsuario.getId()));
    }
}
```

## 🗄️ Estructura de Base de Datos

### **Tabla de Usuarios Administradores:**
```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    auth_username VARCHAR(100) UNIQUE NOT NULL,
    auth_password VARCHAR(255) NOT NULL,
    auth_rol VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    fecha_registrado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔧 Configuración del Sistema

### **Frontend (Next.js)**

#### **Variables de Entorno:**
```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

#### **Configuración de API:**
```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
```

### **Backend (Spring Boot)**

#### **application.yml:**
```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/wanda_db
    username: root
    password: tu_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect

# CORS Configuration
cors:
  allowed-origins: http://localhost:3001
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: "*"
  allow-credentials: true
```

#### **CORS Configuration:**
```java
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3001");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}
```

## 📁 Estructura del Proyecto

### **Frontend (Next.js):**
```
WANDA-BACKOFFICE/
├── app/
│   ├── (app)/
│   │   ├── administracion/
│   │   │   └── page.tsx          # Página principal de administración
│   │   ├── configuraciones/
│   │   ├── dashboard/
│   │   └── transacciones/
│   └── login/
│       └── page.tsx              # Página de login
├── components/
│   ├── administracion/
│   │   └── usuarios.tsx          # Lista de usuarios
│   ├── modals/
│   │   └── administracion/
│   │       ├── agregar-usuario-modal.tsx
│   │       ├── editar-usuario-modal.tsx
│   │       └── eliminar-usuario-modal.tsx
│   └── shared/
│       └── image-upload.tsx      # Componente de upload de imágenes
├── lib/
│   └── api.ts                    # Funciones de API
├── hooks/
│   └── use-image-upload.ts       # Hook personalizado
└── types/
    └── index.ts                  # Tipos TypeScript
```

### **Backend (Spring Boot):**
```
src/main/java/com/wanda/
├── controller/
│   ├── UsuarioController.java
│   ├── ConcursoController.java
│   └── ImageController.java
├── service/
│   ├── UsuarioService.java
│   ├── ConcursoService.java
│   └── ImageService.java
├── repository/
│   ├── UsuarioRepository.java
│   └── ConcursoRepository.java
├── dto/
│   ├── UsuarioCreateDTO.java
│   ├── UsuarioResponseDTO.java
│   └── ConcursoCreateDTO.java
├── entity/
│   ├── Usuario.java
│   └── Concurso.java
└── config/
    ├── CorsConfig.java
    └── WebConfig.java
```

## 🔄 Flujos de Funcionamiento

### **1. Registro de Administrador**

```
1. Usuario abre modal "Agregar Usuario"
2. Llena formulario con datos del administrador
3. Frontend valida datos (contraseñas coinciden, email válido)
4. Frontend envía POST /api/usuario/create
5. Backend valida datos con Bean Validation
6. Backend encripta contraseña
7. Backend guarda en base de datos
8. Backend retorna respuesta de éxito/error
9. Frontend muestra mensaje al usuario
10. Frontend actualiza lista de usuarios
```

### **2. Listado de Usuarios**

```
1. Usuario accede a página de administración
2. Frontend carga lista con GET /api/usuario/find-all
3. Backend consulta base de datos
4. Backend retorna lista de usuarios
5. Frontend renderiza tabla con usuarios
```

### **3. Edición de Usuario**

```
1. Usuario hace clic en "Editar"
2. Frontend abre modal con datos del usuario
3. Usuario modifica datos
4. Frontend envía PUT /api/usuario/update
5. Backend actualiza en base de datos
6. Frontend actualiza lista
```

## 🌐 Endpoints del Backend

### **Usuarios:**
```
GET    /api/usuario/find-all          # Listar todos los usuarios
POST   /api/usuario/create            # Crear usuario
PUT    /api/usuario/update            # Actualizar usuario
DELETE /api/usuario/delete/{id}       # Eliminar usuario
POST   /api/usuario/{id}/reset-password # Resetear contraseña
```

### **Concursos:**
```
GET    /api/concurso/find-all         # Listar concursos
POST   /api/concurso/create           # Crear concurso
PUT    /api/concurso/update           # Actualizar concurso
DELETE /api/concurso/delete/{id}      # Eliminar concurso
POST   /api/concurso/upload-image     # Subir imagen
```

### **Imágenes:**
```
GET    /api/images/concursos/{filename} # Servir imágenes
```

## 🔐 Autenticación y Seguridad

### **Frontend:**
- Validación de formularios en tiempo real
- Sanitización de inputs
- Manejo de errores de API
- Estados de carga

### **Backend:**
- Encriptación de contraseñas (BCrypt)
- Validación con Bean Validation
- CORS configurado
- Manejo de excepciones
- Logging de operaciones

## 🚀 Cómo Ejecutar el Sistema

### **1. Backend (Spring Boot):**
```bash
# En la carpeta del backend
./mvnw spring-boot:run
# O
java -jar target/wanda-backend.jar
```

### **2. Frontend (Next.js):**
```bash
# En la carpeta del frontend
npm install
npm run dev
```

### **3. Base de Datos (MySQL):**
```sql
CREATE DATABASE wanda_db;
USE wanda_db;
-- Ejecutar scripts de creación de tablas
```

## 📊 Flujo de Datos Completo

```
Usuario → Frontend → API Call → Backend → Base de Datos
   ↓         ↓          ↓         ↓          ↓
Modal →  HTTP Request → Controller → Service → Repository
   ↓         ↓          ↓         ↓          ↓
Form →  JSON Body → Validation → Business Logic → SQL Query
   ↓         ↓          ↓         ↓          ↓
Submit → Response ← JSON Response ← Entity ← Result Set
```

## ✅ Características del Sistema

### **Frontend:**
- ✅ **React/Next.js** - Framework moderno
- ✅ **TypeScript** - Tipado estático
- ✅ **Tailwind CSS** - Estilos modernos
- ✅ **Componentes reutilizables** - Código limpio
- ✅ **Hooks personalizados** - Lógica reutilizable
- ✅ **Manejo de estado** - React hooks
- ✅ **Validación de formularios** - En tiempo real

### **Backend:**
- ✅ **Spring Boot** - Framework robusto
- ✅ **Spring Data JPA** - ORM automático
- ✅ **Bean Validation** - Validación automática
- ✅ **CORS** - Comunicación cross-origin
- ✅ **Manejo de excepciones** - Errores controlados
- ✅ **Logging** - Monitoreo de operaciones
- ✅ **Seguridad** - Encriptación de contraseñas

### **Base de Datos:**
- ✅ **MySQL** - Base de datos relacional
- ✅ **Índices** - Consultas optimizadas
- ✅ **Constraints** - Integridad de datos
- ✅ **Timestamps** - Auditoría automática

## 🔧 Configuración de Desarrollo

### **Puertos:**
- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:8080
- **Base de Datos**: localhost:3306

### **URLs de API:**
- **Base**: http://localhost:8080/api
- **Usuarios**: http://localhost:8080/api/usuario
- **Concursos**: http://localhost:8080/api/concurso
- **Imágenes**: http://localhost:8080/api/images

## 📝 Notas Importantes

1. **CORS configurado** - Frontend y backend se comunican sin problemas
2. **Validación en dos capas** - Frontend y backend
3. **Manejo de errores** - Respuestas HTTP apropiadas
4. **Seguridad** - Contraseñas encriptadas
5. **Escalabilidad** - Arquitectura preparada para crecer

## 🚀 Próximos Pasos

1. **Implementar autenticación JWT** - Login seguro
2. **Agregar roles y permisos** - Control de acceso
3. **Implementar auditoría** - Log de cambios
4. **Agregar tests** - Cobertura de código
5. **Deploy a producción** - Servidor en la nube

---

**Sistema desarrollado con las mejores prácticas de la industria para aplicaciones web modernas.** 🎯
