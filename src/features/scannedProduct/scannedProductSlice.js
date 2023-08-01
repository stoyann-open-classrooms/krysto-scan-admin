import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import scannedProductService from './scannedProductService'

const initialState = {
  scannedProducts: [],
  scannedProduct: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getScannedProducts = createAsyncThunk(
  'scannedProduct/getAll',
  async (_, thunkAPI) => {
    try {
      return await scannedProductService.getScannedProducts()
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

export const getScannedProduct = createAsyncThunk(
  'scannedProduct/get',
  async (scannedProductId, thunkAPI) => {
    try {
      return await scannedProductService.getScannedProduct(scannedProductId)
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

export const getUserScannedProducts = createAsyncThunk(
  'scannedProduct/getUserProducts',
  async (userId, thunkAPI) => {
    try {
      return await scannedProductService.getUserScannedProducts(userId)
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

export const createScannedProductForUser = createAsyncThunk(
  'scannedProduct/createForUser',
  async ({ userId, scannedProductData }, thunkAPI) => {
    try {
      return await scannedProductService.createScannedProductForUser(
        userId,
        scannedProductData,
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

export const updateScannedProduct = createAsyncThunk(
  'scannedProduct/update',
  async ({ scannedProductId, updatedData }, thunkAPI) => {
    try {
      return await scannedProductService.updateScannedProduct(
        scannedProductId,
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

export const deleteScannedProduct = createAsyncThunk(
  'scannedProduct/delete',
  async (scannedProductId, thunkAPI) => {
    try {
      return await scannedProductService.deleteScannedProduct(scannedProductId)
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

export const scannedProductSlice = createSlice({
  name: 'scannedProduct',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScannedProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getScannedProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.scannedProducts = action.payload
      })
      .addCase(getScannedProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.scannedProducts = []
      })
      .addCase(getScannedProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getScannedProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.scannedProduct = action.payload
      })
      .addCase(getScannedProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.scannedProduct = {}
      })
      .addCase(getUserScannedProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserScannedProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.scannedProducts = action.payload
      })
      .addCase(getUserScannedProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.scannedProducts = []
      })
      .addCase(createScannedProductForUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createScannedProductForUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.scannedProduct = action.payload
      })
      .addCase(createScannedProductForUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.scannedProduct = {}
      })
      .addCase(updateScannedProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateScannedProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.scannedProduct = action.payload
      })
      .addCase(updateScannedProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.scannedProduct = {}
      })
      .addCase(deleteScannedProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteScannedProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.scannedProduct = action.payload
      })
      .addCase(deleteScannedProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.scannedProduct = {}
      })
  },
})

export const { reset } = scannedProductSlice.actions
export default scannedProductSlice.reducer
