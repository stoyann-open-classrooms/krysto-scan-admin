import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import garbageTypeService from './garbageTypeService'

const initialState = {
  garbageTypes: [],
  garbageType: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getGarbageTypes = createAsyncThunk(
  'garbageType/getGarbageTypes',
  async (_, thunkAPI) => {
    try {
      return await garbageTypeService.getGarbageTypes()
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

export const getGarbageType = createAsyncThunk(
  'garbageType/getGarbageType',
  async (garbageTypeId, thunkAPI) => {
    try {
      return await garbageTypeService.getGarbageType(garbageTypeId)
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

export const createGarbageType = createAsyncThunk(
  'garbageType/createGarbageType',
  async (garbageTypeData, thunkAPI) => {
    try {
      return await garbageTypeService.createGarbageType(garbageTypeData)
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

export const updateGarbageType = createAsyncThunk(
  'garbageType/updateGarbageType',
  async ({ garbageTypeId, updatedData }, thunkAPI) => {
    try {
      return await garbageTypeService.updateGarbageType(
        garbageTypeId,
        updatedData,
      )
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

export const deleteGarbageType = createAsyncThunk(
  'garbageType/deleteGarbageType',
  async (garbageTypeId, thunkAPI) => {
    try {
      return await garbageTypeService.deleteGarbageType(garbageTypeId)
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

export const garbageTypeSlice = createSlice({
  name: 'garbageType',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGarbageTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGarbageTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.garbageTypes = action.payload
      })
      .addCase(getGarbageTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.garbageTypes = []
      })
      .addCase(getGarbageType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGarbageType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.garbageType = action.payload
      })
      .addCase(getGarbageType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.garbageType = {}
      })
      .addCase(createGarbageType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGarbageType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Mettez à jour state.garbageTypes avec le nouveau garbageType créé si nécessaire
      })
      .addCase(createGarbageType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateGarbageType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateGarbageType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.garbageType = action.payload
      })
      .addCase(updateGarbageType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.garbageType = {}
      })
      .addCase(deleteGarbageType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGarbageType.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
        // Mettez à jour state.garbageTypes en supprimant le garbageType si nécessaire
      })
      .addCase(deleteGarbageType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = garbageTypeSlice.actions
export default garbageTypeSlice.reducer
