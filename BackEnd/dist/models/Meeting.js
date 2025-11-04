"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const DevelopmentTeam_1 = tslib_1.__importDefault(require("./DevelopmentTeam"));
let Meeting = class Meeting extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        allowNull: false,
        comment: 'Meeting unique identifier (UUID)'
    }),
    tslib_1.__metadata("design:type", String)
], Meeting.prototype, "meeting_code", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => DevelopmentTeam_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        allowNull: false,
        field: 'team_code',
        comment: 'Foreign key to development_teams table'
    }),
    tslib_1.__metadata("design:type", String)
], Meeting.prototype, "team_code", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        field: 'start_datetime',
        comment: 'Meeting start date and time'
    }),
    tslib_1.__metadata("design:type", Date)
], Meeting.prototype, "start_datetime", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        field: 'end_datetime',
        comment: 'Meeting end date and time'
    }),
    tslib_1.__metadata("design:type", Date)
], Meeting.prototype, "end_datetime", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Meeting description'
    }),
    tslib_1.__metadata("design:type", String)
], Meeting.prototype, "description", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        field: 'room_name',
        comment: 'Meeting room name (e.g., "Blue Room", "New York Room", "Large Board Room")'
    }),
    tslib_1.__metadata("design:type", String)
], Meeting.prototype, "room_name", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at'
    }),
    tslib_1.__metadata("design:type", Date)
], Meeting.prototype, "created_at", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at'
    }),
    tslib_1.__metadata("design:type", Date)
], Meeting.prototype, "updated_at", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => DevelopmentTeam_1.default, 'team_code'),
    tslib_1.__metadata("design:type", DevelopmentTeam_1.default)
], Meeting.prototype, "team", void 0);
Meeting = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'meetings',
        timestamps: true
    })
], Meeting);
exports.default = Meeting;
