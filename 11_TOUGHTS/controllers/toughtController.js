const Tought = require('../models/Tought');
const User = require('../models/User');

const { Op } = require('sequelize');

module.exports = class ToughtController {
    static async showToughts(req, res) {

        let search = ''

        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%` },
            },
            order: [['createdAt', order]],
        });

        const toughts = toughtsData.map((result) => result.get({ plain: true }));

        let toughtsQty = toughts.length;

        if (toughtsQty === 0) {
            toughtsQty = false;
        }

        res.render('toughts/home', { toughts, search, toughtsQty });
    }

    // static async dashboard(req, res) {

    //     const userId = req.session.userid;

    //     const user = await User.findOne({
    //         where: {
    //             id: userId,
    //         },
    //         include: Tought,
    //         plain: true,
    //     });

    //     if(!user) {
    //         res.redirect('/login');
    //     }

    //     console.log(user.Toughts);

    //     res.render('toughts/dashboard');
    // }

    static async dashboard(req, res) {
        console.log("Sessão UserID:", req.session.userid);

        if (!req.session.userid) {
            req.flash("message", "Você precisa estar logado para acessar o dashboard!");
            return res.redirect("/login");
        }

        try {
            const userId = req.session.userid;

            const user = await User.findOne({
                where: { id: userId },
                include: Tought,
                order: [["createdAt", "DESC"]],
            });

            if (!user) {
                req.flash("message", "Usuário não encontrado!");
                return res.redirect("/login");
            }

            const toughts = user.Toughts.map((t) => t.dataValues);

            let emptyToughts = false;

            if (toughts.length === 0) {
                emptyToughts = true;
            }

            res.render("toughts/dashboard", { toughts, emptyToughts });
        } catch (error) {
            console.error("Erro ao carregar o dashboard:", error);
            req.flash("message", "Erro ao carregar seus pensamentos.");
            res.redirect("/");
        }
    }


    static createTought(req, res) {
        res.render('toughts/create');
    }

    // static async createToughtSave(req, res) {

    //     console.log("Sessão UserID:", req.session.userid);

    //     const tought = {
    //         title: req.body.title,
    //         userId: req.session.userid,
    //     };

    //     try {
    //         await Tought.create(tought);

    //         req.flash('message', 'Pensamento criado com sucesso!');

    //         req.session.save(() => {
    //             res.redirect('/toughts/dashboard');
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    static async createToughtSave(req, res) {
        console.log("Sessão UserID:", req.session.userid);

        if (!req.session.userid) {
            req.flash("message", "Você precisa estar logado para criar um pensamento!");
            return res.redirect("/login");
        }

        if (!req.body.title || req.body.title.trim() === "") {
            req.flash("message", "O pensamento não pode estar vazio!");
            return res.redirect("/toughts/dashboard");
        }

        const tought = {
            title: req.body.title.trim(),
            UserId: req.session.userid,
        };

        try {
            await Tought.create(tought);
            req.flash("message", "Pensamento criado com sucesso!");
            req.session.save(() => {
                res.redirect("/toughts/dashboard");
            });
        } catch (error) {
            console.error("Erro ao criar pensamento:", error);
            req.flash("message", "Erro ao criar pensamento. Tente novamente.");
            res.redirect("/toughts/dashboard");
        }
    }

    static async removeTought(req, res) {

        const id = req.body.id;
        const UserId = req.session.userid;



        try {
            await Tought.destroy({ where: { id: id, UserId: UserId } });

            req.flash('message', 'Pensamento removido com sucesso!');

            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            });
        } catch (error) {
            console.log(error);
        }
    }

    // static async updateTought(req, res) {

    //     const id = req.params.id;

    //     const tought = Tought.findOne({ where: { id: id }, raw: true });

    //     res.render('toughts/edit', { tought });
    // }

    static async updateTought(req, res) {
        try {
            const id = req.params.id;
    
            const tought = await Tought.findOne({ where: { id: id } });
    
            if (!tought) {
                req.flash("message", "Pensamento não encontrado!");
                return res.redirect("/toughts/dashboard");
            }
    
            res.render("toughts/edit", { tought: tought.dataValues });
        } catch (error) {
            console.error("Erro ao carregar a edição:", error);
            req.flash("message", "Erro ao carregar o pensamento para edição.");
            res.redirect("/toughts/dashboard");
        }
    }

    static async updateToughtSave(req, res) {
        const id = req.body.id; 
    
        const tought = {
            title: req.body.title,
        };
    
        try {
            await Tought.update(tought, { where: { id: id } });
    
            req.flash("message", "Pensamento atualizado com sucesso!");
    
            req.session.save(() => {
                res.redirect("/toughts/dashboard");
            });
        } catch (error) {
            console.error("Erro ao atualizar o pensamento:", error);
            req.flash("message", "Erro ao atualizar o pensamento.");
            res.redirect("/toughts/dashboard");
        }
    }

}

