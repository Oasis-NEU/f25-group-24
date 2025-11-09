import { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { colors } from '../constants/colors';
import { supabase } from '../supabaseClient';

export default function CreateOutfitModal({
  show, onClose, formData, setFormData, onSubmit
}) {
  if (!show) return null;

  const [query, setQuery] = useState('');
  const [rows, setRows] = useState([]);        // [{id, name}]
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const nameCacheRef = useRef(new Map());      // id -> name (so chips keep labels)

  // cache any names we see
  const cacheNames = (list) => {
    const cache = nameCacheRef.current;
    for (const r of list) if (r?.id != null && r?.name != null) cache.set(r.id, r.name);
  };

  // fetch-by-name only when query has text
  async function fetchNames(q) {
    const trimmed = q.trim();
    if (!trimmed) {            // ← nothing typed yet
      setRows([]);
      setLoading(false);
      setErrorText('');
      return;
    }
    setLoading(true);
    setErrorText('');
    try {
      let req = supabase
        .from('item')
        .select('id, name')
        .ilike('name', `%${trimmed}%`)
        .order('name', { ascending: true })
        .limit(100);

      const { data, error } = await req;
      if (error) throw error;
      setRows(data || []);
      cacheNames(data || []);
    } catch (e) {
      setErrorText(e.message || 'Fetch failed');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  // debounce typing a bit
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => fetchNames(query), 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, query]);

  const pickedIds = useMemo(
    () => new Set(formData.selectedItemIds ?? []),
    [formData.selectedItemIds]
  );

  const togglePick = (id) => {
    setFormData(prev => {
      const set = new Set(prev.selectedItemIds ?? []);
      set.has(id) ? set.delete(id) : set.add(id);
      return { ...prev, selectedItemIds: Array.from(set) };
    });
  };

  const removePick = (id) => {
    setFormData(prev => ({
      ...prev,
      selectedItemIds: (prev.selectedItemIds ?? []).filter(x => x !== id),
    }));
  };

  const isPicked = (id) => pickedIds.has(id);

  const labelFor = (id) => {
    // prefer cache so chips keep names even when rows are empty
    const cache = nameCacheRef.current;
    return cache.get(id) ?? rows.find(r => r.id === id)?.name ?? `Item #${id}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
            Create Outfit
          </h2>
          <button type="button" onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-5">
          {/* Outfit name */}
          <div>
            <label className="block mb-1 text-left">Outfit Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g. Outfit Name"
              required
            />
          </div>

          {/* Search box (name only) */}
          <div>
            <label className="block mb-1 text-left">Search Items by Name</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Type to search…"
            />
            <div className="mt-2 text-xs text-gray-500">
              {!query.trim()
                ? 'Type to search'
                : loading
                  ? 'Loading…'
                  : `${rows.length} result(s)` }
              {errorText ? <span className="text-red-500 ml-2">{errorText}</span> : null}
            </div>

            <div className="mt-3 max-h-56 overflow-auto border rounded">
              {!query.trim() ? (
                <div className="p-3 text-sm text-gray-500">Start typing to see results.</div>
              ) : (!loading && rows.length === 0) ? (
                <div className="p-3 text-sm text-gray-500">No matches.</div>
              ) : rows.map(({ id, name }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => togglePick(id)}
                  className={`w-full text-left px-3 py-2 border-b last:border-b-0 hover:bg-gray-50 ${
                    isPicked(id) ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="font-medium">{name || `(no name — id ${id})`}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected items (text chips) */}
          <div>
            <label className="block mb-1 text-left">Selected Items</label>
            <div className="flex flex-wrap gap-2">
              {(formData.selectedItemIds ?? []).length === 0 && (
                <span className="text-sm text-gray-500">None yet</span>
              )}
              {(formData.selectedItemIds ?? []).map(id => (
                <span key={id} className="px-2 py-1 text-sm border rounded-full">
                  {labelFor(id)}
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-black"
                    onClick={() => removePick(id)}
                    aria-label={`Remove ${labelFor(id)}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 border rounded text-black"
              style={{ backgroundColor: colors.primary }}
            >
              Save Outfit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
