import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import { getEnseigne, addEnseignePhoto } from '../../../features/enseigne/enseigneSlice'
import Modal from '../../../components/shared/modal/Modal'

function PrivateEnseigne() {
  const { enseigne, isLoading, isError, message } = useSelector(
    (state) => state.enseigne,
  )
  const [isNewPhotoModalOpen, setIsNewPhotoModalOpen] = useState(false)
  const [photoFile, setPhotoFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()

  const openNewPhotoModal = () => {
    setIsNewPhotoModalOpen(true)
  }

  const closeNewPhotoModal = () => {
    setIsNewPhotoModalOpen(false)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    setPhotoFile(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const handlePhotoSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo', photoFile)
    dispatch(
      addEnseignePhoto({
        enseigneId: enseigne.data.id,
        photoData: formData,
      }),
    )
      .then(() => {
        setIsNewPhotoModalOpen(false)
        window.location.reload()
      })
      .catch((error) => {
        toast.error(`Une erreur s'est produite, merci de réessayer.`)
      })
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getEnseigne(params.id))
  }, [dispatch, isError, message, params.id])

  if (isLoading || !enseigne.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <section className="headings">
      <h1>{enseigne.data.name}</h1>
      <div className="container_img">
        <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${enseigne.data.photo}`}
          alt=""
        />

        <Modal
          titleModal="Ajouter ou changer votre photo"
          isOpen={isNewPhotoModalOpen}
          onClose={closeNewPhotoModal}
        >
          <div>
            <form className="add-photo-form" onSubmit={handlePhotoSubmit}>
              <div className="form-group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                {previewImage && (
                  <img
                    className="photo-preview"
                    src={previewImage}
                    alt="Preview"
                  />
                )}
              </div>
              <button className="btn" type="submit">
                Ajouter
              </button>
            </form>
          </div>
        </Modal>

        <button onClick={openNewPhotoModal} className="btn">
          Ajouter une photo
        </button>
      </div>
    </section>
  )
}

export default PrivateEnseigne
