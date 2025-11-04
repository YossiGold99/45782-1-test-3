
CREATE DATABASE IF NOT EXISTS schedule_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE schedule_management;

SET GLOBAL sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS development_teams (
    team_code CHAR(36) PRIMARY KEY COMMENT 'Team unique identifier (UUID)',
    team_name VARCHAR(255) NOT NULL COMMENT 'Team name (e.g., "Team UI", "Team Mobile", "Team React")',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record update timestamp',
    INDEX idx_team_name (team_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Development teams table';

CREATE TABLE IF NOT EXISTS meetings (
    meeting_code CHAR(36) PRIMARY KEY COMMENT 'Meeting unique identifier (UUID)',
    team_code CHAR(36) NOT NULL COMMENT 'Foreign key to development_teams table',
    start_datetime DATETIME NOT NULL COMMENT 'Meeting start date and time',
    end_datetime DATETIME NOT NULL COMMENT 'Meeting end date and time',
    description TEXT COMMENT 'Meeting description',
    room_name VARCHAR(255) NOT NULL COMMENT 'Meeting room name (e.g., "Blue Room", "New York Room", "Large Board Room")',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation timestamp',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record update timestamp',
    FOREIGN KEY (team_code) REFERENCES development_teams(team_code) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_team_code (team_code),
    INDEX idx_start_datetime (start_datetime),
    INDEX idx_end_datetime (end_datetime),
    CONSTRAINT chk_meeting_dates CHECK (end_datetime > start_datetime)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Meetings table';

INSERT INTO development_teams (team_code, team_name) VALUES
(UUID(), 'Team UI'),
(UUID(), 'Team Mobile'),
(UUID(), 'Team React'),
(UUID(), 'Team Backend'),
(UUID(), 'Team DevOps');

INSERT INTO meetings (meeting_code, team_code, start_datetime, end_datetime, description, room_name)
SELECT 
    UUID() as meeting_code,
    dt.team_code,
    '2024-01-15 09:00:00' as start_datetime,
    '2024-01-15 10:30:00' as end_datetime,
    'Sprint planning meeting for Q1' as description,
    'Blue Room' as room_name
FROM development_teams dt
WHERE dt.team_name = 'Team UI'
LIMIT 1;

INSERT INTO meetings (meeting_code, team_code, start_datetime, end_datetime, description, room_name)
SELECT 
    UUID() as meeting_code,
    dt.team_code,
    '2024-01-15 14:00:00' as start_datetime,
    '2024-01-15 15:00:00' as end_datetime,
    'Code review session' as description,
    'New York Room' as room_name
FROM development_teams dt
WHERE dt.team_name = 'Team React'
LIMIT 1;

INSERT INTO meetings (meeting_code, team_code, start_datetime, end_datetime, description, room_name)
SELECT 
    UUID() as meeting_code,
    dt.team_code,
    '2024-01-16 10:00:00' as start_datetime,
    '2024-01-16 11:30:00' as end_datetime,
    'Architecture discussion' as description,
    'Large Board Room' as room_name
FROM development_teams dt
WHERE dt.team_name = 'Team Backend'
LIMIT 1;

INSERT INTO meetings (meeting_code, team_code, start_datetime, end_datetime, description, room_name)
SELECT 
    UUID() as meeting_code,
    dt.team_code,
    '2024-01-16 13:00:00' as start_datetime,
    '2024-01-16 14:00:00' as end_datetime,
    'Mobile app deployment planning' as description,
    'Blue Room' as room_name
FROM development_teams dt
WHERE dt.team_name = 'Team Mobile'
LIMIT 1;

INSERT INTO meetings (meeting_code, team_code, start_datetime, end_datetime, description, room_name)
SELECT 
    UUID() as meeting_code,
    dt.team_code,
    '2024-01-17 09:30:00' as start_datetime,
    '2024-01-17 10:30:00' as end_datetime,
    'Infrastructure optimization review' as description,
    'New York Room' as room_name
FROM development_teams dt
WHERE dt.team_name = 'Team DevOps'
LIMIT 1;

INSERT INTO meetings (meeting_code, team_code, start_datetime, end_datetime, description, room_name)
SELECT 
    UUID() as meeting_code,
    dt.team_code,
    '2024-01-17 15:00:00' as start_datetime,
    '2024-01-17 16:30:00' as end_datetime,
    'Weekly standup meeting' as description,
    'Large Board Room' as room_name
FROM development_teams dt
WHERE dt.team_name = 'Team UI'
LIMIT 1;

