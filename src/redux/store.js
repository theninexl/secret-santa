import { configureStore } from "@reduxjs/toolkit";
import participantsReducer from './participantsSlice';

export const store = configureStore({
  reducer : {
    participants: participantsReducer,
  }
})