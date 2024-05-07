/* import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

// Configuración de express-jwt para validar tokens JWT con Auth0
const authConfig = {
  domain: 'dev-iw8elxagxdwxybue.us.auth0.com', // Reemplaza con tu dominio de Auth0
  audience: 'tuAudience', // Reemplaza con tu audiencia de Auth0
};

// Middleware para validar tokens JWT con Auth0
export const checkJwt = jwt({
  // Obtener la clave pública de Auth0 para verificar la firma del token
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  // Valida el token de acceso y lo decodifica
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
});

// Verifica si el usuario está autenticado y tiene los permisos necesarios
export const checkAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No estás autenticado' });
  }
  // Aquí puedes agregar lógica adicional para verificar roles y permisos si es necesario
  next();
}; */