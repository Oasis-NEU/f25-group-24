# Mix Match
## Overview
MixMatch is an online database you can use to organize your closet. It supports clothing images, outfit creation, and searchable item details, making it easy to visualize your wardrobe and build outfits digitally.

## Features
- Add clothing items with images and details
- Create outfits by combining items
- Save outfits to the database
- Search or filter clothing items

## Tech Stack
- Frontend: React, Vite, JavaScript, Tailwind
- Backend: Supabase API routes
- Database: Supabase PostgreSQL
- Tools: GitHub, VS Code

## Database Schema
- items – stores each clothing piece
- outfits – stores each outfit
- outfit_items – connects items to outfits
- brands, clothing_types, colors, sizes – lookup tables for item metadata

## Setup Instructions
- Clone the repository:
- - git clone https://github.com/Oasis-NEU/f25-group-24.git
- Install dependencies:
- - npm install
- Create a .env file and add your Supabase keys:
- - VITE_SUPABASE_URL=
- - VITE_SUPABASE_ANON_KEY=
- Start the development server:
- - npm run dev

## Using the App
- Typical workflow:
- - Upload clothing items
- - View your wardrobe
- - Create outfits
- - Save and edit outfits
- - Future Improvements
- - User accounts and authentication
- - Outfit recommendation algorithm
- - Ability to share outfits with friends

## Contributors
Anjali Ahuja, Hannah Casali, Payal Patel, and Saachi Bhatia
