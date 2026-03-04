import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Sparkles } from 'lucide-react';

/*
 * DESIGN: Hiroshima Dawn - Contact Section
 * Clean, minimal contact information
 * Peace-themed warm gradient background
 */

export default function ContactSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 md:py-32 bg-harmony-gradient grain-overlay relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sky-100/30 rounded-full blur-3xl" />
      
      {/* Decorative sparkles */}
      <div className="absolute top-16 left-16 opacity-10">
        <Sparkles className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute bottom-16 right-16 opacity-10">
        <Sparkles className="w-20 h-20 text-primary" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground font-serif italic">
            {t('contact.subtitle')}
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Contact Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-sm">
            <p className="text-lg text-foreground/90 mb-10 leading-relaxed">
              {t('contact.message')}
            </p>

            {/* Contact Links */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://www.instagram.com/letsprayforukraine/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 border border-primary/20"
              >
                <Instagram className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">@letsprayforukraine</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
