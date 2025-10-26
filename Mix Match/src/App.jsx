import React, { useState } from 'react';
import MainPage from './pages/MainPage';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { supabase } from './supabaseClient'




function App() {
    const [listings, setListings] = useState([
        {
            id: 1,
            brand: "American Eagle",
            frequency_of_wear: 4,
            category: "Shirt",
            size: "Small",
            color: "White",
            seller_name: "John Doe",
            seller_rating: 4.5,
            image: "https://s7d2.scene7.com/is/image/aeo/3375_1281_092_of?$pdp-m-opt$&fmt=webp"
        },
        {
            id: 2,
            brand: "Garage",
            frequency_of_wear: 3,
            category: "Pants",
            size: "Medium",
            color: "Blue",
            seller_name: "Jane Smith",
            seller_rating: 4.8,
            image: "https://www.garageclothing.com/dw/image/v2/BDRP_PRD/on/demandware.static/-/Sites-root_garage_catalog/default/dwcd916bdf/images/100093068/100093068_07J_1920x2880.jpg?sw=740&sh=1110"
        },
        {
            id: 3,
            brand: "Abecrombie and Fitch",
            frequency_of_wear: 12,
            category: "Pants",
            size: "Medium",
            color: "Black",
            seller_name: "Mike Johnson",
            seller_rating: 4.2,
            image: "https://img.abercrombie.com/is/image/anf/KIC_155-4488-00559-977_life1?policy=product-large"
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


export default App

