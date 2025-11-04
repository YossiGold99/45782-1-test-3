import { Table, Column, Model, PrimaryKey, DataType, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import Meeting from './Meeting';

@Table({
    tableName: 'development_teams',
    timestamps: true
})
export default class DevelopmentTeam extends Model {
    @PrimaryKey
    @Column({
        type: DataType.CHAR(36),
        allowNull: false,
        comment: 'Team unique identifier (UUID)'
    })
    team_code!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        comment: 'Team name (e.g., "Team UI", "Team Mobile", "Team React")'
    })
    team_name!: string;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        field: 'created_at'
    })
    created_at!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        field: 'updated_at'
    })
    updated_at!: Date;

    @HasMany(() => Meeting, 'team_code')
    meetings!: Meeting[];
}

