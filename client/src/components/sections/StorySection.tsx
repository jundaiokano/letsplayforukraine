import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/*
 * DESIGN: Hiroshima Dawn - Story Section
 * Narrative-driven layout with founder portraits
 * Asymmetric composition with generous whitespace
 */

const IMAGES = {
  sunflower: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/BHZePScYFnHmsWcV.jpg',
  abombDome: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/iCncTRnDIFzrZCOF.jpg',
  eishin: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/YviLDLNcECnUVQPF.jpg',
  jundai: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/qajmxpsFsUpckdVz.jpg',
};

export default function StorySection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="story" className="py-24 md:py-32 bg-background grain-overlay">
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
            {t('story.title')}
          </h2>
          <p className="text-lg text-muted-foreground font-serif italic">
            {t('story.subtitle')}
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Story Content - Asymmetric Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image - A-Bomb Dome */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
              <img
                src={IMAGES.abombDome}
                alt="Founders at Hiroshima A-Bomb Dome"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/30 rounded-sm -z-10" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-foreground/90">
              {t('story.p1')}
            </p>
            <p className="text-lg leading-relaxed text-foreground/90">
              {t('story.p2')}
            </p>
            <p className="text-lg leading-relaxed text-foreground/90">
              {t('story.p3')}
            </p>
          </motion.div>
        </div>

        {/* Sunflower Image - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="aspect-[21/9] overflow-hidden rounded-sm shadow-xl">
            <img
              src={IMAGES.sunflower}
              alt="Founders in sunflower field"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Founders Profiles */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Eishin */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="w-32 h-40 md:w-40 md:h-52 flex-shrink-0 overflow-hidden rounded-sm shadow-lg">
              <img
                src={IMAGES.eishin}
                alt="Eishin Richard Hiraishi"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">
                {t('story.eishin.name')}
              </h3>
              <p className="text-primary font-medium mb-3">{t('story.eishin.role')}</p>
              <p className="text-muted-foreground leading-relaxed">
                {t('story.eishin.bio')}
              </p>
            </div>
          </motion.div>

          {/* Jundai */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="w-32 h-40 md:w-40 md:h-52 flex-shrink-0 overflow-hidden rounded-sm shadow-lg">
              <img
                src={IMAGES.jundai}
                alt="Jundai Okano"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">
                {t('story.jundai.name')}
              </h3>
              <p className="text-primary font-medium mb-3">{t('story.jundai.role')}</p>
              <p className="text-muted-foreground leading-relaxed">
                {t('story.jundai.bio')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
