import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  getEnseignes,
  createEnseigne,
} from '../../../features/enseigne/enseigneSlice'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import Ticket from '../../../components/shared/ticket/Ticket'
import Modal from '../../../components/shared/modal/Modal'
import './privateEnseignes.css'
import { Link } from 'react-router-dom'

function PrivateEnseignes() {
  const { enseignes, isLoading, isError, message } = useSelector(
    (state) => state.enseigne,
  )

  const [isNewEnseigneModalOpen, setIsNewEnseigneModalOpen] = useState(false)
  const [newEnseigneData, setNewEnseigneData] = useState({
    name: '',
    photo: 'no-photo.png',
    web: '',
    address: '',
    groupe: '',
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getEnseignes())
  }, [dispatch, isError, message])

  const openNewEnseigneModal = () => {
    setIsNewEnseigneModalOpen(true)
  }

  const closeNewEnseigneModal = () => {
    setIsNewEnseigneModalOpen(false)
  }

  const handleNewEnseigneChange = (e) => {
    const { name, value } = e.target
    setNewEnseigneData({
      ...newEnseigneData,
      [name]: value,
    })
  }
  
  const handleNewEnseigneSubmit = (e) => {
    e.preventDefault()
    dispatch(createEnseigne(newEnseigneData))
      .then(() => {
        toast.success('La nouvelle enseigne a été créée avec succès.')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      })
      .catch(() => {
        toast.error(
          "Une erreur s'est produite lors de la création de l'enseigne.",
        )
      })
    closeNewEnseigneModal()
  }

  if (isLoading || !enseignes.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des enseignes</h1>
      </section>

      <button onClick={openNewEnseigneModal} className="btn">
        Ajouter une nouvelle enseigne
      </button>

      <div className="ticket-headings">
        <div>Nom</div>
        <div>Groupe</div>
        <div>Ville</div>
        <div>Créé le</div>
        <div>Modifié le</div>
      </div>
      {enseignes.data.map((enseigne) => (
  <Link key={enseigne.id} to={`/private/enseigne/${enseigne.id}`}>
    <Ticket className={enseigne.location.city === "" ? 'empty-city' : ''}>
      <div>{enseigne.name}</div>
      <div>{enseigne.groupe}</div>
      <div>{enseigne.location.city}</div>
      <div>{new Date(enseigne.createdAt).toLocaleDateString()}</div>
      <div>{new Date(enseigne.updatedAt).toLocaleDateString()}</div>
    </Ticket>
  </Link>
))}

      <Modal
        titleModal="Ajouter une nouvelle enseigne"
        btnTxt="Ajouter"
        isOpen={isNewEnseigneModalOpen}
        onClose={closeNewEnseigneModal}
      >
        <form onSubmit={handleNewEnseigneSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleNewEnseigneChange}
              value={newEnseigneData.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="web">Site web</label>
            <input
              type="text"
              name="web"
              onChange={handleNewEnseigneChange}
              value={newEnseigneData.web}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              name="address"
              required
              onChange={handleNewEnseigneChange}
              value={newEnseigneData.address}
            />
          </div>

          <div className="form-group">
            <label htmlFor="groupe">Groupe</label>
            <input
              type="text"
              name="groupe"
              onChange={handleNewEnseigneChange}
              value={newEnseigneData.groupe}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block btn-danger" type="submit">
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default PrivateEnseignes
