"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingsController = exports.TeamsController = void 0;
const tslib_1 = require("tslib");
const DevelopmentTeam_1 = tslib_1.__importDefault(require("../models/DevelopmentTeam"));
const Meeting_1 = tslib_1.__importDefault(require("../models/Meeting"));
const uuid_1 = require("uuid");
class TeamsController {
    static async getAllTeams(req, res) {
        try {
            const teams = await DevelopmentTeam_1.default.findAll({
                order: [['team_name', 'ASC']]
            });
            res.json(teams);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.TeamsController = TeamsController;
class MeetingsController {
    static async getMeetingsByTeam(req, res) {
        try {
            const { teamCode } = req.params;
            const team = await DevelopmentTeam_1.default.findByPk(teamCode);
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
            const meetings = await Meeting_1.default.findAll({
                where: { team_code: teamCode },
                include: [{
                        model: DevelopmentTeam_1.default,
                        attributes: ['team_code', 'team_name']
                    }],
                order: [['start_datetime', 'ASC']]
            });
            res.json(meetings);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async createMeeting(req, res) {
        try {
            const { team_code, start_datetime, end_datetime, description, room_name } = req.body;
            if (!team_code || !start_datetime || !end_datetime || !room_name) {
                return res.status(400).json({
                    error: 'Missing required fields: team_code, start_datetime, end_datetime, room_name'
                });
            }
            const team = await DevelopmentTeam_1.default.findByPk(team_code);
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
            const meeting_code = (0, uuid_1.v4)();
            const meeting = await Meeting_1.default.create({
                meeting_code,
                team_code,
                start_datetime: startDate,
                end_datetime: endDate,
                description: description || null,
                room_name
            });
            res.status(201).json(meeting);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.MeetingsController = MeetingsController;
