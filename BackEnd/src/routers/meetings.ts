import { Router } from 'express';
import { MeetingsController } from '../controllers/teams.controller';

const router = Router();

router.post('/', MeetingsController.createMeeting);

export default router;

