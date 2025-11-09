// src/pages/SavedOutfitPage.jsx
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../constants/colors';
import Header from '../components/Header';
import OutfitsGrid from '../components/OutfitGrid';
import CreateOutfitModal from '../components/CreateOutfitModal'; // ✅ aligned name

export default function SavedOutfitPage({ outfits = [] }) {
  const navigate = useNavigate();

  // use the SAME modal state + fields
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: ''
  });

  // keep locally created outfits so you see them immediately
  const [localOutfits, setLocalOutfits] = useState([]);

  const handleDelete = (id) => {
    setLocalOutfits(prev => prev.filter(o => o.id !== id));
  };

  const openOutfit = (outfit) => {
    console.log('Open outfit', outfit);
  };

  // merge local + server outfits
  const combined = [...localOutfits, ...outfits].sort((a, b) => {
    const aTime = a?.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b?.created_at ? new Date(b.created_at).getTime() : 0;
    return bTime - aTime;
  });

  // turn the modal form into an outfit
  const handleCreateOutfitFromItemForm = () => {
    if (!formData.name || !formData.image) {
      alert('Please provide an outfit name and an image URL.');
      return;
    }

    const newOutfit = {
      id: crypto.randomUUID?.() ?? Date.now(),
      name: formData.name,
      pieces: [formData.image].filter(Boolean), // show the image as outfit preview
      created_at: new Date().toISOString(),
    };

    setLocalOutfits(prev => [newOutfit, ...prev]);

    // reset + close
    setFormData({ name: '', image: '' });
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
          <div className="bg-white rounded-xl p-6 border">
            No outfits yet — create one!
          </div>
        ) : (
          <OutfitsGrid outfits={combined} onDelete={handleDelete} onOpen={openOutfit} />
        )}
      </main>

      {/* ✅ Use CreateOutfitModal with matching props */}
      <CreateOutfitModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreateOutfitFromItemForm}
      />
    </div>
  );
}
