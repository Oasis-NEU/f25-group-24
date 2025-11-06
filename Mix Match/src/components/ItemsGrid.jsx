import ItemCard from './ItemCard';

function ItemsGrid({ items, onItemClick, onDeleteItem }) {
  if(!items || items.length == 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No items found.
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          onClick={() => onItemClick(item)}
          onDelete={onDeleteItem}
        />
      ))}
    </div>
  );
}

export default ItemsGrid;