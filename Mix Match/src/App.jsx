import React, { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import './App.css';
import { supabase } from './supabaseClient';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const { data, error } = await supabase
        .from('item')
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

  if(loading) return <div>Loading...</div>;

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
          /* seller_name: 'You',
          seller_rating: 5.0 */
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
    <MainPage
      items={items}
      onCreateItem={handleCreateItem}
      onDeleteItem={handleDeleteItem}
    />
  );
}

export default App;

