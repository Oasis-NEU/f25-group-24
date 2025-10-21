import { X, MessageCircle, Trash2, User, MapPin, Star, ShoppingCart } from 'lucide-react';
import { colors } from '../constants/colors';

function ListingDetailModal({ listing, onClose, onDelete, onAddToCart }) {
  if (!listing) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={listing.image}
            alt={listing.brand}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                {listing.brand}
              </h2>
              <div className="flex items-center gap-4 text-sm" style={{ color: colors.lightText }}>
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>{listing.seller_name}</span>
                </div>
                <div className="flex items-center gap-1" style={{ color: colors.accent }}>
                  <Star size={16} fill="currentColor" />
                  <span>{listing.seller_rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{listing.color}</span>
                </div>
              </div>
            </div>
            <span className="text-3xl font-bold" style={{ color: colors.primary }}>
              {listing.frequency_of_wear}
            </span>
          </div>

          <p className="mb-6" style={{ color: colors.lightText }}>
            {listing.size}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                onAddToCart(listing);
                onClose();
              }}
              className="flex-1 px-4 py-3 rounded text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.accent }}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button
              className="flex-1 px-4 py-3 rounded text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: colors.primary }}
            >
              <MessageCircle size={20} />
              Contact Seller
            </button>
            <button
              onClick={() => onDelete(listing.id)}
              className="px-4 py-3 border border-red-300 text-red-600 rounded flex items-center gap-2"
            >
              <Trash2 size={20} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetailModal;