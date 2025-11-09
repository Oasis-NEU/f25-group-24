import { Plus } from 'lucide-react';
import { colors } from '../constants/colors';
import { Link } from 'react-router-dom'

function Header({ onPostClick}) {
  return (
    <header 
      className="shadow-lg"
      style={{ background: colors.banner }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h1 
              className="font-serif text-5xl font-bold"
              style={{ color: colors.text }}
            >
                Mix Match
            </h1>
          </div>
          <div className="flex gap-4">

            <Link
              to="/"
              className="bg-white px-4 py-2 rounded-lg font-semibold"
              style={{ color: colors.banner }}
            >
              Your Closet
            </Link>

            <Link
              to="/saved-outfits"
              className="bg-white px-4 py-2 rounded-lg font-semibold"
              style={{ color: colors.banner }}
            >
              Saved Outfits
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;