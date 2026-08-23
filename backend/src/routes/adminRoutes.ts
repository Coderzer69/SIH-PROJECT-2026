import { Router } from 'express';
import { 
  getDoctors, 
  verifyDoctor,
  getDashboardStats,
  getPatients,
  getTreatments,
  getHistoryAccessRequests,
  getAuditLogs
} from '../controllers/adminController';
import { authenticate, requireRole } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate, requireRole(['ADMIN']));

router.get('/dashboard-stats', getDashboardStats);
router.get('/doctors', getDoctors);
router.patch('/doctors/:id/verify', verifyDoctor);
router.get('/patients', getPatients);
router.get('/treatments', getTreatments);
router.get('/history-requests', getHistoryAccessRequests);
router.get('/audit-logs', getAuditLogs);

export default router;
