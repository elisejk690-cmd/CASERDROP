import { useAuth } from './useAuth';
import { t, Language } from '../i18n/translations';

export function useTranslation() {
  const { currentUser } = useAuth();
  const language = (currentUser?.language || 'en') as Language;

  return {
    t: (key: string) => t(key, language),
    language,
  };
}
