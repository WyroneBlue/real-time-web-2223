export const index = async (req, res) => {

    const page = {
        title: "Orders"
    };

    res.status(200).render('kitchen', {
        page,
    });
};

export const order = async (req, res) => {

    const orderNumber = 3659;
    const page = {
        title: `Order: ${orderNumber}`
    };

    res.status(200).render('kitchen/details', {
        page,
        orderNumber
    });
};