import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, Bird, Play } from 'lucide-react';

/*
 * DESIGN: Hiroshima Dawn - Gallery Section
 * Peace-themed gallery with elegant grid layout
 * Showcases concert photos and events with proper aspect ratios
 */

const GALLERY_IMAGES = [
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/IHvxzBSJWbtFTMdJ.jpg',
    alt: 'Concert hall performance',
    category: 'concert',
  },
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/vWhpWbBPNNeCazfS.jpg',
    alt: 'Riverside performance in Hiroshima',
    category: 'outdoor',
  },
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/INlNeKpjJdBaIXlC.png',
    alt: 'Hiroshima concert with Steinway',
    category: 'concert',
  },
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/YOyUnuFfQGgNufuv.png',
    alt: 'March 2022 Charity Concert',
    category: 'event',
  },
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/OAiAtNBAeDvRrLVR.png',
    alt: 'April 2022 Charity Concert',
    category: 'event',
  },
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/PZACexwuGiBVpItE.jpg',
    alt: 'Outdoor performance',
    category: 'outdoor',
  },
];

const NEWS_IMAGES = [
  {
    src: '/images/news1.png',
    alt: 'News coverage - Chugoku Shimbun',
  },
  {
    src: '/images/news2.png',
    alt: 'News coverage - Asahi Shimbun',
  },
  {
    src: '/images/news3.png',
    alt: 'News coverage - Chugoku Shimbun',
  },
];

const VIDEOS = [
  {
    id: '1Th6Ko4TALwalsgfRSU_QZLdIIWWW3RCE',
    title: 'NHK World - Where We Call Home',
  },
  {
    id: '1yMSSu4-ADzeleqVSmMc8Ac-4nMgBIZCK',
    title: 'Let\'s Pray for Ukraine Documentary',
  },
];

export default function GallerySection() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-32 relative overflow-hidden">
      {/* Peace-themed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-sky-50/30 to-rose-50/40" />
      <div className="absolute inset-0 grain-overlay" />
      
      {/* Decorative peace elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Bird className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Bird className="w-32 h-32 text-primary transform -scale-x-100" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-lg text-muted-foreground font-serif italic">
            {t('gallery.subtitle')}
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-8">
            {language === 'ja' ? '動画' : 'Videos'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {VIDEOS.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
              >
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg bg-black/10 backdrop-blur-sm">
                  <img
                    src={`https://drive.google.com/thumbnail?id=${video.id}&sz=w640`}
                    alt={video.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center font-medium">
                  {video.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid - Clean uniform layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-white/50 backdrop-blur-sm p-2">
                <div className="w-full h-full overflow-hidden rounded-md">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Hover overlay with peace gradient */}
                <div className="absolute inset-2 rounded-md bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* News Coverage Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-8">
            {language === 'ja' ? 'メディア掲載' : 'Media Coverage'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {NEWS_IMAGES.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg bg-white/50 backdrop-blur-sm p-2">
                  <div className="w-full h-full overflow-hidden rounded-md">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Hover overlay with peace gradient */}
                  <div className="absolute inset-2 rounded-md bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      {/* Video Lightbox */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            onClick={() => setSelectedVideo(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://drive.google.com/file/d/${selectedVideo}/preview`}
              className="w-full h-full rounded-lg"
              allow="autoplay"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
