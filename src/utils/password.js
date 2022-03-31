const bcryptjs = require('bcryptjs')

async function crypto(pwd){

    const salt = await bcryptjs.genSalt()

    const password = await bcryptjs.hash(pwd, salt)
    
    return password
}

module.exports = {
    crypto,
}