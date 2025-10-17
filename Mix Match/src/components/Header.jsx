import { Plus, ShoppingCart } from 'lucide-react';
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
            <h1 className="text-4xl font-bold text-white">Oasis Desert Deals</h1>
            <p className="text-white">Student Marketplace</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onCartClick}
              className="bg-white/20 px-4 py-2 rounded-lg font-semibold text-white flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Cart ({cartItemCount || 0})
            </button>

            <button
              onClick={onPostClick}
              className="bg-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
              style={{ color: colors.banner }}
            >
              <Plus size={20} />
              Post Item
            </button>
            
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;