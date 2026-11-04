import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('portfolio_lang') || 'fr'
  })

  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang)
    document.documentElement.lang = lang
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl'
      document.body.classList.add('font-arabic')
    } else {
      document.documentElement.dir = 'ltr'
      document.body.classList.remove('font-arabic')
    }
  }, [lang])

  const t = translations[lang] || translations.fr

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
