import { useState, useEffect } from 'react';
import { teamsApi } from './services/api';
import type { DevelopmentTeam, Meeting, CreateMeetingData } from './services/api';
import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from '@mui/material';
import {
  Event as EventIcon,
  MeetingRoom as RoomIcon,
  Schedule as ScheduleIcon,
  Add as AddIcon,
  ViewModule as ViewModuleIcon,
  TableChart as TableChartIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

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
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { error?: string } }; message?: string }).response?.data?.error ||
        (err as { message?: string }).message ||
        'Failed to load teams';
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
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { error?: string } }; message?: string }).response?.data?.error ||
        (err as { message?: string }).message ||
        'Failed to load meetings';
      setError(errorMessage);
      console.error('Error loading meetings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamChange = (e: { target: { value: string } }) => {
    const teamCode = e.target.value;
    setSelectedTeamCode(teamCode);
    setFormData({ ...formData, team_code: teamCode });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.team_code || !formData.start_datetime || !formData.end_datetime || !formData.room_name) {
      setError('כל השדות הנדרשים צריכים להיות מלאים');
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
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { error?: string } }; message?: string }).response?.data?.error ||
        (err as { message?: string }).message ||
        'Failed to create meeting';
      setError(errorMessage);
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

  const selectedTeam = teams.find(t => t.team_code === selectedTeamCode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              color: 'white',
              mb: 4,
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
              Schedule Management
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              ניהול פגישות קבוצות פיתוח
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              מהבית היוצר של גולד
            </Typography>

          </Box>

          <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="team-select-label">בחר קבוצת פיתוח</InputLabel>
              <Select
                labelId="team-select-label"
                id="team-select"
                value={selectedTeamCode}
                onChange={handleTeamChange}
                label="בחר קבוצת פיתוח"
                disabled={loading}
              >
                {teams.map((team) => (
                  <MenuItem key={team.team_code} value={team.team_code}>
                    {team.team_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {selectedTeamCode && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    פגישות של {selectedTeam?.team_name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <ToggleButtonGroup
                      value={viewMode}
                      exclusive
                      onChange={(_, newMode) => {
                        if (newMode !== null) {
                          setViewMode(newMode);
                        }
                      }}
                      size="small"
                    >
                      <ToggleButton value="cards">
                        <ViewModuleIcon sx={{ mr: 1 }} />
                        כרטיסיות
                      </ToggleButton>
                      <ToggleButton value="table">
                        <TableChartIcon sx={{ mr: 1 }} />
                        טבלה
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setShowAddForm(true);
                        setFormData({ ...formData, team_code: selectedTeamCode });
                      }}
                      sx={{ minWidth: 150 }}
                    >
                      הוסף פגישה
                    </Button>
                  </Box>
                </Box>

                <Dialog open={showAddForm} onClose={() => setShowAddForm(false)} maxWidth="sm" fullWidth>
                  <form onSubmit={handleSubmit}>
                    <DialogTitle>הוספת פגישה חדשה</DialogTitle>
                    <DialogContent>
                      <TextField
                        fullWidth
                        label="תאריך ושעת התחלה"
                        type="datetime-local"
                        name="start_datetime"
                        value={formData.start_datetime}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        fullWidth
                        label="תאריך ושעת סיום"
                        type="datetime-local"
                        name="end_datetime"
                        value={formData.end_datetime}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        fullWidth
                        label="שם החדר"
                        name="room_name"
                        value={formData.room_name}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                        placeholder="לדוגמה: Blue Room"
                      />
                      <TextField
                        fullWidth
                        label="תיאור הפגישה"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        margin="normal"
                        placeholder="תיאור הפגישה..."
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setShowAddForm(false)}>ביטול</Button>
                      <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'שומר...' : 'שמור פגישה'}
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>

                {loading && meetings.length === 0 ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : meetings.length === 0 ? (
                  <Alert severity="info">אין פגישות עבור קבוצה זו</Alert>
                ) : viewMode === 'table' ? (
                  <TableContainer component={Paper} elevation={2}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.main' }}>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>חדר</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>תאריך ושעת התחלה</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>תאריך ושעת סיום</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 600 }}>תיאור</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {meetings.map((meeting) => (
                          <TableRow key={meeting.meeting_code} hover>
                            <TableCell>
                              <Chip icon={<RoomIcon />} label={meeting.room_name} color="primary" variant="outlined" />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ScheduleIcon fontSize="small" color="action" />
                                {formatDateTime(meeting.start_datetime)}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ScheduleIcon fontSize="small" color="action" />
                                {formatDateTime(meeting.end_datetime)}
                              </Box>
                            </TableCell>
                            <TableCell>{meeting.description || '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                    {meetings.map((meeting) => (
                      <Card key={meeting.meeting_code} elevation={4} sx={{ transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
                        <CardHeader
                          avatar={<EventIcon color="primary" />}
                          title={
                            <Chip icon={<RoomIcon />} label={meeting.room_name} color="primary" size="small" />
                          }
                        />
                        <CardContent>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <ScheduleIcon fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">
                                התחלה:
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {formatDateTime(meeting.start_datetime)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <ScheduleIcon fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">
                                סיום:
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {formatDateTime(meeting.end_datetime)}
                              </Typography>
                            </Box>
                            {meeting.description && (
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                <strong>תיאור:</strong> {meeting.description}
                              </Typography>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
