import { X } from 'lucide-react';
import { colors } from '../constants/colors';
import { categories } from '../constants/categories';

function CreateListingModal({ show, onClose, formData, setFormData, onSubmit }) {
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
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
          <div>
            <label className="block mb-1">Brand</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Frequency of Wear</label>
              <input
                type="number"
                value={formData.frequency_of_wear}
                onChange={(e) => handleChange('frequency_of_wear', e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                {categories.filter(cat => cat.value !== "all").map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1">Size</label>
            <input
              type = "text"
              value={formData.size}
              onChange={(e) => handleChange('size', e.target.value)}
              className="w-full px-3 py-2 border rounded"
              /*rows={3} */
            />
          </div>

          <div>
            <label className="block mb-1">Color</label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex gap-3">
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

export default CreateListingModal;