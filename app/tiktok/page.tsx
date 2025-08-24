"use client"

export default function TikTokPage() {
  return (
    <div className="p-[50px] space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#DB086E] to-[#3A05DF] bg-clip-text text-transparent">
          TikTok
        </h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🎵</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Conexión con TikTok</h2>
            <p className="text-gray-600">Conecta tu cuenta de TikTok para sincronizar contenido</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">Estado de Conexión</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">No conectado</span>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
              Conectar TikTok
            </button>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">Funcionalidades Disponibles</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Sincronización de videos
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Estadísticas de engagement
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Programación de contenido
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Análisis de tendencias
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Videos Publicados</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
            <p className="text-gray-600">Videos sincronizados</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Total de Views</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
            <p className="text-gray-600">Visualizaciones</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Seguidores</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
            <p className="text-gray-600">Seguidores</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Importante</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <p>• Para usar las funcionalidades de TikTok, primero debes conectar tu cuenta</p>
          <p>• Solo se sincronizará el contenido público de tu cuenta</p>
          <p>• Puedes desconectar tu cuenta en cualquier momento desde Configuraciones</p>
          <p>• Los datos se actualizan cada 24 horas</p>
        </div>
      </div>
    </div>
  )
}
