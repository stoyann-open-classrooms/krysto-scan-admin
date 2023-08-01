import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import additiveService from './additiveService'

const initialState = {
  additives: [],
  additive: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all additives
export const getAdditives = createAsyncThunk(
  'additive/getAll',
  async (_, thunkAPI) => {
    try {
      return await additiveService.getAdditives()
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

export const getAdditive = createAsyncThunk(
  'additive/get',
  async (additiveId, thunkAPI) => {
    try {
      return await additiveService.getAdditive(additiveId)
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

export const createAdditive = createAsyncThunk(
  'additive/create',
  async (additiveData, thunkAPI) => {
    try {
      return await additiveService.createAdditive(additiveData)
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

export const updateAdditive = createAsyncThunk(
  'additive/update',
  async ({ additiveId, updatedData }, thunkAPI) => {
    try {
      return await additiveService.updateAdditive(additiveId, updatedData)
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

export const deleteAdditive = createAsyncThunk(
  'additive/delete',
  async (additiveId, thunkAPI) => {
    try {
      return await additiveService.deleteAdditive(additiveId)
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

export const additiveSlice = createSlice({
  name: 'additive',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdditives.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAdditives.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.additives = action.payload
      })
      .addCase(getAdditives.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.additives = []
      })
      .addCase(getAdditive.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAdditive.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.additive = action.payload
      })
      .addCase(getAdditive.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.additive = {}
      })
      .addCase(createAdditive.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAdditive.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.additive = action.payload
      })
      .addCase(createAdditive.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.additive = {}
      })
      .addCase(updateAdditive.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAdditive.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.additive = action.payload
      })
      .addCase(updateAdditive.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.additive = {}
      })
      .addCase(deleteAdditive.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAdditive.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        if (Array.isArray(state.additives)) {
          state.additives = state.additives.filter(
            (additive) => additive.id !== action.payload,
          )
        }
      })
      .addCase(deleteAdditive.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = additiveSlice.actions
export default additiveSlice.reducer
