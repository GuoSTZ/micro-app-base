import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import enUS from './locale/en_US.json';
import zhCN from './locale/zh_CN.json';
import commonEnUS from './locale/common/en_US.json';
import commonZhCN from './locale/common/zh_CN.json';

export const resources = {
	'en-US': {
		translation: {...enUS, ...commonEnUS},
	},
	'zh-CN': {
		translation: {...zhCN, ...commonZhCN},
	},
} as const;

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({ // 配置选项：https://www.i18next.com/overview/configuration-options
		resources,
		lng: navigator.language, // 指定语言为浏览器当前语言
		// lng: 'zh-CN', // 指定语言
		fallbackLng: 'zh-CN', // 指定了未匹配任何语言时的默认语言
		preload: ['zh-CN', 'en-US'], // 预加载
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;

const changeLanguage = (value: keyof typeof resources) => {
	i18n.changeLanguage(value);
}

const locale = i18n.t;

export {locale, changeLanguage};
