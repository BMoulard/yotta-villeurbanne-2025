export function Legend() {
  return (
    <div className="mt-8 flex justify-center space-x-6">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
        <span className="text-sm text-gray-600">Natation</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
        <span className="text-sm text-gray-600">Transition</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
        <span className="text-sm text-gray-600">Course à pied</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
        <span className="text-sm text-gray-600">Récupération</span>
      </div>
    </div>
  );
}