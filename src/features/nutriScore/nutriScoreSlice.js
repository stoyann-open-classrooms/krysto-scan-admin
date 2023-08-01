import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import nutriScoreService from './nutriScoreService'

const initialState = {
  nutriScores: [],
  nutriScore: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all products
export const getNutriScores = createAsyncThunk(
  'nutriScore/getAll',
  async (_, thunkAPI) => {
    try {
      return await nutriScoreService.getNutriScores()
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

export const getNutriScore = createAsyncThunk(
  'nutriScore/get',
  async (nutriScoreId, thunkAPI) => {
    try {
      return await nutriScoreService.getNutriScore(nutriScoreId)
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

export const createNutriScore = createAsyncThunk(
  'nutriScore/create',
  async (nutriScoreData, thunkAPI) => {
    try {
      return await nutriScoreService.createNutriScore(nutriScoreData)
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
export const updateNutriScore = createAsyncThunk(
  'nutriScore/update',
  async ({ nutriScoreId, updatedData }, thunkAPI) => {
    try {
      return await nutriScoreService.updateNutriScore(nutriScoreId, updatedData)
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
export const addNutriScorePhoto = createAsyncThunk(
  'nutriScore/addPhoto',
  async ({ nutriScoreId, photoData }, thunkAPI) => {
    try {
      return await nutriScoreService.addNutriScorePhoto(nutriScoreId, photoData)
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

export const nutriScoreSlice = createSlice({
  name: 'nutriScore',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNutriScores.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNutriScores.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nutriScores = action.payload
      })
      .addCase(getNutriScores.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.nutriScores = []
      })
      .addCase(getNutriScore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNutriScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nutriScore = action.payload
      })
      .addCase(getNutriScore.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.nutriScore = {}
      })
      .addCase(createNutriScore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNutriScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nutriScore = action.payload
      })
      .addCase(createNutriScore.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.nutriScore = {}
      })
      .addCase(updateNutriScore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNutriScore.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nutriScore = action.payload
      })
      .addCase(updateNutriScore.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.nutriScore = {}
      })
      .addCase(addNutriScorePhoto.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNutriScorePhoto.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.nutriScore = action.payload
      })
      .addCase(addNutriScorePhoto.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.nutriScore = {}
      })
  },
})

export const { reset } = nutriScoreSlice.actions
export default nutriScoreSlice.reducer
