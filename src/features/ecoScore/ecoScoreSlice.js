import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ecoScoreService from './ecoScoreService'

const initialState = {
  ecoScores: [],
  ecoScore: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all products
export const getEcoScores = createAsyncThunk(
  'ecoScore/getAll',
  async (_, thunkAPI) => {
    try {
      return await ecoScoreService.getEcoScores()
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

export const getEcoScore = createAsyncThunk(
  'ecoScore/get',
  async (ecoScoreId, thunkAPI) => {
    try {
      return await ecoScoreService.getEcoScore(ecoScoreId)
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

export const createEcoScore = createAsyncThunk(
  'ecoScore/create',
  async (ecoScoreData, thunkAPI) => {
    try {
      return await ecoScoreService.createEcoScore(ecoScoreData)
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
export const updateEcoScore = createAsyncThunk(
  'ecoScore/update',
  async ({ ecoScoreId, updatedData }, thunkAPI) => {
    try {
      return await ecoScoreService.updateEcoScore(ecoScoreId, updatedData)
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
export const addEcoScorePhoto = createAsyncThunk(
  'ecoScore/addPhoto',
  async ({ ecoScoreId, photoData }, thunkAPI) => {
    try {
      return await ecoScoreService.addEcoScorePhoto(ecoScoreId, photoData)
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

export const ecoScoreSlice = createSlice({
  name: 'ecoScore',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEcoScores.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEcoScores.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ecoScores = action.payload
      })
      .addCase(getEcoScores.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.ecoScores = []
      })
      .addCase(getEcoScore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEcoScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ecoScore = action.payload
      })
      .addCase(getEcoScore.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.ecoScore = {}
      })
      .addCase(createEcoScore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEcoScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ecoScore = action.payload
      })
      .addCase(createEcoScore.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.ecoScore = {}
      })
      .addCase(updateEcoScore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEcoScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ecoScore = action.payload
      })
      .addCase(updateEcoScore.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.ecoScore = {}
      })
      .addCase(addEcoScorePhoto.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addEcoScorePhoto.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ecoScore = action.payload
      })
      .addCase(addEcoScorePhoto.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.ecoScore = {}
      })
  },
})

export const { reset } = ecoScoreSlice.actions
export default ecoScoreSlice.reducer
