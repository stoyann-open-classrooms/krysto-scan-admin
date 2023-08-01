import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productCategoryService from './productCategoryService'

const initialState = {
  productCategories: [],
  productCategory: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get all products
export const getProductCategories = createAsyncThunk(
  'productCategory/getAll',
  async (_, thunkAPI) => {
    try {
      return await productCategoryService.getProductCategories()
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

export const getProductCategory = createAsyncThunk(
  'productCategory/get',
  async (productCategoryId, thunkAPI) => {
    try {
      return await productCategoryService.getProductCategory(productCategoryId)
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

export const createProductCategory = createAsyncThunk(
  'productCategory/create',
  async (productCategoryData, thunkAPI) => {
    try {
      return await productCategoryService.createProductCategory(
        productCategoryData,
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
export const updateProductCategory = createAsyncThunk(
  'productCategory/update',
  async ({ productCategoryId, updatedData }, thunkAPI) => {
    try {
      return await productCategoryService.updateProductCategory(
        productCategoryId,
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
export const addProductCategoryPhoto = createAsyncThunk(
  'productCategory/addPhoto',
  async ({ productCategoryId, photoData }, thunkAPI) => {
    try {
      return await productCategoryService.addProductCategoryPhoto(
        productCategoryId,
        photoData,
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

export const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.productCategories = action.payload
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.productCategories = []
      })
      .addCase(getProductCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.productCategory = action.payload
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.productCategory = {}
      })
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.productCategory = action.payload
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.productCategory = {}
      })
      .addCase(updateProductCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.productCategory = action.payload
      })
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.productCategory = {}
      })
      .addCase(addProductCategoryPhoto.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addProductCategoryPhoto.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.productCategory = action.payload
      })
      .addCase(addProductCategoryPhoto.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.productCategory = {}
      })
  },
})

export const { reset } = productCategorySlice.actions
export default productCategorySlice.reducer
