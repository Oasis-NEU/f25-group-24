import React, { useState } from 'react';
import MainPage from './pages/MainPage';

function App() {
    const [listings, setListings] = useState([
        {
            id: 1,
            title: "Calculus Textbook",
            price: 45,
            category: "textbooks",
            description: "Barely used calculus textbook",
            seller_name: "John Doe",
            seller_rating: 4.5,
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"
        },
        {
            id: 2,
            title: "Dorm Room Essentials",
            price: 30,
            category: "furniture",
            description: "Complete set of dorm room essentials",
            seller_name: "Jane Smith",
            seller_rating: 4.8,
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"
        },
        {
            id: 3,
            title: "Bicycle for Sale",
            price: 120,
            category: "transportation",
            description: "Gently used bicycle in great condition",
            seller_name: "Mike Johnson",
            seller_rating: 4.2,
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"
        }
    ]);

    // Placeholder functions for Week 3
    const handleCreateListing = (formData) => {
        console.log('Create listing:', formData);
        alert('Create listing functionality will be added in a later week!');
    };

    const handleDeleteListing = (id) => {
        console.log('Delete listing:', id);
        alert('Delete listing functionality will be added in a later week!');
    };

    const handleAddToCart = (listing) => {
        console.log('Add to cart:', listing);
        alert('Cart functionality will be added in a later week!');
    };

    const handleCartClick = () => {
        alert('Cart page will be added in a later week!');
    };

    return (
        <MainPage
            listings={listings}
            onCreateListing={handleCreateListing}
            onDeleteListing={handleDeleteListing}
            onAddToCart={handleAddToCart}
            cartItemCount={0}
            onNavigateToCart={handleCartClick}
        />
    );
}

export default App;