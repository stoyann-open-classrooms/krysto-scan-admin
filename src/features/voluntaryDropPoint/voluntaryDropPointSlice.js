import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import voluntaryDropPointService from './voluntaryDropPointService'

const initialState = {
  voluntaryDropPoints: [],
  voluntaryDropPoint: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getVoluntaryDropPoints = createAsyncThunk(
  'voluntaryDropPoint/getVoluntaryDropPoints',
  async (_, thunkAPI) => {
    try {
      return await voluntaryDropPointService.getVoluntaryDropPoints()
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

export const getVoluntaryDropPoint = createAsyncThunk(
  'voluntaryDropPoint/getVoluntaryDropPoint',
  async (voluntaryDropPointId, thunkAPI) => {
    try {
      return await voluntaryDropPointService.getVoluntaryDropPoint(
        voluntaryDropPointId,
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

export const createVoluntaryDropPoint = createAsyncThunk(
  'voluntaryDropPoint/createVoluntaryDropPoint',
  async (voluntaryDropPointData, thunkAPI) => {
    try {
      return await voluntaryDropPointService.createVoluntaryDropPoint(
        voluntaryDropPointData,
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

export const updateVoluntaryDropPoint = createAsyncThunk(
  'voluntaryDropPoint/updateVoluntaryDropPoint',
  async ({ voluntaryDropPointId, updatedData }, thunkAPI) => {
    try {
      return await voluntaryDropPointService.updateVoluntaryDropPoint(
        voluntaryDropPointId,
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

export const deleteVoluntaryDropPoint = createAsyncThunk(
  'voluntaryDropPoint/deleteVoluntaryDropPoint',
  async (voluntaryDropPointId, thunkAPI) => {
    try {
      return await voluntaryDropPointService.deleteVoluntaryDropPoint(
        voluntaryDropPointId,
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

export const getVoluntaryDropPointsInRadius = createAsyncThunk(
  'voluntaryDropPoint/getVoluntaryDropPointsInRadius',
  async ({ zipcode, distance }, thunkAPI) => {
    try {
      return await voluntaryDropPointService.getVoluntaryDropPointsInRadius(
        zipcode,
        distance,
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

export const voluntaryDropPointSlice = createSlice({
  name: 'voluntaryDropPoint',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVoluntaryDropPoints.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getVoluntaryDropPoints.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.voluntaryDropPoints = action.payload
      })
      .addCase(getVoluntaryDropPoints.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getVoluntaryDropPoint.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getVoluntaryDropPoint.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.voluntaryDropPoint = action.payload
      })
      .addCase(getVoluntaryDropPoint.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createVoluntaryDropPoint.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createVoluntaryDropPoint.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.voluntaryDropPoint = action.payload
      })
      .addCase(createVoluntaryDropPoint.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateVoluntaryDropPoint.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateVoluntaryDropPoint.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.voluntaryDropPoint = action.payload
      })
      .addCase(updateVoluntaryDropPoint.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteVoluntaryDropPoint.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteVoluntaryDropPoint.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteVoluntaryDropPoint.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getVoluntaryDropPointsInRadius.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getVoluntaryDropPointsInRadius.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.voluntaryDropPoints = action.payload
      })
      .addCase(getVoluntaryDropPointsInRadius.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { clearState } = voluntaryDropPointSlice.actions

export default voluntaryDropPointSlice.reducer
