import { create } from 'express-handlebars';

const handlebars = create({
    helpers: {
        bool: (check, val) => {
            return check === true ? val : '';
        },
        times: (n, block) => {
            let accum = '';
            for (let i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        },
        compare: (val1, val2, options) => {
            return (val1 == val2) ? options.fn(this) : options.inverse(this);
        },
    }
});

export default handlebars;