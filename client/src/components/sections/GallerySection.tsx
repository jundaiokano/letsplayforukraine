import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

/*
 * DESIGN: Hiroshima Dawn - Gallery Section
 * Masonry-style grid with lightbox functionality
 * Showcases concert photos and events
 */

const GALLERY_IMAGES = [
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/IHvxzBSJWbtFTMdJ.jpg',
    alt: 'Concert hall performance',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/vWhpWbBPNNeCazfS.jpg',
    alt: 'Riverside performance in Hiroshima',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/INlNeKpjJdBaIXlC.png',
    alt: 'Hiroshima concert with Steinway',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/YOyUnuFfQGgNufuv.png',
    alt: 'March 2022 Charity Concert',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/OAiAtNBAeDvRrLVR.png',
    alt: 'April 2022 Charity Concert',
    span: 'col-span-2 row-span-1',
  },
  {
    src: 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663030064758/PZACexwuGiBVpItE.jpg',
    alt: 'Outdoor performance',
    span: 'col-span-1 row-span-1',
  },
];

export default function GallerySection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-muted/30 grain-overlay">
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
            {t('gallery.title')}
          </h2>
          <p className="text-lg text-muted-foreground font-serif italic">
            {t('gallery.subtitle')}
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${image.span} overflow-hidden rounded-sm shadow-md cursor-pointer group`}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
}
