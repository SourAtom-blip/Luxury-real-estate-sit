export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-obsidian-black border-t border-obsidian-warm py-12 px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <span
          className="font-display text-obsidian-stone font-light"
          style={{ letterSpacing: '0.22em', fontSize: '0.8rem' }}
        >
          OBSIDIAN RESIDENCES
        </span>

        <p
          className="text-obsidian-stone font-body font-light"
          style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}
        >
          © {year} Obsidian Residences. All rights reserved.
        </p>

        <div className="flex items-center gap-8">
          {['Privacy', 'Legal', 'Press'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-obsidian-stone hover-bronze font-body font-light"
              style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
