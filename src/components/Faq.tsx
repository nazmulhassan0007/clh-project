import { useState } from 'react'
import { Plus } from 'lucide-react'

import type { FaqItem } from '../faqs'

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <ul className="faq">
      {items.map((f, i) => {
        const on = open === i
        return (
          <li key={f.q} className={`faq-item${on ? ' is-open' : ''}`}>
            <h3>
              <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} id={`faq-b-${i}`} onClick={() => setOpen(on ? null : i)}>
                <span>{f.q}</span>
                <Plus size={22} aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-body" id={`faq-${i}`} role="region" aria-labelledby={`faq-b-${i}`}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
