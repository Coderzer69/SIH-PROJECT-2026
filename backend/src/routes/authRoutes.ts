import { Router } from 'express';
import { register, login, oauthLogin } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/oauth-login', oauthLogin);

export default router;
