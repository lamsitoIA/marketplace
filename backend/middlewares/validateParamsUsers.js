//validacion con typeof si es string o no
export const validateParamsUsers = (req, res, next) => {
    const { user } = req.body;

    // Valida que user sea un objeto
    if (!user || typeof user !== 'object') {
        return res.status(400).json({ error: "Invalid user data" });
    }

    // Valida que todos los campos requeridos estén presentes y sean cadenas no vacías
    if (!user.name || typeof user.name !== 'string' ||
        !user.rut || typeof user.rut !== 'string' ||
        !user.email || typeof user.email !== 'string' ||
        !user.password || typeof user.password !== 'string' ||
        !user.address || typeof user.address !== 'string' ||
        !user.url_icons || typeof user.url_icons !== 'string') {
        return res.status(400).json({ error: "Invalid user data format" });
    }

    next();
}

//validacion normal
/* export const validateParamsUsers = (req,res,next) => {
    const {user} = req.body
    if(!user.name || !user.rut || !user.email || !user.password || !user.address || !user.url_icons){
        return res.status(400).json({error: `All fields are required: name, path, email, password, address and icon URL.`})
    }
    next()
}
 */

