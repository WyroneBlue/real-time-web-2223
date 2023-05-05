import { allFood } from './MenuItems.js';

export const index = async(req, res) => {

    const page = {
        title: "Home"
    };

    const food = await allFood();

    res.status(200).render('home', {
        page,
        food
    });
};