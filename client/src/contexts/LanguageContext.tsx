import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.story': 'Our Story',
    'nav.project': '2026 Project',
    'nav.impact': 'Impact',
    'nav.gallery': 'Gallery',
    'nav.support': 'Support',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': "Let's Pray / Play for Peace",
    'hero.subtitle': 'Music for Hope, Harmony for Tomorrow',
    'hero.description': 'A charity concert series by young musicians from Hiroshima, using the universal language of music to advocate for peace and support humanitarian aid.',
    'hero.cta': 'Learn More',
    'hero.donate': 'Support Us',
    
    // Story Section
    'story.title': 'Our Story',
    'story.subtitle': 'From Hiroshima to the World',
    'story.p1': 'In March 2022, two young musicians from Hiroshima—Eishin Richard Hiraishi (violinist) and Jundai Okano (pianist)—founded "Let\'s Pray for Ukraine" in response to the escalating conflict.',
    'story.p2': 'Eishin, whose mother is Ukrainian, had studied music in Ukraine just months before. Together with Jundai, they channeled their passion for music into a mission for peace.',
    'story.p3': 'Now rebranding as "Let\'s Pray / Play for Peace," the project expands its vision to advocate for global harmony through the transformative power of classical music.',
    'story.eishin.name': 'Eishin Richard Hiraishi',
    'story.eishin.role': 'Violinist',
    'story.eishin.bio': 'Born in Hiroshima with Ukrainian heritage. Currently studying at a prestigious music conservatory in Europe.',
    'story.jundai.name': 'Jundai Okano',
    'story.jundai.role': 'Pianist',
    'story.jundai.bio': 'Hiroshima native and graduate of Hiroshima International School. Pursuing advanced piano studies.',
    
    // Project 2026
    'project.title': '2026 Project',
    'project.subtitle': 'A New Chapter for Peace',
    'project.description': 'The 2026 concert series will combine classical music with cutting-edge digital visuals and interactive elements, including real-time connections with children in conflict zones.',
    'project.period': 'April - June 2026',
    'project.locations': 'Tokyo & Hiroshima, Japan',
    'project.concerts': '3-5 Concerts Planned',
    'project.beneficiaries': 'Schools in Ukraine & Gaza',
    
    // Impact
    'impact.title': 'Our Impact',
    'impact.subtitle': 'Making a Difference Through Music',
    'impact.concerts': 'Concerts Held',
    'impact.attendees': 'Total Attendees',
    'impact.donations': 'Donations Raised',
    'impact.recognition': 'Soroptimist Japan Foundation Award',
    'impact.humanitarian': 'Humanitarian Aid',
    'impact.humanitarian.desc': 'Proceeds from our concerts are sent to the Rotary Club to support humanitarian activities including medicine and food for the people of Ukraine.',
    
    // Gallery
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Moments of Music and Peace',
    
    // Support
    'support.title': 'Support Our Mission',
    'support.subtitle': 'Help Us Spread Peace Through Music',
    'support.description': 'Your support enables us to continue our concerts and expand our humanitarian aid efforts. Every contribution makes a difference.',
    'support.donate': 'Donate Now',
    'support.volunteer': 'Volunteer',
    'support.share': 'Share Our Story',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in Touch',
    'contact.email': 'Email',
    'contact.instagram': 'Instagram',
    'contact.message': 'For inquiries about concerts, collaborations, or donations, please reach out to us.',
    
    // Footer
    'footer.copyright': '© 2026 Let\'s Pray / Play for Peace. All rights reserved.',
    'footer.hiroshima': 'From Hiroshima with hope.',
  },
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.story': '私たちの物語',
    'nav.project': '2026プロジェクト',
    'nav.impact': '活動実績',
    'nav.gallery': 'ギャラリー',
    'nav.support': 'ご支援',
    'nav.contact': 'お問い合わせ',
    
    // Hero
    'hero.title': "Let's Pray / Play for Peace",
    'hero.subtitle': '音楽で希望を、ハーモニーで明日を',
    'hero.description': '広島出身の若き音楽家たちによるチャリティーコンサートシリーズ。音楽という普遍的な言語を通じて平和を訴え、人道支援を行っています。',
    'hero.cta': '詳しく見る',
    'hero.donate': 'ご支援ください',
    
    // Story Section
    'story.title': '私たちの物語',
    'story.subtitle': '広島から世界へ',
    'story.p1': '2022年3月、広島出身の二人の若き音楽家—平石英信リチャード（ヴァイオリニスト）と岡野淳大（ピアニスト）—は、激化する紛争に応えて「Let\'s Pray for Ukraine」を設立しました。',
    'story.p2': 'ウクライナ人の母を持つ英信は、わずか数ヶ月前にウクライナで音楽を学んでいました。淳大とともに、音楽への情熱を平和への使命へと変えました。',
    'story.p3': '現在「Let\'s Pray / Play for Peace」として活動を広げ、クラシック音楽の変革力を通じて世界の調和を訴えています。',
    'story.eishin.name': '平石 英信 リチャード',
    'story.eishin.role': 'ヴァイオリニスト',
    'story.eishin.bio': 'ウクライナにルーツを持つ広島生まれ。現在ヨーロッパの名門音楽院で学ぶ。',
    'story.jundai.name': '岡野 淳大',
    'story.jundai.role': 'ピアニスト',
    'story.jundai.bio': '広島出身、広島インターナショナルスクール卒業。ピアノの高度な研究を追求中。',
    
    // Project 2026
    'project.title': '2026プロジェクト',
    'project.subtitle': '平和への新章',
    'project.description': '2026年のコンサートシリーズでは、クラシック音楽と最先端のデジタルビジュアル、そして紛争地域の子どもたちとのリアルタイム交流を組み合わせます。',
    'project.period': '2026年4月〜6月',
    'project.locations': '東京・広島',
    'project.concerts': '3〜5回のコンサートを予定',
    'project.beneficiaries': 'ウクライナ・ガザの学校へ',
    
    // Impact
    'impact.title': '活動実績',
    'impact.subtitle': '音楽を通じて変化をもたらす',
    'impact.concerts': '開催コンサート数',
    'impact.attendees': '総来場者数',
    'impact.donations': '寄付総額',
    'impact.recognition': '国際ソロプチミスト日本財団賞',
    'impact.humanitarian': '人道支援活動',
    'impact.humanitarian.desc': 'チャリティーコンサートでの収益は、ロータリークラブに送金しています。ウクライナの人々の、薬や食料等の人道支援活動に協力させて頂いています。',
    
    // Gallery
    'gallery.title': 'ギャラリー',
    'gallery.subtitle': '音楽と平和の瞬間',
    
    // Support
    'support.title': '私たちの活動を支援する',
    'support.subtitle': '音楽を通じて平和を広げる',
    'support.description': 'ご支援により、コンサートの継続と人道支援活動の拡大が可能になります。すべてのご寄付が違いを生みます。',
    'support.donate': '寄付する',
    'support.volunteer': 'ボランティア',
    'support.share': '活動を共有する',
    
    // Contact
    'contact.title': 'お問い合わせ',
    'contact.subtitle': 'ご連絡ください',
    'contact.email': 'メール',
    'contact.instagram': 'インスタグラム',
    'contact.message': 'コンサート、コラボレーション、寄付に関するお問い合わせは、お気軽にご連絡ください。',
    
    // Footer
    'footer.copyright': '© 2026 Let\'s Pray / Play for Peace. All rights reserved.',
    'footer.hiroshima': '広島から希望を込めて。',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
