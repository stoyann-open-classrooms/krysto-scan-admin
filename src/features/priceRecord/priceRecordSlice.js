import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import priceRecordService from './priceRecordService'

const initialState = {
  priceRecords: [],
  priceRecord: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getPriceRecords = createAsyncThunk(
  'priceRecord/getAll',
  async (_, thunkAPI) => {
    try {
      return await priceRecordService.getPriceRecords()
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

export const getPriceRecord = createAsyncThunk(
  'priceRecord/get',
  async (priceRecordId, thunkAPI) => {
    try {
      return await priceRecordService.getPriceRecord(priceRecordId)
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

export const createPriceRecordForProduct = createAsyncThunk(
  'priceRecord/createForProduct',
  async ({ productId, priceRecordData }, thunkAPI) => {
    try {
      return await priceRecordService.createPriceRecordForProduct(
        productId,
        priceRecordData,
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

export const updatePriceRecord = createAsyncThunk(
  'priceRecord/update',
  async ({ priceRecordId, updatedData }, thunkAPI) => {
    try {
      return await priceRecordService.updatePriceRecord(
        priceRecordId,
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

export const deletePriceRecord = createAsyncThunk(
  'priceRecord/delete',
  async (priceRecordId, thunkAPI) => {
    try {
      return await priceRecordService.deletePriceRecord(priceRecordId)
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

export const priceRecordSlice = createSlice({
  name: 'priceRecord',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPriceRecords.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPriceRecords.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.priceRecords = action.payload
      })
      .addCase(getPriceRecords.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.priceRecords = []
      })
      .addCase(getPriceRecord.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPriceRecord.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.priceRecord = action.payload
      })
      .addCase(getPriceRecord.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.priceRecord = {}
      })
      .addCase(createPriceRecordForProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPriceRecordForProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.priceRecord = action.payload
      })
      .addCase(createPriceRecordForProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.priceRecord = {}
      })
      .addCase(updatePriceRecord.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePriceRecord.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.priceRecord = action.payload
      })
      .addCase(updatePriceRecord.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.priceRecord = {}
      })
      .addCase(deletePriceRecord.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePriceRecord.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.priceRecord = action.payload
      })
      .addCase(deletePriceRecord.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.priceRecord = {}
      })
  },
})

export const { reset } = priceRecordSlice.actions
export default priceRecordSlice.reducer
