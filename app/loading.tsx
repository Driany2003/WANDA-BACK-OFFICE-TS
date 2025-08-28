export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        {/* Spinner */}
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#DB086E] mb-4"></div>
        
        {/* Texto de carga */}
        <p className="text-gray-600 text-lg font-medium">
          Cargando...
        </p>
        
        {/* Puntos animados */}
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-2 h-2 bg-[#DB086E] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#DB086E] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[#DB086E] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
