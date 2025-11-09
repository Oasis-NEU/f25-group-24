import { X, Trash2, User, Star } from 'lucide-react';
import { colors } from '../constants/colors';

function ItemDetailModal({ item, onClose, onDelete }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={item.image}
            alt={item.brand}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                {item.name}
              </h2>
              <div className="flex items-center gap-4 text-sm" style={{ color: colors.text }}>
                <div className="flex items-center gap-1">
                  <span>{item.color}</span>
                </div>
              </div>
            </div>
            <span className="mb-6 tex-left" style={{ color: colors.primary }}>
              {item.frequency_of_wear}
            </span>
          </div>

          <p className="mb-6 text-left" style={{ color: colors.text }}>
            {item.size}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this item?")) {
                  onDelete(item.id);
                  onClose();
                }
              }}
              className="px-4 py-3 border border-red-300 text-red-600 rounded flex items-center gap-2"
            >
              <Trash2 size={20} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailModal;