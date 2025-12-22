const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
  try {
    // Vérification de l'en-tête d'autorisation
    const authHeader = req.headers.authorization;
    console.log('🚀 ~ authAdmin ~ authHeader:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token manquant ou mal formaté' });
    }
    // Extraction du token (après "Bearer ")
    const token = authHeader.split(' ')[1];
    // Vérification du token JWT
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_ADMIN_LOGIN);
    console.log('🚀 ~ authAdmin ~ decoded:', decoded);
    // Assigner les informations décodées à la requête
    req.admin = decoded;
    // Poursuivre vers le middleware suivant
    next();
  } catch (error) {
    console.error('🚀 ~ authAdmin ~ error:', error);
    // Gérer différents types d'erreurs JWT
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expiré' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token invalide' });
    }
    return res.status(401).json({ message: "Erreur d'authentification" });
  }
};

module.exports = { authAdmin };
