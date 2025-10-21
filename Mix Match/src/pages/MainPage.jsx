import React, { useState } from 'react';
import { colors } from '../constants/colors';
import Header from '../components/Header';
import ListingsGrid from '../components/ListingsGrid';
import CreateListingModal from '../components/CreateListingModal';
import ListingDetailModal from '../components/ListingDetailModal';

function MainPage({ 
  listings, 
  onCreateListing, 
  onDeleteListing,
  onAddToCart,
  cartItemCount,
  onNavigateToCart 
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    frequency_of_wear: "",
    category: "",
    size: "",
    color: ""
  });


  const handleCreateListing = () => {
    if (!formData.brand || !formData.frequency_of_wear) {
      alert("Please fill in brand and frequency of wear");
      return;
    }
    
    onCreateListing(formData);
    setFormData({
      brand: "",
      frequency_of_wear: "",
      category: "",
      size: "",
      color: ""
    });
    setShowCreateModal(false);
  };

  const handleDeleteListing = (id) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      onDeleteListing(id);
      setSelectedListing(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <Header
        onPostClick={() => setShowCreateModal(true)}
        cartItemCount={cartItemCount}
        onCartClick={onNavigateToCart}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <ListingsGrid
          listings={listings}
          onListingClick={setSelectedListing}
          onDeleteListing={handleDeleteListing}
        />
      </main>

      <CreateListingModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreateListing}
      />

      <ListingDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        onDelete={handleDeleteListing}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

export default MainPage;