import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'

import { getProductCategory } from '../../../features/productCategory/productCategorySlice'


function PrivateProductCategory() {
  const { productCategory, isLoading, isError, message } = useSelector(
    (state) => state.productCategory,
  )
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProductCategory(params.id))
  }, [dispatch, isError, message, params.id])

  console.log(productCategory.data)
  if (isLoading || !productCategory.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <section className="headings">
      <h1>{productCategory.data.name}</h1>
     
    </section>
  )
}

export default PrivateProductCategory
