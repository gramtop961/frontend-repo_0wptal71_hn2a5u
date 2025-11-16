import { useState } from 'react';

export default function AutomationForm({ onCreated }) {
  const [form, setForm] = useState({ name: '', description: '', status: 'active', trigger: 'schedule', frequency: 'daily 9am' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const base = import.meta.env.VITE_BACKEND_URL || '';
      const res = await fetch(`${base}/api/automations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create automation');
      const data = await res.json();
      onCreated && onCreated(data.id);
      setForm({ name: '', description: '', status: 'active', trigger: 'schedule', frequency: 'daily 9am' });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="create" className="bg-black text-white py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="text-lg font-medium text-white/80">Create Automation</h3>
        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-3">
          <input required value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Name" className="md:col-span-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-600" />
          <input value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} placeholder="Description" className="md:col-span-2 bg-white/5 border border-white/10 rounded-md px-3 py-2 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-600" />
          <select value={form.trigger} onChange={(e)=>setForm({...form, trigger:e.target.value})} className="bg-white/5 border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
            <option value="schedule">Schedule</option>
            <option value="webhook">Webhook</option>
            <option value="event">Event</option>
          </select>
          <input value={form.frequency} onChange={(e)=>setForm({...form, frequency:e.target.value})} placeholder="Frequency" className="bg-white/5 border border-white/10 rounded-md px-3 py-2 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-600" />
          <button disabled={loading} type="submit" className="md:col-span-5 inline-flex justify-center rounded-md bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Creating...' : 'Create Automation'}
          </button>
          {error && <p className="md:col-span-5 text-sm text-red-400">{error}</p>}
        </form>
      </div>
    </section>
  );
}
