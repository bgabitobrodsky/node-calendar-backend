const { response } = require('express')

const createUser = ( req, res = response ) => {

    const { name, email, password } = req.body;

    if( name.length < 5 ){
        return res.status(400).json({
            ok:false,
            msg:'el name debe tener mas de 5 letras'
        })
    }

    return res.status(200).json({
        ok: true,
        msg: 'register'
    })
}

const loginUser = ( req, res = response ) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login'
    })
}

const renewToken = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}