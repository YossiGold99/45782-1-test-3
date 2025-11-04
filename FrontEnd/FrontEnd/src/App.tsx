import { useState, useEffect } from 'react';
import { teamsApi } from './services/api';
import type { DevelopmentTeam, Meeting, CreateMeetingData } from './services/api';
import './App.css';

function App() {
  const [teams, setTeams] = useState<DevelopmentTeam[]>([]);
  const [selectedTeamCode, setSelectedTeamCode] = useState<string>('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [formData, setFormData] = useState<CreateMeetingData>({
    team_code: '',
    start_datetime: '',
    end_datetime: '',
    description: '',
    room_name: '',
  });

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    if (selectedTeamCode) {
      loadMeetings(selectedTeamCode);
    } else {
      setMeetings([]);
    }
  }, [selectedTeamCode]);

  const loadTeams = async () => {
    try {
      setLoading(true);
      setError('');
      const teamsData = await teamsApi.getAllTeams();
      setTeams(teamsData);
      if (teamsData.length > 0 && !selectedTeamCode) {
        setSelectedTeamCode(teamsData[0].team_code);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to load teams';
      setError(errorMessage);
      console.error('Error loading teams:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMeetings = async (teamCode: string) => {
    try {
      setLoading(true);
      setError('');
      const meetingsData = await teamsApi.getMeetingsByTeam(teamCode);
      setMeetings(meetingsData);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to load meetings';
      setError(errorMessage);
      console.error('Error loading meetings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeamCode(e.target.value);
    setFormData({ ...formData, team_code: e.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.team_code || !formData.start_datetime || !formData.end_datetime || !formData.room_name) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await teamsApi.createMeeting(formData);
      setShowAddForm(false);
      setFormData({
        team_code: selectedTeamCode,
        start_datetime: '',
        end_datetime: '',
        description: '',
        room_name: '',
      });
      await loadMeetings(selectedTeamCode);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to create meeting');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Schedule Management</h1>
        <p>ניהול פגישות קבוצות פיתוח</p>
      </header>

      <main className="app-main">
        <div className="teams-section">
          <label htmlFor="team-select" className="label">
            בחר קבוצת פיתוח:
          </label>
          <select
            id="team-select"
            value={selectedTeamCode}
            onChange={handleTeamChange}
            className="select"
            disabled={loading}
          >
            <option value="">-- בחר קבוצה --</option>
            {teams.map((team) => (
              <option key={team.team_code} value={team.team_code}>
                {team.team_name}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        {selectedTeamCode && (
          <div className="meetings-section">
            <div className="section-header">
              <h2>פגישות של {teams.find(t => t.team_code === selectedTeamCode)?.team_name}</h2>
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setFormData({ ...formData, team_code: selectedTeamCode });
                }}
                className="btn btn-primary"
              >
                הוסף פגישה חדשה
              </button>
            </div>

            {showAddForm && (
              <div className="form-container">
                <h3>הוספת פגישה חדשה</h3>
                <form onSubmit={handleSubmit} className="form">
                  <div className="form-group">
                    <label htmlFor="start_datetime">תאריך ושעת התחלה *</label>
                    <input
                      type="datetime-local"
                      id="start_datetime"
                      name="start_datetime"
                      value={formData.start_datetime}
                      onChange={handleInputChange}
                      required
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="end_datetime">תאריך ושעת סיום *</label>
                    <input
                      type="datetime-local"
                      id="end_datetime"
                      name="end_datetime"
                      value={formData.end_datetime}
                      onChange={handleInputChange}
                      required
                      className="input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="room_name">שם החדר *</label>
                    <input
                      type="text"
                      id="room_name"
                      name="room_name"
                      value={formData.room_name}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="לדוגמה: Blue Room"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">תיאור הפגישה</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      className="textarea"
                      rows={4}
                      placeholder="תיאור הפגישה..."
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'שומר...' : 'שמור פגישה'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setError('');
                      }}
                      className="btn btn-secondary"
                    >
                      ביטול
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="view-controls">
              <button
                onClick={() => setViewMode('cards')}
                className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
              >
                כרטיסיות
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              >
                טבלה
              </button>
            </div>

            {loading && meetings.length === 0 ? (
              <div className="loading">טוען...</div>
            ) : meetings.length === 0 ? (
              <div className="no-meetings">אין פגישות עבור קבוצה זו</div>
            ) : viewMode === 'table' ? (
              <div className="meetings-table-container">
                <table className="meetings-table">
                  <thead>
                    <tr>
                      <th>חדר</th>
                      <th>תאריך ושעת התחלה</th>
                      <th>תאריך ושעת סיום</th>
                      <th>תיאור</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetings.map((meeting) => (
                      <tr key={meeting.meeting_code}>
                        <td>{meeting.room_name}</td>
                        <td>{formatDateTime(meeting.start_datetime)}</td>
                        <td>{formatDateTime(meeting.end_datetime)}</td>
                        <td>{meeting.description || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="meetings-grid">
                {meetings.map((meeting) => (
                  <div key={meeting.meeting_code} className="meeting-card">
                    <div className="meeting-header">
                      <h3>{meeting.room_name}</h3>
                    </div>
                    <div className="meeting-body">
                      <div className="meeting-info">
                        <div className="info-item">
                          <span className="info-label">התחלה:</span>
                          <span className="info-value">{formatDateTime(meeting.start_datetime)}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">סיום:</span>
                          <span className="info-value">{formatDateTime(meeting.end_datetime)}</span>
                        </div>
                        {meeting.description && (
                          <div className="info-item">
                            <span className="info-label">תיאור:</span>
                            <span className="info-value">{meeting.description}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
