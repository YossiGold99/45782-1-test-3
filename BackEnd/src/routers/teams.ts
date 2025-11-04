import { Router } from 'express';
import { TeamsController, MeetingsController } from '../controllers/teams.controller';

const router = Router();

router.get('/', TeamsController.getAllTeams);

router.get('/:teamCode/meetings', MeetingsController.getMeetingsByTeam);

export default router;

