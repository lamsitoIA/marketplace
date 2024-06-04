//validacion con la libreria validator
import validator from 'validator';
export const validparameters = (req, res, next) => {
    const { user } = req.body;

    // Valida que user sea un objeto y que email y password sean cadenas no vacías
    if (!user || !validator.isEmail(user.email) || !validator.isLength(user.password, { min: 2 })) {
        return res.status(400).json({ error: "None of the Fields can be empty" });
    }
    next();
}







//validacion normal
/* const validparameters = ( req, res, next) =>{
    const { user } = req.body;
    if(!user.email || !user.password){
        return res.status(400).json({error: "Missing email or password"});
    }
    next();
}

export { validparameters }; */

