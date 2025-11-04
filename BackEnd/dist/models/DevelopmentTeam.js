"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Meeting_1 = tslib_1.__importDefault(require("./Meeting"));
let DevelopmentTeam = class DevelopmentTeam extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(36),
        allowNull: false,
        comment: 'Team unique identifier (UUID)'
    }),
    tslib_1.__metadata("design:type", String)
], DevelopmentTeam.prototype, "team_code", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
        comment: 'Team name (e.g., "Team UI", "Team Mobile", "Team React")'
    }),
    tslib_1.__metadata("design:type", String)
], DevelopmentTeam.prototype, "team_name", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'created_at'
    }),
    tslib_1.__metadata("design:type", Date)
], DevelopmentTeam.prototype, "created_at", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'updated_at'
    }),
    tslib_1.__metadata("design:type", Date)
], DevelopmentTeam.prototype, "updated_at", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Meeting_1.default, 'team_code'),
    tslib_1.__metadata("design:type", Array)
], DevelopmentTeam.prototype, "meetings", void 0);
DevelopmentTeam = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'development_teams',
        timestamps: true
    })
], DevelopmentTeam);
exports.default = DevelopmentTeam;
