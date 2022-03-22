const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()



mongoose.connect()




//definindo o template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//definindo os arquivos públicos
app.use(express.static(path.join(__dirname, 'public')))

//habilita server para receber dados via post (formulário)
app.use(express.urlencoded({ extended: true }))

//rotas
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Titulo Teste'
    })
})

//404 error (not found)
app.use((req, res) => { //Middleware
    res.send('Página não encontrada')
})

//Executando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))