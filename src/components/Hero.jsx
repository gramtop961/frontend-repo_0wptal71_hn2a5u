import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/t6fYoL-pmPsm38nx/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-widest text-purple-300/80">CRM Automations</span>
            <h1 className="mt-3 text-4xl md:text-6xl font-semibold leading-tight">
              A clean dashboard for everything running in the background
            </h1>
            <p className="mt-4 text-white/70 max-w-xl">
              Track automations, monitor recent runs, and stay in control with a minimalist black and white UI accented with purple.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#dashboard" className="inline-flex items-center rounded-md bg-purple-600 text-white px-4 py-2 text-sm font-medium hover:bg-purple-500 transition">Open Dashboard</a>
              <a href="#create" className="inline-flex items-center rounded-md border border-white/20 text-white px-4 py-2 text-sm font-medium hover:bg-white/10 transition">New Automation</a>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
    </section>
  );
}
