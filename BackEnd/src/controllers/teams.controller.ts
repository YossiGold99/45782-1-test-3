import { Request, Response } from 'express';
import DevelopmentTeam from '../models/DevelopmentTeam';
import Meeting from '../models/Meeting';
import { v4 as uuidv4 } from 'uuid';

export class TeamsController {
    static async getAllTeams(req: Request, res: Response) {
        try {
            const teams = await DevelopmentTeam.findAll({
                order: [['team_name', 'ASC']]
            });
            res.json(teams);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export class MeetingsController {
    static async getMeetingsByTeam(req: Request, res: Response) {
        try {
            const { teamCode } = req.params;

            const team = await DevelopmentTeam.findByPk(teamCode);
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }

            const meetings = await Meeting.findAll({
                where: { team_code: teamCode },
                include: [{
                    model: DevelopmentTeam,
                    attributes: ['team_code', 'team_name']
                }],
                order: [['start_datetime', 'ASC']]
            });

            res.json(meetings);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createMeeting(req: Request, res: Response) {
        try {
            const { team_code, start_datetime, end_datetime, description, room_name } = req.body;

            if (!team_code || !start_datetime || !end_datetime || !room_name) {
                return res.status(400).json({ 
                    error: 'Missing required fields: team_code, start_datetime, end_datetime, room_name' 
                });
            }

            const team = await DevelopmentTeam.findByPk(team_code);
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }

            const startDate = new Date(start_datetime);
            const endDate = new Date(end_datetime);
            if (endDate <= startDate) {
                return res.status(400).json({ 
                    error: 'End datetime must be after start datetime' 
                });
            }

            const meeting_code = uuidv4();

            const meeting = await Meeting.create({
                meeting_code,
                team_code,
                start_datetime: startDate,
                end_datetime: endDate,
                description: description || null,
                room_name
            });

            res.status(201).json(meeting);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

