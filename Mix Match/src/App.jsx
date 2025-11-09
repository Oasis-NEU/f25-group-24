// App.jsx (AppInner)
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

  const safeParse = (v) => { try { return JSON.parse(v ?? '[]'); } catch { return []; } };

  async function fetchAllData() {
    try {
      // items (closet)
      const { data: itemsData, error: itemsError } = await supabase
        .from('item')
        .select('id, name, brand, category, color, size, frequency_of_wear, image, created_at')
        .order('created_at', { ascending: false });
      if (itemsError) throw itemsError;
      setItems(itemsData || []);

      // outfits (use actual columns)
      const { data: outfitsData, error: outfitsError } = await supabase
        .from('outfits')
        .select('outfit_id, outfit_type, items, created_at')
        .order('created_at', { ascending: false });
      if (outfitsError) throw outfitsError;

      const itemMap = Object.fromEntries((itemsData || []).map(i => [Number(i.id), i]));
      const normalized = (outfitsData || []).map(o => {
        const ids = Array.isArray(o.items) ? o.items : safeParse(o.items);
        return {
          id: o.outfit_id,
          name: o.outfit_type || `Outfit #${o.outfit_id}`,
          pieces: (ids || []).map(id => itemMap[Number(id)]?.image).filter(Boolean),
          created_at: o.created_at,
        };
      });

      setOutfits(normalized);
    } catch (err) {
      console.error('Error fetching data:', err);
      alert(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateOutfit = async ({ name, selectedItemIds }) => {
    const payload = {
      outfit_type: name?.trim(),       // <-- maps to outfit_type
      items: selectedItemIds ?? [],    // <-- array/jsonb of item IDs
    };

    const { data, error } = await supabase
      .from('outfits')
      .insert([payload])
      .select('outfit_id, outfit_type, items, created_at');

    if (error) {
      console.error('Error creating outfit:', error);
      alert(`Error creating outfit: ${error.message}`);
      return;
    }

    const created = data?.[0];
    if (!created) return;

    // map to UI shape
    const itemMap = Object.fromEntries(items.map(i => [Number(i.id), i]));
    const ids = Array.isArray(created.items) ? created.items : safeParse(created.items);
    const pieces = (ids || []).map(id => itemMap[Number(id)]?.image).filter(Boolean);

    const normalized = {
      id: created.outfit_id,
      name: created.outfit_type || `Outfit #${created.outfit_id}`,
      pieces,
      created_at: created.created_at,
    };

    setOutfits(prev => [normalized, ...prev]); // show immediately
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
                onCreateItem={async (fd) => {
                  const { data, error } = await supabase
                    .from('item')
                    .insert([{
                      name: fd.name,
                      brand: fd.brand,
                      category: fd.category,
                      size: fd.size,
                      color: fd.color,
                      image: fd.image,
                      frequency_of_wear: Number(fd.frequency_of_wear)
                    }])
                    .select();
                  if (error) { alert(error.message); return; }
                  if (data?.[0]) setItems(prev => [data[0], ...prev]);
                }}
                onDeleteItem={async (id) => {
                  const { error } = await supabase.from('item').delete().eq('id', id);
                  if (error) { alert(error.message); return; }
                  setItems(prev => prev.filter(i => i.id !== id));
                }}
              />
            }
          />
          <Route
            path="/saved-outfits"
            element={
              <SavedOutfitPage
                items={items}
                outfits={outfits}
                onCreateOutfit={handleCreateOutfit}  // pass creator
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
