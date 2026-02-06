import React from 'react';
import { BadgeDollarSign, Flame, ShieldCheck, Sparkles, Truck } from 'lucide-react';

const ValueProposition = () => {
  const items = [
    {
      title: 'Freshly made daily',
      description: 'Made in small batches so it stays hot, fresh, and flavorful.',
     
    },
    {
      title: 'Always crispy & tasty',
      description: 'That golden crunch with a filling that actually slaps.',
      
    },
    {
      title: 'Clean & hygienic',
      description: 'Prepared with care in a neat, hygienic environment.',
     
    },
    {
      title: 'Affordable + delivery',
      description: 'Perfect for quick bites, events, and party trays — delivered.',
      
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Spring rolls &amp; samosas that hit different.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Freshly made, crispy every time, and always clean — perfect for quick bites, events, and
            parties.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {items.map(({ title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-black/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
               
                <div className="min-w-0">
                  <h3 className="text-sm font-bold tracking-tight text-gray-900 sm:text-[15px]">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600 sm:text-[13px]">
                    {description}
                  </p>
                </div>
              </div>

              {/* tiny stat chip row (keeps cards lively without being long) */}
              <div className="mt-4 flex flex-wrap gap-1">
                <span className="rounded-lg bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-gray-700">
                  Made fresh
                </span>
                <span className="rounded-lg bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-gray-700">
                  Party-ready
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-gray-700">
             
                  Affordable
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;


