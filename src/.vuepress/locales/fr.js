const { defaultNavbar } = require('../defaults/navbar');
const { buildSidebar } = require('../utility/sidebarHelper');
const language = 'fr'; // ie. /tr/
const languageUpper = 'FR';
const languageName = 'Français'; // Turkish

const frLocale = {
    [`/${language}/`]: {
        lang: `${language}-${languageUpper}`,
        title: `Documentation | ${languageName}`
    }
};

const sidebar = [
    {
        title: 'Guide',
        collapsable: false,
        children: [
            {
                title: '🚀 Introduction',
                collapsable: false,
                children: buildSidebar(`/${language}/introduction/`)
            },
            {
                title: `♻️ Conversion`,
                collapsable: false,
                children: buildSidebar(`/${language}/conversion/`)
            },
            {
                title: `📄 Guide de l'API`,
                collapsable: false,
                children: buildSidebar(`/${language}/api/`)
            },
            {
                title: `💡 Les évènements`,
                collapsable: false,
                children: buildSidebar(`/${language}/events/`)
            },
            {
                title: `🧍 Joueur`,
                collapsable: false,
                children: buildSidebar(`/${language}/player/`)
            },
            {
                title: `🚙 Vehicule`,
                collapsable: false,
                children: buildSidebar(`/${language}/vehicle/`)
            },
            {
                title: `📊 Bases de données`,
                collapsable: false,
                children: buildSidebar(`/${language}/databases/`)
            },
            {
                title: `📚 Livre de recettes`,
                collapsable: false,
                children: buildSidebar(`/${language}/cookbook/`)
            },
            {
                title: `📖 Tables de données`,
                collapsable: false,
                children: buildSidebar(`/${language}/tables/`)
            }
        ]
    }
];

// change this to first two letters + menus. ie. trMenus
const frMenus = {
    [`/${language}/`]: {
        label: languageName,
        nav: [...defaultNavbar],
        sidebar: {
            collapsable: false,
            [`/${language}/`]: sidebar
        },
        sidebarDepth: 3
    }
};

module.exports = {
    frLocale,
    frMenus
};
