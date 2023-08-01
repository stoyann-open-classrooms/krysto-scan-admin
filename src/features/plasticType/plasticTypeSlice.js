import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import plasticTypeService from './plasticTypeService'

const initialState = {
  plasticTypes: [],
  plasticType: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getPlasticTypes = createAsyncThunk(
  'plasticType/getPlasticTypes',
  async (_, thunkAPI) => {
    try {
      return await plasticTypeService.getPlasticTypes()
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

export const getPlasticType = createAsyncThunk(
  'plasticType/getPlasticType',
  async (serviceId, thunkAPI) => {
    try {
      return await plasticTypeService.getPlasticType(serviceId)
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

export const createPlasticType = createAsyncThunk(
  'plasticType/createPlasticType',
  async (plasticTypeData, thunkAPI) => {
    try {
      return await plasticTypeService.createPlasticType(plasticTypeData)
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

export const updatePlasticType = createAsyncThunk(
  'plasticType/update',
  async ({ plasticTypeId, updatedData }, thunkAPI) => {
    try {
      return await plasticTypeService.updatePlasticType(
        plasticTypeId,
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

export const addPlaticTypeIcone = createAsyncThunk(
  'plasticType/addPlasticTypeIcone',
  async ({ plasticTypeId, iconeData }, thunkAPI) => {
    try {
      return await plasticTypeService.addPlasticTypeIcone(
        plasticTypeId,
        iconeData,
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

export const plasticTypeSlice = createSlice({
  name: 'plasticType',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlasticTypes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlasticTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.plasticTypes = action.payload
      })
      .addCase(getPlasticTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.plasticTypes = []
      })
      .addCase(getPlasticType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlasticType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.plasticType = action.payload
      })
      .addCase(getPlasticType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.plasticType = {}
      })
      .addCase(createPlasticType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPlasticType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Mettez à jour state.plasticTypes avec le nouveau type de plastique créé si nécessaire
      })
      .addCase(createPlasticType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(updatePlasticType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePlasticType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.plasticType = action.payload
      })
      .addCase(updatePlasticType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.plasticType = {}
      })

      .addCase(addPlaticTypeIcone.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addPlaticTypeIcone.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.plasticType = action.payload
      })
      .addCase(addPlaticTypeIcone.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.plasticType = {}
      })
  },
})

export const { reset } = plasticTypeSlice.actions
export default plasticTypeSlice.reducer
