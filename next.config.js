module.exports = {
    reactStrictMode: true,
    i18n: {
        locales: ['en-US', 'ru-RU'],
        defaultLocale: 'en-US', //  when visiting a non-locale prefixed path
        localeDetection: false,
    }
}

// 2 strategies:

// 1. Sub-path Routing - puts the locale in the url path.
// If you have a pages/blog.js the following urls would be available:
// /blog   (The default locale does not have a prefix)
// /ua-ua/blog

// 2. Domain Routing.