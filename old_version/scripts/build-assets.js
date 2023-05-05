import { buildJS } from './helper.js';

const RESOURCE_BASE = './resources/assets';
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

    buildJS([`${RESOURCE_BASE}/manifest.json`], `${PUBLIC_BASE}/`, '.json');
}());
