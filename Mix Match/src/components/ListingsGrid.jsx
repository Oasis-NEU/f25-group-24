import { Package } from 'lucide-react';
import { colors } from '../constants/colors';
import ListingCard from './ListingCard';

function ListingsGrid({ listings, onListingClick, onDeleteListing }) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <Package size={48} className="mx-auto mb-4" style={{ color: colors.text }} />
        <p className="text-xl font-medium" style={{ color: colors.text }}>
          No items found
        </p>
        <p style={{ color: colors.text }}>
          Try a different search or category
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map(listing => (
        <ListingCard
          key={listing.id}
          listing={listing}
          onClick={() => onListingClick(listing)}
          onDelete={onDeleteListing}
        />
      ))}
    </div>
  );
}

export default ListingsGrid;