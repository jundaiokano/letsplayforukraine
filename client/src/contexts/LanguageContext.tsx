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
    'hero.description': 'A charity concert series led by the next generation of musicians from Hiroshima. We use the universal language of music to advocate for peace and deliver vital humanitarian aid across borders.',
    'hero.cta': 'Learn More',
    'hero.donate': 'Support Us',
    
    // Story Section
    'story.title': 'Our Story',
    'story.subtitle': 'From Hiroshima to the World: A Legacy of Peace',
    'story.p1': 'In March 2022, two young musicians from Hiroshima—Eishin Richard Hiraishi (Violinist/Violist) and Jundai Okano (Pianist)—founded "Let\'s Pray/Play for Ukraine" in response to the global crisis. Driven by the question, "What can we do through music?", they launched a mission to provide hope through harmony.',
    'story.p2': 'Both artists share a deep personal connection to their cause: Eishin has Ukrainian roots and Jundai grew up in Hiroshima, a city that embodies the spirit of peace. In 2021, they both experienced a musical study program in Ukraine, further strengthening their commitment to the region. By transforming their artistic passion into a "mission for peace," they have successfully performed over 20 concerts across Japan and the United States.',
    'story.p3': 'Today, we have expanded our vision to "Let\'s Pray / Play for Peace," advocating for global harmony through the transformative power of classical music.',
    'story.eishin.name': 'Eishin Richard Hiraishi',
    'story.eishin.role': 'Violinist / Violist',
    'story.eishin.bio': 'Born in Hiroshima in 2007 with Ukrainian-Japanese heritage. After studying at the Hanover University of Music, Drama, and Media (VIFF) in Germany, he is currently pursuing his musical studies at Ball State University in the United States. As a soloist, Eishin has performed in major televised concerts and prestigious venues, including appearances with the Hiroshima Symphony Orchestra and on NHK\'s "Inochi no Uta". An active chamber musician, he has collaborated with various ensembles, including the Benefic Chamber Orchestra. In the summer of 2025, Eishin served as the Principal Violist for the Carnegie Hall-led National Youth Orchestra of the USA (NYO-USA) on its Asia tour. Performing under the baton of Maestro Gianandrea Noseda and alongside acclaimed violinist Ray Chen, he toured multiple countries as a leading member of this elite ensemble. His accolades include the Tokiko Iwatani Foundation "Foundation for Youth" Award and top prizes at the international "Flame" competition in Paris.',
    'story.jundai.name': 'Jundai Okano',
    'story.jundai.role': 'Pianist',
    'story.jundai.bio': 'Born in Hiroshima in 2005, Jundai Okano began playing the piano at the age of three. He was awarded the Gold Medal and Concerto Prize at the Chopin International Piano Competition in Asia. In 2023, he performed with the singer AI at the UNICEF "Lasting Peace Project LIVE" held during the G7 Hiroshima Summit. As the founder of the "Let\'s Pray/Play for Ukraine" initiative, he has organized and performed in over 20 charity concerts across Japan and the United States. He has studied under Kyoko Sato and Hayu Kozuta, and participated in masterclasses with Keigo Mukawa and at the Mozarteum University Salzburg. He is currently a sophomore at the Faculty of Environment and Information Studies, Keio University.',
    
    // Project 2026
    'project.title': '2026 Project',
    'project.subtitle': 'A New Chapter for Peace',
    'project.description': 'Our 2026 concert series will redefine the charitable experience by blending classical masterpieces with cutting-edge digital visuals and real-time interactive sessions with children in conflict zones. We aim to create a space where art and technology unite to amplify the message of peace.',
    'project.period': 'TBD',
    'project.locations': 'Tokyo & Hiroshima, Japan',
    'project.concerts': 'TBD',
    'project.beneficiaries': 'TBD',
    
    // Impact
    'impact.title': 'Impact',
    'impact.subtitle': 'Making a Difference Through Music',
    'impact.concerts': 'Concerts Held',
    'impact.attendees': 'Total Attendees',
    'impact.donations': 'Donations Raised',
    'impact.recognition': 'Soroptimist Japan Foundation Student Volunteer Award',
    'impact.humanitarian': 'Humanitarian Aid',
    'impact.humanitarian.desc': 'All proceeds from our concerts are directed through partners like the Rotary Club to provide essential medicine, food, and relief for the people of Ukraine and other affected regions.',
    
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
    'hero.description': '広島出身の若き音楽家たちによるチャリティーコンサートシリーズ。音楽という普遍的な言語を通じて平和を訴え、国境を越えた人道支援を届けています。',
    'hero.cta': '詳しく見る',
    'hero.donate': 'ご支援ください',
    
    // Story Section
    'story.title': '私たちの物語',
    'story.subtitle': '広島から世界へ',
    'story.p1': '2022年3月、広島出身の二人の若き音楽家——平石英心リチャード（ヴァイオリニスト）と岡野純大（ピアニスト）——は、緊迫する情勢を前に「音楽を通じて今できることは何か」という問いから「Let\'s Pray/Play for Ukraine」を立ち上げました。',
    'story.p2': 'ウクライナにルーツを持ち、2021年に現地での音楽留学を経験した英心。そして被爆地・広島で平和の尊さを肌で感じ、育ち、ウクライナで音楽留学も経験した純大。二人は音楽への情熱を「平和への使命」へと変え、これまで日米で20回以上の公演を重ねてきました。',
    'story.p3': '現在、私たちは「Let\'s Pray / Play for Peace」へと活動を広げ、クラシック音楽が持つ変革の力で、より広く世界の調和を訴え続けています。',
    'story.eishin.name': '平石 英心 リチャード',
    'story.eishin.role': 'ヴァイオリニスト / ヴィオリスト',
    'story.eishin.bio': '2007年広島生まれ、ウクライナにルーツを持つ。ドイツ・ハノーファー音楽演劇大学の英才教育機関（VIFF）を経て、現在は米ボール州立大学にてヴァイオリン、ヴィオラ、指揮法などを学んでいる。ソリストとして広島交響楽団や、NHK「いのちのうた」など、テレビ放映を含む主要なコンサートに出演。室内楽奏者としても活動し、ベネフィック室内管弦楽団等と共演している。2025年夏には、カーネギーホールが主催する米国立ユースオーケストラ（NYO-USA）のアジアツアーにヴィオラ首席奏者として参加。ジャナンドレア・ノセダの指揮、レイ・チェン（Vn）との共演で各国を巡った。パリ「Flame」国際コンクールでの優勝（ピアノ）および第2位（ヴァイオリン）ほか、岩谷時子財団 Foundation for Youth 賞など受賞歴多数。',
    'story.jundai.name': '岡野 純大',
    'story.jundai.role': 'ピアニスト',
    'story.jundai.bio': '2005年広島県生まれ。3歳よりピアノを始める。過去にショパン国際ピアノコンクール in Asia アジア大会にて金賞およびコンチェルト賞を受賞。さらに、G7広島サミット関連イベント「UNICEF Lasting Peace Project LIVE」にて歌手AI氏と共演。 ウクライナ支援チャリティーコンサート「Let\'s Pray/Play for Ukraine」を主宰し、日米で20公演以上の演奏活動を行っている。これまでに佐藤恭子、小蔦花結の各氏に師事。務川慧悟氏、ザルツブルク・モーツァルテウム大学（オーストリア）等のマスタークラスに参加。現在、慶應義塾大学環境情報学部2年生。',
    
    // Project 2026
    'project.title': '2026プロジェクト',
    'project.subtitle': '平和への新章',
    'project.description': '2026年のコンサートシリーズでは、クラシック音楽と最先端のデジタルビジュアル、そして紛争地域の子どもたちとのリアルタイム交流を組み合わせた、これまでにない体験を創造します。',
    'project.period': 'TBD',
    'project.locations': '東京・広島（日本）',
    'project.concerts': 'TBD',
    'project.beneficiaries': 'TBD',
    
    // Impact
    'impact.title': '活動実績',
    'impact.subtitle': '音楽を通じて変化をもたらす',
    'impact.concerts': '開催公演数',
    'impact.attendees': '総来場者数',
    'impact.donations': '寄付総額',
    'impact.recognition': '公益財団法人ソロプチミスト日本財団 学生ボランティア賞',
    'impact.humanitarian': '人道支援活動',
    'impact.humanitarian.desc': 'チャリティーコンサートでの収益は、ロータリークラブ等を通じて、ウクライナの人々のための医薬品や食料などの人道支援に役立てられています。',
    
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
    'contact.message': 'コンサートの開催、コラボレーション、寄付に関するお問い合わせは、こちらからお気軽にご連絡ください。',
    
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
