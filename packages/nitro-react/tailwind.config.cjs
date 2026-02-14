const lightenHexColor = (hex, percent) => {
    // Remove the hash symbol if present
    hex = hex.replace(/^#/, '');

    // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Adjust RGB values
    r = Math.round(Math.min(255, r + 255 * percent));
    g = Math.round(Math.min(255, g + 255 * percent));
    b = Math.round(Math.min(255, b + 255 * percent));

    // Convert RGB back to hex
    const result = ((r << 16) | (g << 8) | b).toString(16);

    // Make sure result has 6 digits
    return '#' + result.padStart(6, '0');
};

const darkenHexColor = (hex, percent) => {
    // Remove the hash symbol if present
    hex = hex.replace(/^#/, '');

    // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate the darkened RGB values
    r = Math.round(Math.max(0, r - 255 * percent));
    g = Math.round(Math.max(0, g - 255 * percent));
    b = Math.round(Math.max(0, b - 255 * percent));

    // Convert RGB back to hex
    const result = ((r << 16) | (g << 8) | b).toString(16);

    // Make sure result has 6 digits
    return '#' + result.padStart(6, '0');
};

const generateShades = colors => {
    for (const color in colors) {
        const hex = colors[color];
        const extended = {};
        const shades = [50, 100, 200, 300, 400, 500, 600, 700, 900, 950];

        for (let i = 0; i < shades.length; i++) {
            const shade = shades[i];
            extended[shade] = lightenHexColor(hex, shades[shades.length - 1 - i] / 950);
            extended[-shade] = darkenHexColor(hex, shades[shades.length - 1 - i] / 950);
        }

        colors[color] = {
            DEFAULT: hex,
            ...extended,
        };
    }

    return colors;
};

const colors = {
    toolbar: '#1C1C20',
    'card-header': '#1E7295',
    'card-close': '#921911',
    'card-tabs': '#185D79',
    'card-border': '#283F5D',
    'card-tab-item': '#B6BEC5',
    'card-tab-item-active': '#DFDFDF',
    'card-content-area': '#DFDFDF',

    'card-grid-item': '#CDD3D9',
    'card-grid-item-border': '#95A7BB',
    'card-grid-item-active': '#ECECEC',
    'card-grid-item-active-border': '#FFFFFF',

    loading: '#393A85',
    //muted: 'rgba(182, 190, 197)',
    blue: '#0d6efd',
    indigo: '#6610f2',
    pink: '#d63384',
    red: '#a81a12',
    orange: '#fd7e14',
    yellow: '#ffc107',
    green: '#00800b',
    teal: '#20c997',
    cyan: '#0dcaf0',
    gray: '#6c757d',
    'gray-dark': '#343a40',
    'gray-100': '#f8f9fa',
    'gray-200': '#e9ecef',
    'gray-300': '#dee2e6',
    'gray-400': '#ced4da',
    'gray-500': '#adb5bd',
    'gray-600': '#6c757d',
    'gray-700': '#495057',
    'gray-800': '#343a40',
    'gray-900': '#212529',
    primary: '#1E7295',
    secondary: '#185D79',
    success: '#00800b',
    info: '#0dcaf0',
    warning: '#ffc107',
    danger: '#a81a12',
    light: '#DFDFDF',
    dark: 'rgba(28, 28, 32, .9803921569)',
    'light-dark': '#343a40',
    white: '#fff',
    black: '#000',
    muted: '#B6BEC5',
    purple: '#6f42c1',
    gainsboro: '#d9d9d9',
};

const boxShadow = {
    inner1px: 'inset 0 0 0 1px rgba(255,255,255,.3)',
    'room-previewer': '-2px -2px rgba(0, 0, 0, 0.4), inset 3px 3px rgba(0, 0, 0, 0.2);',
};

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
            colors: generateShades(colors),
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
