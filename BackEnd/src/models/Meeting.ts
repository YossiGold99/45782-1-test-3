import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import DevelopmentTeam from './DevelopmentTeam';

@Table({
    tableName: 'meetings',
    timestamps: true
})
export default class Meeting extends Model {
    @PrimaryKey
    @Column({
        type: DataType.CHAR(36),
        allowNull: false,
        comment: 'Meeting unique identifier (UUID)'
    })
    meeting_code!: string;

    @ForeignKey(() => DevelopmentTeam)
    @Column({
        type: DataType.CHAR(36),
        allowNull: false,
        field: 'team_code',
        comment: 'Foreign key to development_teams table'
    })
    team_code!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'start_datetime',
        comment: 'Meeting start date and time'
    })
    start_datetime!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'end_datetime',
        comment: 'Meeting end date and time'
    })
    end_datetime!: Date;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        comment: 'Meeting description'
    })
    description!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        field: 'room_name',
        comment: 'Meeting room name (e.g., "Blue Room", "New York Room", "Large Board Room")'
    })
    room_name!: string;

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

    @BelongsTo(() => DevelopmentTeam, 'team_code')
    team!: DevelopmentTeam;
}

