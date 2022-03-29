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

async function listUsers(req, res){
    const users = await CustomersModel.find()

    res.render('listUsers', {
        defaultTitle,
        users,
    })
}

module.exports = {
    index,
    add,
    listUsers,
}