import { Plus } from 'lucide-react';
import { colors } from '../constants/colors';

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
            <p 
              className="font-serif text-left"
              style={{color: colors.text }}
            >
              Your Closet
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onPostClick}
              className="bg-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
              style={{ color: colors.banner }}
            >
              <Plus size={20} />
              Add Item
            </button>
            
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;