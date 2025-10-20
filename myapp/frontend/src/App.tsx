import { useEffect, useState } from 'react'

export default function App() {
  const [health, setHealth] = useState('checking...')
  const [greet, setGreet] = useState('')

  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(d => setHealth(d.status))
      .catch(() => setHealth('error'))
  }, [])

  const loadGreeting = async () => {
    const r = await fetch('/api/greeting?name=Tailwind')
    const d = await r.json()
    setGreet(d.message)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Frontend ↔ Backend</h1>
          <button
            className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => document.documentElement.classList.toggle('dark')}
          >
            Toggle dark
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          API status: <span className="font-medium">{health}</span>
        </p>

        <button
          onClick={loadGreeting}
          className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm shadow hover:shadow-md active:scale-[0.99] dark:bg-white dark:text-slate-900"
        >
          Get greeting
        </button>

        {greet && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
            {greet}
          </div>
        )}
      </main>
    </div>
  )
}
