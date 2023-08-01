import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import { AiOutlineDelete } from 'react-icons/ai'
import { getPriceRecords , deletePriceRecord } from '../../../features/priceRecord/priceRecordSlice'
import { getProducts } from '../../../features/product/productSlice'
import Ticket from '../../../components/shared/ticket/Ticket'
import { getEnseignes } from '../../../features/enseigne/enseigneSlice'
import './PrivatePriceReccords.css'

function PrivatePriceRecords() {
  const { priceRecords, isLoading, isError, message } = useSelector(
    (state) => state.priceRecord,
  )
  const { products } = useSelector((state) => state.product)
  const { enseignes } = useSelector((state) => state.enseigne)

  const dispatch = useDispatch()

  const [startDateFilter, setStartDateFilter] = useState('')
  const [endDateFilter, setEndDateFilter] = useState('')

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getPriceRecords())
    dispatch(getProducts())
    dispatch(getEnseignes())
  }, [dispatch, isError, message])

  if (isLoading || !priceRecords.data || !products || !enseignes.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
      try {
        await dispatch(deletePriceRecord(id))
        toast.success('Enregistrement supprimé avec succès !')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } catch (error) {
        toast.error('Erreur lors de la suppression de l\'enregistrement')
      }
    }
  }
  

  const productMap = products.data ? products.data.reduce((acc, product) => {
    acc[product._id] = product.designation
    return acc
  }, {}) : {};
  
  const enseigneMap = enseignes.data ? enseignes.data.reduce((acc, enseigne) => {
    acc[enseigne._id] = enseigne.name
    return acc
  }, {}) : {};

  const filteredPriceRecords = priceRecords.data.filter((record) => {
    const recordDate = new Date(record.dateRecorded)
    if (startDateFilter && endDateFilter) {
      const startDate = new Date(startDateFilter)
      const endDate = new Date(endDateFilter)
      return recordDate >= startDate && recordDate <= endDate
    }
    return true
  })

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des prix enregistrée</h1>
        <div className="inputDateContainer">
          <p>Du</p>
          <input
            className="dateInput"
            type="date"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
          <p>AU</p>
          <input
            className="dateInput"
            type="date"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
        </div>
      </section>

      <div className="ticket-headings">
        <div>Enseigne</div>
        <div>Produits</div>
        <div>Prix enregistré</div>
        <div>date enregistrement</div>
        <div>identifiant de l'enregistrement</div>
      </div>

      {filteredPriceRecords.map((record) => (
        <Ticket key={record._id}>
          <div>{enseigneMap[record.enseigne]}</div>
          <div>{productMap[record.product]}</div>
          <div>{record.price}</div>
          <div>{new Date(record.dateRecorded).toLocaleDateString()}</div>
          <button onClick={() => handleDelete(record._id)} style={{ background: 'none', border: 'none' }}>
            <AiOutlineDelete size={20} />
          </button>
        </Ticket>
      ))}
    </>
  )
}

export default PrivatePriceRecords
