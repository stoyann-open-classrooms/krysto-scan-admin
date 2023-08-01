import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import Modal from '../../../components/shared/modal/Modal'
import { BackButton } from '../../../components/shared/BackButton'
import { Link } from 'react-router-dom'
import Ticket from '../../../components/shared/ticket/Ticket'
import { getGarbageTypes, createGarbageType } from '../../../features/garbageType/garbageTypeSlice'

function PrivateGarbagesTypes() {
  const { garbageTypes, isLoading, isError, message } = useSelector(
    (state) => state.garbageType,
  )

  const [isNewGarbageTypeModalOpen, setIsNewGarbageTypeModalOpen] = useState(false)
  const [newGarbageType, setNewGarbageType] = useState({name: "", containerColor: "", details: ""})

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getGarbageTypes())
  }, [dispatch, isError, message])

  const openNewGarbageTypeModal = () => {
    setIsNewGarbageTypeModalOpen(true)
  }

  const closeNewGarbageTypeModal = () => {
    setIsNewGarbageTypeModalOpen(false)
  }

  const handleInputChange = (e) => {
    setNewGarbageType({ ...newGarbageType, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(createGarbageType(newGarbageType))
      .then(() => {
        setIsNewGarbageTypeModalOpen(false)
        window.location.reload()
      })
      .catch((error) => {
        toast.error(`Une erreur s'est produite, merci de réessayer.`)
      })
  }

  if (isLoading || !garbageTypes.data) {
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

      <button onClick={openNewGarbageTypeModal} className="btn">
        Ajouter un nouveau type de déchets
      </button>

      <div className="ticket-headings">
        <div>Id</div>
        <div>Nom</div>
        <div>Couleur</div>
        <div>détails</div>
        <div>Créé le</div>
      </div>

      {garbageTypes.data.map((garbage) => (
        <Link key={garbage.id} to={`/private/produit-categorie/${garbage.id}`}>
          <Ticket>
            <div>{garbage.id}</div>
            <div>{garbage.name}</div>
            <div>{garbage.containerColor}</div>
            <div>{garbage.details}</div>
            <div>{new Date(garbage.createdAt).toLocaleDateString()}</div>
          </Ticket>
        </Link>
      ))}

      <Modal
        titleModal="Ajouter un nouveau type de déchets"
        isOpen={isNewGarbageTypeModalOpen}
        onClose={closeNewGarbageTypeModal}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Nom:</label>
            <input type="text" name="name" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Couleur du conteneur:</label>
            <input type="text" name="containerColor" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Détails:</label>
            <input type="text" name="details" onChange={handleInputChange} />
          </div>
          <button className="btn btn-block btn-danger"   type="submit">Ajouter</button>
        </form>
      </Modal>
    </>
  )
}

export default PrivateGarbagesTypes
