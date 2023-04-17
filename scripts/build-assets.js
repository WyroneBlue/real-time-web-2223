import { buildJS } from './helper.js';

const RESOURCE_BASE = './resources';
const PUBLIC_BASE = './public';

const PUBLIC_ASSETS = [
    'fonts',
    'icons',
    'images',
];

(function() {
    PUBLIC_ASSETS.forEach((asset) => {
        buildJS([`${RESOURCE_BASE}/${asset}/*.*` ], `${PUBLIC_BASE}/${asset}`, '.*');
    });

})

