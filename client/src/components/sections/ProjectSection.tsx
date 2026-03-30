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

  const events = [
    {
      city: language === 'ja' ? '東京公演' : 'Tokyo',
      date: language === 'ja' ? '2026年4月25日（土）' : 'April 25, 2026 (Sat)',
      time: language === 'ja' ? '19:30 開演（19:15 開場）' : '7:30 PM (doors 7:15 PM)',
      venue: language === 'ja' ? 'めぐろパーシモンホール 小ホール' : 'Meguro Persimmon Hall (Small Hall)',
      address: language === 'ja' ? '〒152-0023 東京都目黒区八雲1-1-1' : '1-1-1 Yakumo, Meguro-ku, Tokyo 152-0023',
      access: language === 'ja' ? '東急東横線・都立大学駅より徒歩7分' : '7 min walk from Toritsu-daigaku Station',
    },
    {
      city: language === 'ja' ? '広島公演' : 'Hiroshima',
      date: language === 'ja' ? '2026年5月3日（日）' : 'May 3, 2026 (Sun)',
      time: language === 'ja' ? '18:30 開演（18:00 開場）' : '6:30 PM (doors 6:00 PM)',
      venue:
        language === 'ja'
          ? '広島市東区民文化センター スタジオ1'
          : 'Hiroshima Higashi Ward Cultural Center (Studio 1)',
      address:
        language === 'ja' ? '〒732-0055 広島県広島市東区東蟹屋町10番31号' : '10-31 Higashikaniya-cho, Hiroshima 732-0055',
      access:
        language === 'ja'
          ? '広島駅より徒歩10分・東区役所前バス停下車すぐ'
          : '10 min walk from Hiroshima Station, or get off at Higashi Ward Office bus stop',
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

            {/* Event Cards */}
            <div className="grid gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.city}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm rounded-sm p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-foreground text-base">
                      {event.city}
                    </h3>
                  </div>
                  <div className="grid gap-2 text-sm text-foreground/90">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-medium">{event.date}</span>
                      <span className="text-muted-foreground">{event.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="grid gap-1">
                        <span className="font-medium">{event.venue}</span>
                        <span className="text-muted-foreground">{event.address}</span>
                        <span className="text-muted-foreground">{event.access}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="bg-white/60 backdrop-blur-sm rounded-sm p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-foreground text-sm">
                    {language === 'ja' ? '支援先' : 'Beneficiaries'}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {language === 'ja' ? 'ウクライナロータリークラブ' : 'Ukraine Rotary Club'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
