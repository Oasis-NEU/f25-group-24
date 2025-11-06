// src/components/OutfitCard.jsx
import { User, Star, Trash2 } from "lucide-react";

function pieceToSrc(piece) {
  // supports either raw URL strings or item objects with `.image`
  if (!piece) return null;
  return typeof piece === "string" ? piece : piece.image || null;
}

export default function OutfitCard({ outfit, onDelete, onClick }) {
  const imgs = (outfit.pieces ?? []).slice(0, 2).map(pieceToSrc).filter(Boolean);

  // show a short id if it's a UUID; otherwise the id as-is
  const idLabel =
    typeof outfit.id === "string" && outfit.id.includes("-")
      ? outfit.id.slice(0, 8)
      : outfit.id;

  return (
    <div
      className="bg-white rounded-2xl shadow-md border hover:shadow-lg transition cursor-pointer"
      onClick={() => onClick?.(outfit)}
    >
      {/* Image strip (two images) */}
      <div className="p-4">
        <div className="w-full h-40 bg-gray-100 rounded-xl overflow-hidden">
          <div className="w-full h-full flex items-center justify-center gap-3 p-3">
            {imgs.length ? (
              imgs.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`piece-${i}`}
                  className="h-full object-contain"
                />
              ))
            ) : (
              <div className="text-gray-400">No images</div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 pb-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">
            Outfit #{idLabel} {outfit.name ? `– ${outfit.name}` : ""}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Star size={16} /> {outfit.rating ?? "—"}
          </div>
        </div>

        {/* owner only (no tags) */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User size={16} />
            {outfit.owner ?? "You"}
          </div>

          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(outfit.id);
              }}
              className="text-rose-500 hover:text-rose-600"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
