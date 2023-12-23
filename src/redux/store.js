import { configureStore } from "@reduxjs/toolkit";
import participantsReducer from './participantsSlice';
import drawStateReducer from './drawStateSlice';

export const store = configureStore({
  reducer : {
    participants: participantsReducer,
    drawState: drawStateReducer,
  }
})