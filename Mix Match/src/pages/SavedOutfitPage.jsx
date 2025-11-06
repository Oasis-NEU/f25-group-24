// src/pages/SavedOutfitsPage.jsx
import { useEffect, useState } from "react";
import { Plus } from 'lucide-react';  
import { useNavigate } from "react-router-dom";
import { colors } from "../constants/colors";
import Header from "../components/Header";
import OutfitsGrid from "../components/OutfitGrid"; // ✅ make sure the file is plural

// demo data (replace with Supabase fetch later)
const demoOutfits = [
  {
    id: "1",
    name: "Black Tank + Light Denim",
    pieces: [
      "https://i.imgur.com/black-top.png",
      "https://images.dsw.com/is/image/DSWShoes/601142_001_ss_01?impolicy=qlt-medium-high&imwidth=450&imdensity=1",
      "https://i.imgur.com/coach-bag.png",
    ],
    rating: 4.5,
    owner: "You",
  },
  {
    id: "2",
    name: "Maroon Tank + Skirt + Boots",
    pieces: [
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrlfBpMeVvSxW4Mm8exYufQo2HRR8BTrJQj2PlL9PBjkUkXd6QEbh_w2-yybJSuVxAUxAVBniqdrTKteXVEcLTZoWS1uNXPG2oDt7xl8RHgUZbJ92EBFGZCi0k-gJqsBmJbkhGV43RnxM&usqp=CAc",
      "https://img.abercrombie.com/is/image/anf/KIC_155-4419-0387-280_model1?policy=product-large",
      "https://images.dsw.com/is/image/DSWShoes/601142_001_ss_01?impolicy=qlt-medium-high&imwidth=450&imdensity=1",
      "https://i.imgur.com/gold-necklace.png",
    ],
    rating: 4.8,
    owner: "You",
  },
];

export default function SavedOutfitsPage() {
  const [outfits, setOutfits] = useState([]);
  const [sortBy, setSortBy] = useState("new");
  const navigate = useNavigate();

  useEffect(() => {
    setOutfits(demoOutfits);
    // Later: replace with Supabase fetch like your MainPage (we already sent that version)
  }, []);

  const handleDelete = (id) => {
    setOutfits((prev) => prev.filter((o) => o.id !== id));
    // Supabase: await supabase.from("outfits").delete().eq("id", id);
  };

  const openOutfit = (outfit) => {
    console.log("Open outfit", outfit);
  };

  const sorted = [...outfits].sort((a, b) =>
    sortBy === "rating" ? (b.rating ?? 0) - (a.rating ?? 0) : Number(b.id) - Number(a.id)
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* same header as MainPage */}
      <Header onPostClick={() => navigate("/")} />

      {/* same container spacing as MainPage */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
            style={{ color: colors.banner }}
          >
            <Plus size={20} />
            Add Item
          </button>
        </div>
        {/*<h2 className="text-3xl font-semibold mb-6">Saved Outfits</h2>*/}

        <div className="flex items-center gap-3 mb-6">
          <button className="px-4 py-2 rounded-xl border bg-white">Filters</button>
          <button
            className="px-4 py-2 rounded-xl border bg-white"
            onClick={() => setSortBy((s) => (s === "new" ? "rating" : "new"))}
            title="Toggle sort by rating/new"
          >
            Sort {sortBy === "rating" ? "↓ Rating" : "↓ New"}
          </button>
        </div>

        {sorted.length === 0 ? (
          <div className="bg-white rounded-xl p-6 border">
            No outfits yet — create one from your closet!
          </div>
        ) : (
          <OutfitsGrid outfits={sorted} onDelete={handleDelete} onOpen={openOutfit} />
        )}
      </main>
    </div>
  );
}
