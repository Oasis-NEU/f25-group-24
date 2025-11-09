import { X } from 'lucide-react';
import { colors } from '../constants/colors';
import { categories } from '../constants/categories';

function CreateItemModal({ show, onClose, formData, setFormData, onSubmit }) {
  if (!show) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
            Post New Item
          </h2>
          <button type="button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 text-left">Item Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 border rounded"
              style={{ backgroundColor: colors.primary }}
            >
              Post Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateItemModal;
