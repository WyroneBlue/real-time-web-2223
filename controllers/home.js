export const index = async(req, res) => {

    const page = {
        title: "Home"
    };

    const items = [
        {
            name: "Pizza",
            price: 10,
        },
        {
            name: "Burger",
            price: 5,
        },
        {
            name: "Hot Dog",
            price: 3,
        },
        {
            name: "Fries",
            price: 2,
        },
    ];

    const food = items.map(item => {
        return {
            ...item,
            slug: item.name.toLowerCase().replace(/ /g, "-"),
        };
    });

    res.status(200).render('home', {
        page,
        food,
    });
};