'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { SectionHeading } from './SectionHeading';

const slides = [
  { title: 'Overview Dashboard', tone: 'from-teal-100 to-white' },
  { title: 'Analytics Insights', tone: 'from-cyan-100 to-white' },
  { title: 'CRM Pipeline', tone: 'from-emerald-100 to-white' },
  { title: 'Ecommerce Admin', tone: 'from-sky-100 to-white' },
  { title: 'Project Board', tone: 'from-violet-100 to-white' },
  { title: 'Dark Mode Console', tone: 'from-slate-800 to-slate-950' },
];

export function GallerySection() {
  return (
    <section className="nk-section overflow-hidden bg-white">
      <div className="nk-container">
        <SectionHeading
          eyebrow="Premium Gallery"
          title="A visual tour of"
          highlight="NeoKit screens"
          description="Swipe through signature dashboards and apps. Every composition is designed to look demo-ready out of the box."
        />
      </div>

      <div className="mt-12 px-4">
        <Swiper
          className="nk-gallery-swiper !pb-14"
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{ rotate: 8, stretch: 0, depth: 120, modifier: 1.4, slideShadows: false }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title} className="!w-[280px] sm:!w-[420px] lg:!w-[560px]">
              <div
                className={`overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${slide.tone} p-4 shadow-xl`}
              >
                <div
                  className={`overflow-hidden rounded-2xl border ${
                    slide.title.includes('Dark') ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 border-b px-4 py-2 ${
                      slide.title.includes('Dark')
                        ? 'border-slate-800 bg-slate-900'
                        : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span
                      className={`ml-2 text-xs font-medium ${
                        slide.title.includes('Dark') ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {slide.title}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-[4/3] rounded-xl ${
                          slide.title.includes('Dark') ? 'bg-slate-900' : 'bg-slate-100'
                        } ${i === 0 || i === 4 ? 'col-span-2' : ''}`}
                      >
                        {i < 3 && (
                          <div className="flex h-full items-end p-3">
                            <div className="h-1.5 w-12 rounded bg-primary" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
