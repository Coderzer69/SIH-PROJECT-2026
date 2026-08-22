import { Router } from 'express';
import { scanPatientQr, requestHistoryAccess, getPatientHistory, createTreatment, editTreatment, draftFromAudio } from '../controllers/doctorController';
import { authenticate, requireRole } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate, requireRole(['DOCTOR']));

router.get('/patient/:qrId', scanPatientQr);
router.post('/access-requests', requestHistoryAccess);
router.get('/patient/:id/history', getPatientHistory);
router.post('/treatment/draft-from-audio', draftFromAudio);
router.post('/treatment', createTreatment);
router.patch('/treatment/:id', editTreatment);

export default router;
