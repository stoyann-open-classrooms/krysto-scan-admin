import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import enseigneService from './enseigneService'

const initialState = {
  enseignes: [],
  enseigne: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all products
export const getEnseignes = createAsyncThunk(
  'enseigne/getAll',
  async (_, thunkAPI) => {
    try {
      return await enseigneService.getEnseignes()
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

export const getEnseigne = createAsyncThunk(
  'enseigne/get',
  async (enseigneId, thunkAPI) => {
    try {
      return await enseigneService.getEnseigne(enseigneId)
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

export const createEnseigne = createAsyncThunk(
  'enseigne/create',
  async (enseigneData, thunkAPI) => {
    try {
      return await enseigneService.createEnseigne(enseigneData)
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
export const updateEnseigne = createAsyncThunk(
  'enseigne/update',
  async ({ enseigneId, updatedData }, thunkAPI) => {
    try {
      return await enseigneService.updateEnseigne(enseigneId, updatedData)
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
export const addEnseignePhoto = createAsyncThunk(
  'enseigne/addPhoto',
  async ({ enseigneId, photoData }, thunkAPI) => {
    try {
      return await enseigneService.addEnseignePhoto(enseigneId, photoData)
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

export const enseigneSlice = createSlice({
  name: 'enseigne',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnseignes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEnseignes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.enseignes = action.payload
      })
      .addCase(getEnseignes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.enseignes = []
      })
      .addCase(getEnseigne.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEnseigne.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.enseigne = action.payload
      })
      .addCase(getEnseigne.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.enseigne = {}
      })
      .addCase(createEnseigne.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEnseigne.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.enseigne = action.payload
      })
      .addCase(createEnseigne.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.enseigne = {}
      })
      .addCase(updateEnseigne.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEnseigne.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.enseigne = action.payload
      })
      .addCase(updateEnseigne.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.enseigne = {}
      })
      .addCase(addEnseignePhoto.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addEnseignePhoto.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.enseigne = action.payload
      })
      .addCase(addEnseignePhoto.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.enseigne = {}
      })
  },
})

export const { reset } = enseigneSlice.actions
export default enseigneSlice.reducer
