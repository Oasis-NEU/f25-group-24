import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../constants/colors';
import Header from '../components/Header';
import OutfitGrid from '../components/OutfitGrid';

export default function SavedOutfitPage({ outfits = [] }) {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    console.log("Delete outfit", id);
  };

  const openOutfit = (outfit) => {
    console.log("Open outfit", outfit);
  };

  const sorted = [...outfits].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <Header onPostClick={() => navigate('/')} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate('/')}
            className="bg-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
            style={{ color: colors.banner }}
          >
            <Plus size={20} />
            Add Outfit
          </button>
        </div>

        {sorted.length === 0 ? (
          <div className="bg-white rounded-xl p-6 border">
            No outfits yet — create one from your closet!
          </div>
        ) : (
          <OutfitGrid
            outfits={sorted}
            onDelete={handleDelete}
            onOpen={openOutfit}
          />
        )}
      </main>
    </div>
  );
}
