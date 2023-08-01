import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import messageService from './messageService'

const initialState = {
  messages: [],
  messageData: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all messages
export const getMessages = createAsyncThunk(
  'messages/getAll',
  async (_, thunkAPI) => {
    try {
      return await messageService.getMessages()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getMessage = createAsyncThunk(
  'messages/get',
  async (messageId, thunkAPI) => {
    try {
      return await messageService.getMessage(messageId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const closeMessage = createAsyncThunk(
  'messages/close',
  async (messageId, thunkAPI) => {
    try {
      return await messageService.closeMessage(messageId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createNewMessage = createAsyncThunk(
  'messages/createNew',
  async (_, thunkAPI) => {
    try {
      return await messageService.createNewMessage()
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages = action.payload
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.messages = []
      })
      .addCase(getMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messageData = action.payload
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.messageData = {}
      })
      .addCase(createNewMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewMessage.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createNewMessage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.messageData = action.payload
      })
      .addCase(closeMessage.fulfilled, (state, action) => {
        state.isLoading = false
        if (Array.isArray(state.messages)) {
          state.messages = state.messages.map((messageData) =>
            messageData._id === action.payload._id
              ? { ...messageData, status: 'Archived' }
              : messageData,
          )
        }
      })
  },
})

export const { reset } = messageSlice.actions
export default messageSlice.reducer
