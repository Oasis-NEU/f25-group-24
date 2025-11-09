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
          
          <div>
            <label className="block mb-1 text-left">Brand</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <label className="block mb-1">Frequency of Wear</label>
              <input
                type="number"
                min="0"
                value={formData.frequency_of_wear}
                onChange={(e) => handleChange('frequency_of_wear', e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-left">Category</label>
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
            <label className="block mb-1 text-left">Size</label>
            <input
              type="text"
              value={formData.size}
              onChange={(e) => handleChange('size', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-left">Color</label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-left">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="https://media.istockphoto.com/id/1842732901/vector/loading-icon.jpg?s=612x612&w=0&k=20&c=L_SMRRBQieZHtnrySZmDuy25_rWvEea_UeTnJqD08XE="
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded border"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
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
