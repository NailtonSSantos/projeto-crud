const CustomersModel = require('../models/customers')
const { crypto } = require('../utils/password')

const defaultTitle = 'Cadastro de Clientes'

function index(req, res){
    res.render('register', {
        title: 'Cadastro de Clientes'
    })
}

async function add(req, res){
    const{
        name: name, //Nome igual não precisava repetir
        age: age,
        email: email,
        password: password,
    } = req.body

    const passwordCrypto = await crypto(password)

    const register = new CustomersModel({
        name,  //Se o nome for igual não precisa repetir
        age,
        email,
        password: passwordCrypto,
    })

    register.save()

    res.render('register', {
        title: defaultTitle,
        message: 'Cadastro realizado com Sucesso!'
    })
}

async function list(req, res){
    const users = await CustomersModel.find()

    res.render('list', {
        defaultTitle,
        users,
    })
}

async function formEdit(req, res){
    const { id } = req.query

    const user = await CustomersModel.findById(id)

    res.render('edit', {
        title: 'Editar Usuário',
        user,
    })
}

async function edit(req, res){
    const{
        name,
        age,
        email,
    } = req.body

    const { id } = req.params

    const user = await CustomersModel.findById(id)

    user.name = name
    user.age = age
    user.email = email

    user.save()

    res.render('edit', {
        title: 'Editar Usuário',
        user,
        message: 'Usuário alterado com Sucesso!'
    })
}

async function remove(req, res){
    const { id } = req.params

    const remove = await CustomersModel.deleteOne({ _id: id})

    if (remove.ok){
       res.redirect('/list')
    }
}

module.exports = {
    index,
    add,
    list,
    formEdit,
    edit,
    remove,
}