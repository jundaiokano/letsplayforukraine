import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Heart } from 'lucide-react';

/*
 * DESIGN: Hiroshima Dawn - Project 2026 Section
 * Clean, informative layout with key project details
 * Dawn gradient background
 */

const NHK_PERFORMANCE = 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/bYMTmIIkpDHPldBl.png';

export default function ProjectSection() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Calendar,
      title: language === 'ja' ? '開催時期' : 'Period',
      description: 'TBD',
    },
    {
      icon: MapPin,
      title: language === 'ja' ? '開催場所' : 'Location',
      description: language === 'ja' ? '東京・広島（日本）' : 'Tokyo & Hiroshima, Japan',
    },
    {
      icon: Heart,
      title: language === 'ja' ? '支援先' : 'Beneficiaries',
      description: 'TBD',
    },
  ];

  return (
    <section id="project" className="py-24 md:py-32 bg-dawn-gradient grain-overlay">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {t('project.title')}
          </h2>
          <p className="text-lg text-muted-foreground font-serif italic">
            {t('project.subtitle')}
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-video overflow-hidden rounded-sm shadow-2xl">
              <img
                src={NHK_PERFORMANCE}
                alt="NHK World Performance"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text & Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <p className="text-lg leading-relaxed text-foreground/90 mb-10">
              {t('project.description')}
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm rounded-sm p-5 shadow-sm"
                >
                  <feature.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-medium text-foreground text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
