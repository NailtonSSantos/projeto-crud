const CustomersModel = require('../models/customers')
const { crypto } = require('../utils/password')

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

    res.send('Cadastro realizado')
}

async function listUsers(req, res){
    const users = await CustomersModel.find()

    res.render('listUsers', {
        title: 'Listagem de Usuários',
        users: []
    })
}

module.exports = {
    index,
    add,
    listUsers,
}