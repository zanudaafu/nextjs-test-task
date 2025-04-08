import { getRequestConfig } from 'next-intl/server';
// import { cookies, headers } from 'next/headers';

export interface Locale {
    localeName: string
    localeTitle: String
}

export const SUPPORTED_LOCALES: Locale[] = [
    { localeName: 'en', localeTitle: "GB English" },
    { localeName: 'uk', localeTitle: "UA Українська" }
];
export const defaultLocale: Locale = { localeName: 'en', localeTitle: "GB English" };

export default getRequestConfig(async () => {
    let locale = 'en';

    if (typeof window === 'undefined') {
        const { cookies, headers } = await import('next/headers');
    
        const cookieStore = await cookies();
        const fromCookie = cookieStore.get('locale')?.value;
    
        if (fromCookie && SUPPORTED_LOCALES.find(l => l.localeName === fromCookie)) {
          locale = fromCookie;
        } else {
          const acceptLang = (await headers()).get('accept-language');
          const detected = acceptLang?.split(',')?.[0]?.split('-')?.[0];
          if (detected && SUPPORTED_LOCALES.find(l => l.localeName === detected)) {
            locale = detected;
          }
        }
      }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});