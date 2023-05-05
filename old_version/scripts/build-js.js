import { buildJS } from './helper.js';

const RESOURCE_BASE = './resources/js';
const PUBLIC_BASE = './public/js';

const FILES_NAMES = [
    'app.js',
    'order-list.js',
    'order-form.js'
];

(function () {

    buildJS(FILES_NAMES.map(fileName => `${RESOURCE_BASE}/${fileName}`), PUBLIC_BASE, '.js');
}());


