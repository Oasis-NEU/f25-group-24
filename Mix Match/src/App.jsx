import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { supabase } from './supabaseClient';

import MainPage from './pages/MainPage';
import SavedOutfitPage from './pages/SavedOutfitPage';

function AppInner() {
  const [items, setItems] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    try {
      const { data: itemsData, error: itemsError } = await supabase
        .from('item')
        .select('id, name, brand, category, color, size, frequency_of_wear, image, created_at')
        .order('frequency_of_wear', { ascending: false });
      if (itemsError) throw itemsError;
      setItems(itemsData || []);

      const { data: outfitsData, error: outfitsError } = await supabase
        .from('outfits')
        .select('outfit_id, outfit_type, items, created_at')
        .order('created_at', { ascending: false });
      if (outfitsError) throw outfitsError;

      const itemMap = Object.fromEntries((itemsData || []).map(i => [Number(i.id), i]));
      const newOutfit = (outfitsData || []).map(o => {
        const ids = o.items ?? [];
        return {
          id: o.outfit_id,
          name: o.outfit_type || `Outfit #${o.outfit_id}`,
          pieces: (ids || []).map(id => itemMap[Number(id)]?.image).filter(Boolean),
          created_at: o.created_at,
        };
      });

      setOutfits(newOutfit);
    } catch (err) {
      console.error('Error fetching data:', err);
      alert(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateItem = async (id) => {
    const { data, error } = await supabase
      .from('item')
      .insert([{
        name: id.name,
        brand: id.brand,
        category: id.category,
        size: id.size,
        color: id.color,
        image: id.image,
        frequency_of_wear: Number(id.frequency_of_wear)
      }])
      .select();
    if (error) { alert(error.message); return; }
    if (data?.[0]) setItems(prev => [data[0], ...prev]);
  };

  const handleDeleteItem = async (id) => {
    const { error } = await supabase.from('item').delete().eq('id', id);
    if (error) { alert(error.message); return; }
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleCreateOutfit = async ({ name, selectedItemIds }) => {
    const newOutfit = {
      outfit_type: name?.trim(),
      items: selectedItemIds ?? [],
    };

    const { data, error } = await supabase
      .from('outfits')
      .insert([newOutfit])
      .select('outfit_id, outfit_type, items, created_at');

    if (error) {
      console.error('Error creating outfit:', error);
      alert(`Error creating outfit: ${error.message}`);
      return;
    }

    const created = data?.[0];
    if (!created) return;

    const itemMap = Object.fromEntries(items.map(i => [Number(i.id), i]));
    const ids = created.items ?? [];
    const pieces = (ids || []).map(id => itemMap[Number(id)]?.image).filter(Boolean);

    const formattedOutfit = {
      id: created.outfit_id,
      name: created.outfit_type || `Outfit #${created.outfit_id}`,
      pieces,
      created_at: created.created_at,
    };

    setOutfits(prev => [formattedOutfit, ...prev]);
  };

  const handleDeleteOutfit = async (id) => {
    const { error } = await supabase.from('outfits').delete().eq('outfit_id', id);
    if (error) { alert(error.message); return; }
    setOutfits(prev => prev.filter(o => o.id !== id));
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
              />
            }
          />
          <Route
            path="/saved-outfits"
            element={
              <SavedOutfitPage
                items={items}
                outfits={outfits}
                onCreateOutfit={handleCreateOutfit}
                onDeleteOutfit={handleDeleteOutfit}
              />
            }
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
