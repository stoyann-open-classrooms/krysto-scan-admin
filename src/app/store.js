import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import productReducer from '../features/product/productSlice'
import scannedProductReducer from '../features/scannedProduct/scannedProductSlice'
import priceRecordReducer from '../features/priceRecord/priceRecordSlice'
import enseigneReducer from '../features/enseigne/enseigneSlice'
import productCategoryReducer from '../features/productCategory/productCategorySlice'
import voluntaryDropPointReducer from '../features/voluntaryDropPoint/voluntaryDropPointSlice'
import ecoScoreReducer from '../features/ecoScore/ecoScoreSlice'
import nutriScoreReducer from '../features/nutriScore/nutriScoreSlice'
import novaScoreReducer from '../features/novaScore/novaScoreSlice'
import garbageTypeReducer from '../features/garbageType/garbageTypeSlice'
import plasticTypeReducer from '../features/plasticType/plasticTypeSlice'
import messageReducer from '../features/message/messageSlice'
import additiveReducer from '../features/additive/additiveSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    enseigne: enseigneReducer,
    priceRecord: priceRecordReducer,
    additive: additiveReducer,
    scannedProduct: scannedProductReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    garbageType: garbageTypeReducer,
    voluntaryDropPoint: voluntaryDropPointReducer,
    ecoScore: ecoScoreReducer,
    nutriScore: nutriScoreReducer,
    novaScore: novaScoreReducer,
    plasticType: plasticTypeReducer,
    message: messageReducer,
  },
})
