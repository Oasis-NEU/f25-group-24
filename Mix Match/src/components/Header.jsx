import { Plus } from 'lucide-react';
import { colors } from '../constants/colors';

function Header({ onPostClick, cartItemCount, onCartClick }) {
  return (
    <header 
      className="shadow-lg"
      style={{ background: `linear-gradient(to right, ${colors.banner}, ${colors.banner})` }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="font-serif text-5xl font-bold color: colors.text">Mix Match</h1>
            <p className="font-serif color: colors.text text-left">Your Closet</p>
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