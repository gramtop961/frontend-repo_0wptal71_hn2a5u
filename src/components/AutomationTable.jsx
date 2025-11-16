import { useEffect, useState } from 'react';

export default function AutomationTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || '';
        const res = await fetch(`${base}/api/automations`);
        const data = await res.json();
        setItems(data);
      } catch (e) {
        // noop
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="bg-black text-white py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white/80">Automations</h3>
        </div>
        <div className="mt-3 rounded-lg border border-white/10 overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-white/5 text-left text-sm text-white/60">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Trigger</th>
                <th className="px-4 py-3">Frequency</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr><td className="px-4 py-4 text-sm" colSpan={5}>Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td className="px-4 py-4 text-sm text-white/70" colSpan={5}>No automations yet</td></tr>
              ) : (
                items.map(item => (
                  <tr key={item._id} className="hover:bg-white/5">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3"><span className={item.status === 'active' ? 'text-purple-400' : 'text-white/60'}>{item.status}</span></td>
                    <td className="px-4 py-3">{item.trigger}</td>
                    <td className="px-4 py-3">{item.frequency || '-'}</td>
                    <td className="px-4 py-3 text-white/70">{item.description || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
