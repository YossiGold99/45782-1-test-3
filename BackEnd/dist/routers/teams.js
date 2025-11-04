"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teams_controller_1 = require("../controllers/teams.controller");
const router = (0, express_1.Router)();
router.get('/', teams_controller_1.TeamsController.getAllTeams);
router.get('/:teamCode/meetings', teams_controller_1.MeetingsController.getMeetingsByTeam);
exports.default = router;
