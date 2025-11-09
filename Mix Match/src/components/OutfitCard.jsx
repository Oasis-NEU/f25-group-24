// src/components/OutfitCard.jsx
import { Trash2 } from "lucide-react";
import { colors } from "../constants/colors";

function pieceToSrc(piece) {
  if (!piece) return null;
  return typeof piece === "string" ? piece : piece.image || null;
}

export default function OutfitCard({ outfit, onDelete, onClick }) {
  const imgs = (outfit.pieces ?? []).map(pieceToSrc).filter(Boolean);

  return (
    <div
      onClick={() => onClick?.(outfit)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
    >
      <div className="p-4">
        {imgs.length > 0 ? (
          <div
            className={`grid gap-2 ${
              imgs.length === 1
                ? "grid-cols-1"
                : imgs.length === 2
                ? "grid-cols-2"
                : "grid-cols-3"
            }`}
          >
            {imgs.map((src, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl bg-gray-100"
              >
                <img
                  src={src}
                  alt={`piece-${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-gray-400 bg-gray-100 rounded-xl">
            No images
          </div>
        )}
      </div>

      {/* --- Title + Delete Button --- */}
      <div className="px-6 pb-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold" style={{ color: colors.text }}>
            {outfit.name || "Untitled Outfit"}
          </h3>

          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(outfit.id);
              }}
              className="text-red-500 hover:text-red-700 p-1"
              title="Delete outfit"
              aria-label="Delete outfit"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
