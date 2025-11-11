# Mix Match
## Overview
Mix Match is an online database you can use to organize your closet. It supports clothing images, outfit creation, and searchable item details, making it easy to visualize your wardrobe and build outfits digitally.

## Features
- Add clothing items with images and details
- Create outfits by searching and combining items
- Save outfits to the database

## Tech Stack
- Frontend: React, HTML, JavaScript, Tailwind CSS, Vite
- Backend: Supabase API routes
- Database: Supabase PostgreSQL
- Tools: GitHub, VS Code

## Database Schema
- item – stores each clothing piece: brand, category, size, color, image, and frequency of wear
- outfits – stores each outfit as a list of items and has its own category option

## Setup Instructions
- Clone the repository:
  - git clone https://github.com/Oasis-NEU/f25-group-24.git
- Install dependencies:
  - npm install
- Create a .env file and add your Supabase keys:
  - VITE_SUPABASE_URL=
  - VITE_SUPABASE_ANON_KEY=
- Start the development server:
  - npm run dev

## Using the App
- Typical workflow:
  - Upload clothing items
  - View your wardrobe
  - Create outfits by searching items
  - Save the complete outfit
- Future Improvements
  - User accounts and authentication
  - Sorting and filtering the closet
  - Ability to share liked outfits with friends

## Contributors
Anjali Ahuja, Hannah Casali, Payal Patel, and Saachi Bhatia
