import { User, Star, Trash2 } from 'lucide-react';
import { colors } from '../constants/colors';

function ListingCard({ listing, onClick, onDelete }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={listing.image}
        alt={listing.brand}
        className="w-full h-48 object-cover rounded mb-3"
      />
      
      <h3 className="text-lg font-bold" style={{ color: colors.text }}>
        {listing.brand}
      </h3>
      
      <p className="text-xl font-bold" style={{ color: colors.banner }}>
        {listing.frequency_of_wear}
      </p>
      
      <p className="text-sm text-gray-600 mb-2">
        {listing.size}
      </p>
      
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-1" style={{ color: colors.text }}>
          <User size={14} />
          <span>{listing.seller_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1" style={{ color: colors.banner }}>
            <Star size={14} fill="currentColor" />
            <span>{listing.seller_rating}</span>
          </div>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(listing.id);
              }}
              className="text-red-500 hover:text-red-700 p-1"
              title="Delete listing"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingCard;