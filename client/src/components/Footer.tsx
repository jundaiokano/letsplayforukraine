import { useLanguage } from '@/contexts/LanguageContext';

/*
 * DESIGN: Hiroshima Dawn - Footer
 * Minimal, elegant footer with copyright and tagline
 */

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4 text-center">
        <div className="font-serif text-lg mb-4">
          Let's Pray / Play for Peace
        </div>
        <p className="text-background/60 text-sm mb-4">
          {t('footer.hiroshima')}
        </p>
        <div className="gold-line w-24 mx-auto mb-4 opacity-50" />
        <p className="text-background/50 text-xs">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
