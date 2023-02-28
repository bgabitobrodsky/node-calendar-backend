const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async( req, res = response ) => {

    const { email, password } = req.body;
    
    try {
        
        let user = await User.findOne({ email });
        
        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'Email ya registrado'
            });
        }
        
        user = new User( req.body );

        // encriptrar pass
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save(); 

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const loginUser = async( req, res = response ) => {

    const { email, password } = req.body;
    
    try {

        const user = await User.findOne({ email });
        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'Email incorrecto'
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
        })


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
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