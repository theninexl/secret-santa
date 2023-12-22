import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    addParticipant:(state, action) => {
      const { id, name, email } = action.payload;
      state.push({id: id, name: name, email: email});
    },
    emptyParticipants:(state,action) => {
      state.length = 0;
    }
  }
});

export const { addParticipant, emptyParticipants } = participantsSlice.actions;
export default participantsSlice.reducer;