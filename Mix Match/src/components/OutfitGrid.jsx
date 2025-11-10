import OutfitCard from "./OutfitCard";

export default function OutfitsGrid({ outfits, onDelete, onOpen }) {
  if (!outfits?.length) {
    return (
      <div className="text-center text-gray-500 py-20">
        No saved outfits yet.
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {outfits.map((o) => (
        <OutfitCard key={o.id} outfit={o} onDelete={onDelete} onClick={onOpen}/>
      ))}
    </div>
  );
}
