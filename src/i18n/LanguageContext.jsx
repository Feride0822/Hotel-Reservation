import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('stayease_language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('stayease_language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value;
  };

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    } else {
      console.error(`Language "${newLanguage}" is not supported`);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
      { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    ],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
