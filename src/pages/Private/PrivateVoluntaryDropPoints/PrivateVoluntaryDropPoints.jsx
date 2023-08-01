import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../../components/shared/spinner/Spinner";
import Modal from "../../../components/shared/modal/Modal";
import {
  getVoluntaryDropPoints,
  createVoluntaryDropPoint,
  deleteVoluntaryDropPoint,
} from "../../../features/voluntaryDropPoint/voluntaryDropPointSlice";
import Ticket from "../../../components/shared/ticket/Ticket";
import { BackButton } from "../../../components/shared/BackButton";
import { getGarbageTypes } from "../../../features/garbageType/garbageTypeSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

function PrivateVoluntaryDropPoints() {
  const { voluntaryDropPoints, isLoading, isError, message } = useSelector(
    (state) => state.voluntaryDropPoint
  );
  const { garbageTypes } = useSelector((state) => state.garbageType);
  const [
    isNewVoluntaryDropPointModalOpen,
    setIsNewVoluntaryDropPointModalOpen,
  ] = useState(false);
  const [newVoluntaryDropPointData, setNewVoluntaryDropPointData] = useState({
    organisme: "",
    adresse: "",
    garbageTypes: "",
    email: "",
    telephone: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getVoluntaryDropPoints());
    dispatch(getGarbageTypes());
  }, [dispatch, isError, message]);

  const openNewVoluntaryDropPointModal = () => {
    setIsNewVoluntaryDropPointModalOpen(true);
  };

  const closeNewVoluntaryDropPointModal = () => {
    setIsNewVoluntaryDropPointModalOpen(false);
  };

  const handleNewVoluntaryDropPointChange = (e) => {
    const { name, value } = e.target;
    setNewVoluntaryDropPointData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewVoluntaryDropPointSubmit = (e) => {
    e.preventDefault();
    dispatch(createVoluntaryDropPoint(newVoluntaryDropPointData))
      .then(() => {
        toast.success(
          "Le nouveau point de dépôt volontaire a été créé avec succès."
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        toast.error(
          "Une erreur s'est produite lors de la création du point de dépôt volontaire."
        );
      });
    closeNewVoluntaryDropPointModal();
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce point de dépôt volontaire ?"
      )
    ) {
      try {
        await dispatch(deleteVoluntaryDropPoint(id));
        toast.success("Point de dépôt volontaire supprimé avec succès !");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } catch (error) {
        toast.error(
          "Erreur lors de la suppression du point de dépôt volontaire"
        );
      }
    }
  };

  if (isLoading || !voluntaryDropPoints.data || !garbageTypes.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <button onClick={openNewVoluntaryDropPointModal} className="btn">
        Créer un nouveau point de dépôt volontaire
      </button>
      <section className="headings">
        <BackButton url={"/private/home"} />
        <h1>Gestion des points d'apport volontaire</h1>
      </section>

      <div className="ticket-headings">
        <div>Organisme</div>
        <div>adresse</div>
        <div>Ville</div>
        <div>Déchets</div>
        <div>Supprimer</div>
      </div>

      {voluntaryDropPoints.data.map((dropPoint) => (

        <Link  key={dropPoint.id} to={`/private/point-apport-volontaire/${dropPoint.id}`}>
        <Ticket>
          <div>{dropPoint.organisme}</div>
          <div>{dropPoint.location.street}</div>
          <div>{dropPoint.location.city}</div>
          {dropPoint.garbageTypes.map((garbageType, index) => (
            <div key={index}>{garbageType.name}</div>
            ))}

          <button
            onClick={(event) => handleDelete(dropPoint.id, event)}
            style={{ background: "none", border: "none", color: "red" }}
            >
            <AiOutlineDelete size={20} />
          </button>
        </Ticket>
            </Link>
      ))}

      <Modal
        titleModal="Créer un nouveau point de dépôt volontaire"
        isOpen={isNewVoluntaryDropPointModalOpen}
        onClose={closeNewVoluntaryDropPointModal}
      >
        <form onSubmit={handleNewVoluntaryDropPointSubmit}>
          <div className="form-group">
            <label htmlFor="organisme">Organisme</label>
            <input
              type="text"
              name="organisme"
              required
              onChange={handleNewVoluntaryDropPointChange}
              value={newVoluntaryDropPointData.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="adresse">Adresse</label>
            <input
              type="text"
              name="adresse"
              required
              onChange={handleNewVoluntaryDropPointChange}
              value={newVoluntaryDropPointData.adresse}
            />
          </div>
          <div className="form-group">
            <label htmlFor="garbageTypes">Type de déchet</label>
            <select
              name="garbageTypes"
              onChange={handleNewVoluntaryDropPointChange}
              value={newVoluntaryDropPointData.garbageTypes}
            >
              <option value="">Sélectionner</option>
              {garbageTypes.data.map((garbageType) => (
                <option value={garbageType.id} key={garbageType.id}>
                  {garbageType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleNewVoluntaryDropPointChange}
              value={newVoluntaryDropPointData.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telephone">Téléphone</label>
            <input
              type="tel"
              name="telephone"
              required
              onChange={handleNewVoluntaryDropPointChange}
              value={newVoluntaryDropPointData.telephone}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block btn-danger" type="submit">
              Créer
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default PrivateVoluntaryDropPoints;
