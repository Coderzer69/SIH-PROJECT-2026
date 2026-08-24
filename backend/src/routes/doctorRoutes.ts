import { Router } from 'express';
import { scanPatientQr, requestHistoryAccess, getPatientHistory, createTreatment, editTreatment, draftFromAudio, getPatients, getAccessRequests, submitVerification } from '../controllers/doctorController';
import { authenticate, requireRole } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

router.use(authenticate, requireRole(['DOCTOR']));

router.get('/patients', getPatients);
router.get('/access-requests', getAccessRequests);
router.get('/patient/:qrId', scanPatientQr);
router.post('/access-requests', requestHistoryAccess);
router.get('/patient/:id/history', getPatientHistory);
router.post('/treatment/draft-from-audio', draftFromAudio);
router.post('/treatment', createTreatment);
router.patch('/treatment/:id', editTreatment);
router.post('/verify', upload.fields([
  { name: 'licenseDocument', maxCount: 1 },
  { name: 'qualificationDocument', maxCount: 1 }
]), submitVerification);

export default router;
