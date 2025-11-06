// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { supabase } from './supabaseClient';

import Header from './components/Header';              // make sure this is the combined Header with Saved Outfits button
import MainPage from './pages/MainPage';
import SavedOutfitsPage from './pages/SavedOutfitPage';
// import CreateOutfitPage from './pages/CreateOutfitPage'; // if/when you add it

function AppInner() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTrigger, setAddTrigger] = useState(0);     // bump this to signal MainPage to open its add modal (if implemented)
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const { data, error } = await supabase
        .from('item')                                 // your lowercase table
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      alert(`Error fetching items: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateItem = async (formData) => {
    try {
      const { data, error } = await supabase
        .from('item')
        .insert([{
          brand: formData.brand,
          category: formData.category,
          size: formData.size,
          color: formData.color,
          image: formData.image,
          frequency_of_wear: Number(formData.frequency_of_wear),
        }])
        .select();

      if (error) throw error;
      if (data && data.length > 0) {
        setItems(prev => [data[0], ...prev]);
      }
    } catch (error) {
      console.error('Error creating item:', error);
      alert(`Error creating item: ${error.message}`);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const { error } = await supabase
        .from('item')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(`Error deleting item: ${error.message}`);
    }
  };

  // Header actions
  const onPostClick = () => {
    // If MainPage listens for addTrigger changes, this will open its modal.
    setAddTrigger(t => t + 1);
    // Ensure we’re on the main page where the modal exists:
    navigate('/');
  };

  return (
    <>
      {loading ? (
        <div className="p-6">Loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                items={items}
                onCreateItem={handleCreateItem}
                onDeleteItem={handleDeleteItem}
                addTrigger={addTrigger} // optional; MainPage can ignore if not used
              />
            }
          />
          <Route path="/saved-outfits" element={<SavedOutfitsPage />} />
          {/* <Route path="/create-outfit" element={<CreateOutfitPage />} /> */}
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
