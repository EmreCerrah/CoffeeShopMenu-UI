// langConfig.ts

// Dil kodlarını literal type olarak tanımlama
export type SupportedLanguages = 'tr' | 'en';
export type LanguageCode = SupportedLanguages;

// Language config için daha spesifik tipler
export interface LanguageConfig {
  readonly code: LanguageCode;
  readonly label: string;
  readonly href: `/${LanguageCode}`; // Template literal type ile path formatını garantileme
  readonly title: string;
  readonly productLabel: string;
  readonly priceLabel: string;
  readonly backToMain: string;
  readonly backToMenu: string;
}

// Type-safe language map oluşturma
const languageMap: Readonly<Record<SupportedLanguages, LanguageConfig>> = {
  tr: {
    code: 'tr',
    label: 'Türkçe',
    href: '/tr',
    title: 'Menü',
    productLabel: 'Ürün',
    priceLabel: 'Fiyat',
    backToMain: 'Ana Sayfaya Dön',
    backToMenu: 'Menüye Dön',
  },
  en: {
    code: 'en',
    label: 'English',
    href: '/en',
    title: 'Menu',
    productLabel: 'Product',
    priceLabel: 'Price',
    backToMain: 'Back to Main Page',
    backToMenu: 'Back to Menu',
  },
} as const; // Object'i readonly yapar ve literal types'ları korur

// Dil konfigürasyonlarını döndüren fonksiyon
export const getLanguageConfigAll = (): readonly LanguageConfig[] =>
    Object.values(languageMap);

// Belirli bir dilin konfigürasyonunu döndüren fonksiyon
export const getLanguageConfig = (lang: SupportedLanguages): LanguageConfig =>
    languageMap[lang];

// Default dili döndüren yardımcı fonksiyon
export const getDefaultLanguage = (): LanguageCode => 'en';
