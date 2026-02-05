import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award } from 'lucide-react';

/*
 * DESIGN: Hiroshima Dawn - Impact Section
 * Statistics display with humanitarian aid imagery
 * Clean, impactful presentation of achievements
 */

const HUMANITARIAN_AID = 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/TtvDDCeigopOxHAW.png';

export default function ImpactSection() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    {
      value: '25+',
      label: t('impact.concerts'),
    },
    {
      value: '1,200+',
      label: t('impact.attendees'),
    },
    {
      value: language === 'ja' ? '600万円+' : '¥6M+',
      label: t('impact.donations'),
    },
  ];

  return (
    <section id="impact" className="py-24 md:py-32 bg-background grain-overlay">
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
            {t('impact.title')}
          </h2>
          <p className="text-lg text-muted-foreground font-serif italic">
            {t('impact.subtitle')}
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 md:gap-12 mb-16 md:mb-24"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-3xl md:text-5xl lg:text-6xl text-primary font-medium mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Recognition Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm md:text-base font-medium text-foreground">
              {t('impact.recognition')}
            </span>
          </div>
        </motion.div>

        {/* Humanitarian Aid Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
              {t('impact.humanitarian')}
            </h3>
            <p className="text-lg leading-relaxed text-foreground/90">
              {t('impact.humanitarian.desc')}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
              <img
                src={HUMANITARIAN_AID}
                alt="Humanitarian aid activities in Ukraine"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
