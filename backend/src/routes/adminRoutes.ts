import { Router } from 'express';
import { getDoctors, verifyDoctor } from '../controllers/adminController';
import { authenticate, requireRole } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate, requireRole(['ADMIN']));

router.get('/doctors', getDoctors);
router.patch('/doctors/:id/verify', verifyDoctor);

export default router;
