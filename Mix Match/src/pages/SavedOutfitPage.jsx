// src/pages/SavedOutfitPage.jsx
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../constants/colors';
import Header from '../components/Header';
import OutfitsGrid from '../components/OutfitGrid';
import CreateOutfitModal from '../components/CreateOutfitModal';

export default function SavedOutfitPage({ outfits = [], items = [] }) {
  const navigate = useNavigate();

  // Modal + form state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    selectedItemIds: [], // array of item ids
  });

  // Local outfits created client-side (so they appear instantly)
  const [localOutfits, setLocalOutfits] = useState([]);

  const handleDelete = (id) => {
    setLocalOutfits((prev) => prev.filter((o) => o.id !== id));
  };

  const openOutfit = (outfit) => {
    console.log('Open outfit', outfit);
  };

  // Merge local + server outfits and sort newest first
  const combined = [...localOutfits, ...outfits].sort((a, b) => {
    const aTime = a?.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b?.created_at ? new Date(b.created_at).getTime() : 0;
    return bTime - aTime;
  });

  // Create outfit: build images (pieces) from selected items
  const handleCreateOutfit = () => {
    if (!formData.name.trim()) {
      alert('Please enter an outfit name.');
      return;
    }
    if (!formData.selectedItemIds?.length) {
      alert('Add at least one item.');
      return;
    }

    const picked = new Set(formData.selectedItemIds.map(Number));
    const pieceImages = items
      .filter((it) => picked.has(Number(it.id)))
      .map((it) => it.image)
      .filter(Boolean);

    const newOutfit = {
      id: crypto.randomUUID?.() ?? Date.now(),
      name: formData.name.trim(),        // use typed name only
      pieces: pieceImages,               // thumbnails for the grid
      created_at: new Date().toISOString(),
    };

    setLocalOutfits((prev) => [newOutfit, ...prev]);

    // reset + close
    setFormData({ name: '', selectedItemIds: [] });
    setShowCreateModal(false);
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
          <OutfitsGrid outfits={combined} onDelete={handleDelete} onOpen={openOutfit} />
        )}
      </main>

      <CreateOutfitModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreateOutfit}
        items={items} // for searching by name in the modal (if you switched to in-modal fetch, remove this)
      />
    </div>
  );
}
