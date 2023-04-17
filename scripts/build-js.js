import { buildJS } from './helper.js';

const RESOURCE_BASE = './resources/js';
const PUBLIC_BASE = './public/js';

(function () {

    buildJS([`${RESOURCE_BASE}/app.js`], PUBLIC_BASE, '.js');
}());


