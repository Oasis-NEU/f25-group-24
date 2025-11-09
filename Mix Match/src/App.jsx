import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { supabase } from './supabaseClient';

import MainPage from './pages/MainPage';
import SavedOutfitPage from './pages/SavedOutfitPage';

function AppInner() {
  const [items, setItems] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTrigger, setAddTrigger] = useState(0);

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    try {
      const { data: itemsData, error: itemsError } = await supabase
        .from('item')
        .select('*')
        .order('created_at', { ascending: false });
      if (itemsError) throw itemsError;
      setItems(itemsData || []);

      const { data: outfitsData, error: outfitsError } = await supabase
        .from('outfits')
        .select('*')
        .order('outfit_id', { ascending: false });
      if (outfitsError) throw outfitsError;

      const itemMap = Object.fromEntries((itemsData || []).map(i => [i.id, i]));

      const formattedOutfits = (outfitsData || []).map(o => {
        let itemIds;
        try {
          itemIds = Array.isArray(o.items) ? o.items : JSON.parse(o.items || '[]');
        } catch {
          itemIds = [];
        }

        return {
          id: o.id,
          name: o.outfit_type || `Outfit #${o.id}`,
          pieces: itemIds.map(id => itemMap[Number(id)]?.image).filter(Boolean),
          created_at: o.created_at,
        };
      });

      setOutfits(formattedOutfits);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(`Error fetching data: ${error.message}`);
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
          frequency_of_wear: Number(formData.frequency_of_wear)
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
                addTrigger={addTrigger}
              />
            }
          />
          <Route
            path="/saved-outfits"
            element={<SavedOutfitPage outfits={outfits} />}
          />
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
