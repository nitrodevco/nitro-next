const colors = {};

const boxShadow = {};

/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            fontSize: {
                base: '0.9rem',
                sm: '0.7875rem',
                xl: '1.25rem',
                '2xl': '1.563rem',
                '3xl': '1.953rem',
                '4xl': '2.441rem',
                '5xl': '3.052rem',
            },
            fontFamily: {
                sans: ['Ubuntu'],
            },
            colors: colors,
            boxShadow,
            backgroundImage: {
                'button-gradient-gray': 'linear-gradient(to bottom, #e2e2e2 50%, #c8c8c8 50%)',
                'button-gradient-yellow': 'linear-gradient(to bottom, #fff176 50%, #fbc02d 50%)',
                'button-gradient-red': 'linear-gradient(to bottom, #ff8a80 50%, #d32f2f 50%)',
                'rarity-level': 'url("/assets/images/infostand/rarity-level.png")',
            },
            spacing: {
                'card-header': '33px',
                'card-tabs': '33px',
                'navigator-w': '420px',
                'navigator-h': '440px',
                'inventory-w': '528px',
                'inventory-h': '320px',
                'catalog-w': '630px',
                'catalog-h': '401px',
            },
            borderRadius: {
                3: '0.3rem',
            },
            zIndex: {
                toolbar: '',
                loading: '100',
                chat: '20',
            },
            dropShadow: {
                hover: '2px 2px 0 rgba(0,0,0,0.8)',
            },
        },
    },
    safelist: [
        'grid-cols-1',
        'grid-cols-2',
        'grid-cols-3',
        'grid-cols-4',
        'grid-cols-5',
        'grid-cols-6',
        'grid-cols-7',
        'grid-cols-8',
        'grid-cols-9',
        'grid-cols-10',
        'grid-cols-11',
        'grid-cols-12',
        'col-span-1',
        'col-span-2',
        'col-span-3',
        'col-span-4',
        'col-span-5',
        'col-span-6',
        'col-span-7',
        'col-span-8',
        'col-span-9',
        'col-span-10',
        'col-span-11',
        'col-span-12',
        'grid-rows-1',
        'grid-rows-2',
        'grid-rows-3',
        'grid-rows-4',
        'grid-rows-5',
        'grid-rows-6',
        'grid-rows-7',
        'grid-rows-8',
        'grid-rows-9',
        'grid-rows-10',
        'grid-rows-11',
        'grid-rows-12',
        'justify-end',
        'items-end',
    ],
    darkMode: 'class',
    variants: {
        extend: {
            divideColor: ['group-hover'],
            backgroundColor: ['group-focus'],
        },
    },
    plugins: {
        '@tailwindcss/forms': {},
    },
    content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}', './themes/**/*.{html,js,jsx,ts,tsx}'],
};
