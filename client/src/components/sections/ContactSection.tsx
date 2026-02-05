import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Instagram } from 'lucide-react';

/*
 * DESIGN: Hiroshima Dawn - Contact Section
 * Clean, minimal contact information
 * Warm, inviting tone
 */

export default function ContactSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 md:py-32 bg-dawn-gradient grain-overlay">
      <div className="container mx-auto px-4">
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
          <p className="text-lg text-foreground/90 mb-12 leading-relaxed">
            {t('contact.message')}
          </p>

          {/* Contact Links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://www.instagram.com/letsprayforukraine/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-sm shadow-sm hover:shadow-md hover:bg-white transition-all duration-300"
            >
              <Instagram className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">@letsprayforukraine</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
