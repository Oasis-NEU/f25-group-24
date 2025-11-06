import React, { useState } from 'react';
import { colors } from '../constants/colors';
import ItemsGrid from '../components/ItemsGrid';
import CreateItemModal from '../components/CreateItemModal';
import Header from '../components/Header';

function MainPage({ items, onCreateItem, onDeleteItem}) {
  console.log(items);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    category: "",
    size: "",
    color: "",
    image: "",
    frequency_of_wear: 0
  });


  const handleCreateItem = () => {
    if (!formData.brand || !formData.category
      || !formData.size || !formData.color
      || !formData.image || !formData.frequency_of_wear) {
      alert("Please fill in all boxes");
      return;
    }
    
    onCreateItem(formData);
    setFormData({
      brand: "",
      category: "",
      size: "",
      color: "",
      image: "",
      frequency_of_wear: 0
    });
    setShowCreateModal(false);
  };

  const handleDeleteItem = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      onDeleteItem(id);
      setSelectedItem(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <Header
        onPostClick={() => setShowCreateModal(true)}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <ItemsGrid
          items={items}
          onItemClick={setSelectedItem}
          onDeleteItem={handleDeleteItem}
        />
      </main>

      <CreateItemModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreateItem}
      />
    </div>
  );
}

export default MainPage;