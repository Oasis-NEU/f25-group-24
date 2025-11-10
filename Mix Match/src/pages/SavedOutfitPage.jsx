import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../constants/colors';
import Header from '../components/Header';
import OutfitsGrid from '../components/OutfitGrid';
import CreateOutfitModal from '../components/CreateOutfitModal';

export default function SavedOutfitPage({ outfits = [], items = [], onCreateOutfit, onDeleteOutfit }) {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [formData, setFormData] = useState({ name: '', selectedItemIds: [] });

  const combined = [...outfits].sort((a, b) => {
    const at = a?.created_at ? +new Date(a.created_at) : 0;
    const bt = b?.created_at ? +new Date(b.created_at) : 0;
    return bt - at;
  });

  const handleSubmit = async () => {
    if (!formData.name.trim()) return alert('Please enter an outfit name.');
    if (!formData.selectedItemIds.length) return alert('Add at least one item.');
    await onCreateOutfit?.(formData);
    setFormData({ name: '', selectedItemIds: [] });
    setShowCreateModal(false);
  };

  const handleDeleteOutfit = (id) => {
    if (confirm("Are you sure you want to delete this outfit?")) {
      onDeleteOutfit(id);
      setSelectedOutfit(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <Header onPostClick={() => navigate('/')} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
            style={{ color: colors.banner }}
          >
            <Plus size={20} />
            Add Outfit
          </button>
        </div>

        {combined.length === 0 ? (
          <div className="bg-white rounded-xl p-6 border">No outfits yet — create one!</div>
        ) : (
          <OutfitsGrid
            outfits={combined}
            onDelete={handleDeleteOutfit} />
        )}
      </main>

      <CreateOutfitModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        items={items}
      />
    </div>
  );
}
