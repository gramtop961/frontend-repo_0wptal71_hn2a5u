import { useEffect, useState } from 'react';

export default function Stats() {
  const [stats, setStats] = useState({ total_automations: 0, active_automations: 0, paused_automations: 0, recent_runs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || '';
        const res = await fetch(`${base}/api/stats`);
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section id="dashboard" className="bg-black text-white py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Overview</h2>
          {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Automations" value={stats.total_automations} />
          <StatCard label="Active" value={stats.active_automations} />
          <StatCard label="Paused" value={stats.paused_automations} />
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium text-white/80">Recent Runs</h3>
          <div className="mt-3 rounded-lg border border-white/10 divide-y divide-white/10">
            {loading ? (
              <Row>Loading...</Row>
            ) : stats.recent_runs && stats.recent_runs.length > 0 ? (
              stats.recent_runs.map((r) => (
                <Row key={r._id}>
                  <span className="text-white/90">{r.status}</span>
                  <span className="text-white/60">Processed {r.processed || 0}</span>
                  <span className="text-white/50 text-sm">{r.started_at}</span>
                </Row>
              ))
            ) : (
              <Row>No recent runs</Row>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm uppercase tracking-wide text-white/60">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-purple-400">{value ?? 0}</p>
    </div>
  );
}

function Row({ children }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">{children}</div>
  );
}
