import axios from 'axios';

// In Docker, we need to use the external URL since the browser runs on the host machine
// The backend is accessible via localhost:3020 from the browser
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3020';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface DevelopmentTeam {
  team_code: string;
  team_name: string;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  meeting_code: string;
  team_code: string;
  start_datetime: string;
  end_datetime: string;
  description: string | null;
  room_name: string;
  created_at: string;
  updated_at: string;
  team?: DevelopmentTeam;
}

export interface CreateMeetingData {
  team_code: string;
  start_datetime: string;
  end_datetime: string;
  description?: string;
  room_name: string;
}

export const teamsApi = {
  getAllTeams: async (): Promise<DevelopmentTeam[]> => {
    const response = await api.get<DevelopmentTeam[]>('/teams');
    return response.data;
  },

  getMeetingsByTeam: async (teamCode: string): Promise<Meeting[]> => {
    const response = await api.get<Meeting[]>(`/teams/${teamCode}/meetings`);
    return response.data;
  },

  createMeeting: async (meetingData: CreateMeetingData): Promise<Meeting> => {
    const response = await api.post<Meeting>('/meetings', meetingData);
    return response.data;
  },
};

export default api;

