import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import { getProductCategories } from '../../../features/productCategory/productCategorySlice'
import { Link } from 'react-router-dom'
import Ticket from '../../../components/shared/ticket/Ticket'


function PrivateProductCategories() {
  const { productCategories, isLoading, isError, message } = useSelector(
    (state) => state.productCategory,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProductCategories())
  }, [dispatch, isError, message])

  console.log(productCategories)

  if (isLoading || !productCategories.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
        
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des catégories de produits</h1>
      </section>
      
      <div className="ticket-headings">
        <div>Id</div>
        <div>Nom</div>
        <div>Créé le</div>
        <div>Modifié le</div>
        <div>-</div>
      </div>

      {productCategories.data.map((category) => (
        <Link key={category.id} to={`/private/produit-categorie/${category.id}`}>
          <Ticket>
        
            <div>{category.id}</div>

            <div>{category.name}</div>
            <div>{new Date(category.createdAt).toLocaleDateString()}</div>
            <div>{new Date(category.updatedAt).toLocaleDateString()}</div>
          </Ticket>
        </Link>
      ))}

      

    </>
  )
}

export default PrivateProductCategories
