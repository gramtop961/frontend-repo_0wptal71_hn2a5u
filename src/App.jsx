import Hero from './components/Hero'
import Stats from './components/Stats'
import AutomationForm from './components/AutomationForm'
import AutomationTable from './components/AutomationTable'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <Stats />
      <AutomationForm onCreated={() => window.location.reload()} />
      <AutomationTable />
      <footer className="bg-black/90 text-white/50 py-8">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
          <p className="text-sm">© {new Date().getFullYear()} Minimal CRM</p>
          <p className="text-sm">Purple accents. Clean lines.</p>
        </div>
      </footer>
    </div>
  )
}

export default App