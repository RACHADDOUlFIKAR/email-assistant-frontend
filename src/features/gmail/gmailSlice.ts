import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchLastMessage = createAsyncThunk(
  'gmail/fetchLastMessage',
  async (email: string) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/assistant`, { recipientEmail: email });
    return response.data;
  }
);

export const sendEmail = createAsyncThunk(
  'gmail/sendEmail',
  async ({ recipientEmail, subject, body }: { recipientEmail: string; subject: string; body: string }) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send-email`, { recipientEmail, subject, body });
    return response.data;
  }
);

const gmailSlice = createSlice({
  name: 'gmail',
  initialState: {
    lastMessage: null as string | null,
    generatedResponse: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLastMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.lastMessage = action.payload.message;
        state.generatedResponse = action.payload.generatedResponse;
      })
      .addCase(fetchLastMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching last message';
      })
      .addCase(sendEmail.fulfilled, (state) => {
        console.log('Email sent successfully');
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.error = action.error.message || 'Error sending email';
      });
  },
});

export default gmailSlice.reducer;
