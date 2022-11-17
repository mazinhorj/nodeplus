const { raw } = require('express')
const Pensamento = require('../models/Pensamento')
const User = require('../models/User')

module.exports = class PensamentoController {
    static async showPensamentos(req, res) {
        const pensamentosData = await Pensamento.findAll({
            include: User,
        })
        const pensamentos = pensamentosData.map((result) => result.get({plain: true}))
        console.log(pensamentos)
        res.render('pensamentos/home', {pensamentos})
    }

    static async dashboard(req, res) {
        const UserId = req.session.userid
        const user = await User.findOne({
            where: {
                id: UserId,
            },
            include: Pensamento,
            plain: true,
        })
        if (!user) {
            res.redirect('/login')
        }

        const pensamentos = user.Pensamentos.map((result) => result.dataValues)
        console.log(pensamentos)
        res.render('pensamentos/dashboard', {pensamentos})
    }

    static createPensamento(req, res) {
        res.render('pensamentos/create')
    }

    static async createPensamentoSave(req, res) {
        const pesamento = {
            titulo: req.body.titulo,
            UserId: req.session.userid
        }

        try {
            await Pensamento.create(pesamento)
            req.flash('message', "Pensamento criado com sucesso!")
            req.session.save(() => {
                res.redirect('/pensamentos/dashboard')
            })
        } catch (error) {
            console.log('Algo deu errado: ' + error)
        }
    }

    static async updatePensamento(req, res){
        const id = req.params.id
        const pensamento = await Pensamento.findOne({where: {id: id}, raw: true})
        res.render('pensamentos/edit', {pensamento})
    }

    static async updatePensamentoSave(req, res){
        const id = req.body.id
        const pensamento = {
            titulo: req.body.titulo
        }
        try {
            await Pensamento.update(pensamento, {where: {id: id}})
            req.flash('message', "Pensamento atualizado com sucesso!")
            req.session.save(() => {
                res.redirect('/pensamentos/dashboard')
            })
        } catch (error) {
            console.log('Algo deu errado: ' + error)
        }
        
    }

    static async removePensamento(req, res) {
        const id = req.body.id
        const UserId = req.session.userid
        try {
            await Pensamento.destroy({where: {id: id, UserId: UserId}})
            req.flash('message', "Pensamento excluído!")
            req.session.save(() => {
                res.redirect('/pensamentos/dashboard')
            })
        } catch (error) {
            console.log('Algo deu errado: ' + error)
        }
    }
}