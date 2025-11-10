import { Trash2 } from 'lucide-react';
import { colors } from '../constants/colors';

function ItemCard({ item, onClick, onDelete }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={item.image || "https://media.istockphoto.com/id/1842732901/vector/loading-icon.jpg?s=612x612&w=0&k=20&c=L_SMRRBQieZHtnrySZmDuy25_rWvEea_UeTnJqD08XE="}
        alt={item.brand || "Unknown brand"}
        className="w-full h-48 object-cover rounded mb-3"
        onError={(e) => {
          e.currentTarget.src = "https://media.istockphoto.com/id/1842732901/vector/loading-icon.jpg?s=612x612&w=0&k=20&c=L_SMRRBQieZHtnrySZmDuy25_rWvEea_UeTnJqD08XE=";
        }}
      />
      
      <h3 className="text-lg font-bold" style={{ color: colors.text }}>
        {item.name}
      </h3>
      
      
      <div className="flex gap-3">
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
          {item.brand}
        </span>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
          {item.size}
        </span>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
          {item.category}
        </span>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
          {item.color}
        </span>
      </div>
      <div className="flex justify-between items-center mt-3 text-sm">
        <p className="text-sm text-left" style={{ color: colors.text }}>
          Frequency of Wear: {item.frequency_of_wear}
        </p>
        {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="text-red-500 hover:text-red-700 p-1"
                title="Delete item"
              >
                <Trash2 size={14} />
              </button>
            )}
      </div>
    </div>
  );
}


export default ItemCard;