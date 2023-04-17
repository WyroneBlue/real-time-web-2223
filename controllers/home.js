export const index = async(req, res) => {

    const page = {
        title: "Home"
    };

    res.status(200).render('home', {
        page,
    });
};