import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import novaScoreService from './novaScoreService'

const initialState = {
  novaScores: [],
  novaScore: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all products
export const getNovaScores = createAsyncThunk(
  'novaScore/getAll',
  async (_, thunkAPI) => {
    try {
      return await novaScoreService.getNovaScores()
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

export const getNovaScore = createAsyncThunk(
  'novaScore/get',
  async (novaScoreId, thunkAPI) => {
    try {
      return await novaScoreService.getNovaScore(novaScoreId)
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

export const createNovaScore = createAsyncThunk(
  'novaScore/create',
  async (novaScoreData, thunkAPI) => {
    try {
      return await novaScoreService.createNovaScore(novaScoreData)
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
export const updateNovaScore = createAsyncThunk(
  'novaScore/update',
  async ({ novaScoreId, updatedData }, thunkAPI) => {
    try {
      return await novaScoreService.updateNovaScore(novaScoreId, updatedData)
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
export const addNovaScorePhoto = createAsyncThunk(
  'novaScore/addPhoto',
  async ({ novaScoreId, photoData }, thunkAPI) => {
    try {
      return await novaScoreService.addNovaScorePhoto(novaScoreId, photoData)
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

export const novaScoreSlice = createSlice({
  name: 'novaScore',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNovaScores.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNovaScores.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.novaScores = action.payload
      })
      .addCase(getNovaScores.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.novaScores = []
      })
      .addCase(getNovaScore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNovaScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.novaScore = action.payload
      })
      .addCase(getNovaScore.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.novaScore = {}
      })
      .addCase(createNovaScore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNovaScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.novaScore = action.payload
      })
      .addCase(createNovaScore.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.novaScore = {}
      })
      .addCase(updateNovaScore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNovaScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.novaScore = action.payload
      })
      .addCase(updateNovaScore.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.novaScore = {}
      })
      .addCase(addNovaScorePhoto.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNovaScorePhoto.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.novaScore = action.payload
      })
      .addCase(addNovaScorePhoto.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.novaScore = {}
      })
  },
})

export const { reset } = novaScoreSlice.actions
export default novaScoreSlice.reducer
