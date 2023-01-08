import { EVENT } from '../../../constants/slicer.constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ConversationsState = {
  conversation_id: number;
  customer_name: any;
  customer_phone: any;
};
type MessagesState = {
  message_id: number;
  message: string;
  from: string;
  to: string;
};
export type EventProps = {
  conversations: ConversationsState[];
  messages: MessagesState[];
};

export const initialState: EventProps = {
  conversations: [],
  messages: [],
};

export const eventSlice = createSlice({
  name: EVENT,
  initialState,
  reducers: {
    addConversations: (state, action: PayloadAction<ConversationsState[]>) => {
      state.conversations = action.payload;
    },
    pushConversations: (state, action: PayloadAction<ConversationsState>) => {
      state.conversations.push(action.payload);
    },
    addMessages: (state, action: PayloadAction<MessagesState[]>) => {
      state.messages = action.payload;
    },
    pushMessages: (state, action: PayloadAction<MessagesState>) => {
      state.messages.push(action.payload);
    },
    clearEvent: (state) => {
      state.conversations = [];
      state.messages = [];
    },
    clearConversations: (state) => {
      state.conversations = [];
    },
    removeConversation: (state, action: PayloadAction<number>) => {
      state.conversations = state.conversations.filter(
        (conversation) => conversation.conversation_id !== action.payload,
      );
    },
  },
});

export const {
  addConversations,
  pushConversations,
  addMessages,
  pushMessages,
  clearEvent,
  clearConversations,
  removeConversation,
} = eventSlice.actions;
export default eventSlice.reducer;
