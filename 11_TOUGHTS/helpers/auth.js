module.exports.checkAuth = function (req, res, next) {
    const userId = req.session.userid;

    console.log(userId);

    if (!userId) {
        return res.redirect('/login');
    }

    next(); 
};