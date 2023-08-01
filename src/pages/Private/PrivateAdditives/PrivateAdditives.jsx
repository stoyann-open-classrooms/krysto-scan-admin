import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Spinner from "../../../components/shared/spinner/Spinner";
import Modal from "../../../components/shared/modal/Modal";
import Ticket from "../../../components/shared/ticket/Ticket";
import { BackButton } from "../../../components/shared/BackButton";
import {
  getAdditives,
  createAdditive,
} from "../../../features/additive/additiveSlice";
import { Link } from "react-router-dom";

function PrivateAdditives() {
  const { additives, isLoading, isError, message } = useSelector(
    (state) => state.additive
  );

  const [isNewAdditiveModalOpen, setIsNewAdditiveModalOpen] = useState(false);
  const [newAdditiveData, setNewAdditiveData] = useState({
    code: "",
    name: "",
    bioAuthorization: false,
    function: "",
    danger: "",
    description: "",
    source:
      "https://www.quechoisir.org/comparatif-additifs-alimentaires-n56877/",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getAdditives());
  }, [dispatch, isError, message]);

  const openNewAdditiveModal = () => {
    setIsNewAdditiveModalOpen(true);
  };

  const closeNewAdditiveModal = () => {
    setIsNewAdditiveModalOpen(false);
  };

  const handleNewAdditiveChange = (e) => {
    const value = e.target.type === 'checkbox' ? String(e.target.checked) : e.target.value;
    setNewAdditiveData({
      ...newAdditiveData,
      [e.target.name]: value,
    });
  };
  

  const handleNewAdditiveSubmit = (e) => {
    e.preventDefault();
    dispatch(createAdditive(newAdditiveData))
      .then(() => {
        toast.success("Le nouvel additif a été créé avec succès.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(() => {
        toast.error(
          "Une erreur s'est produite lors de la création de l'additif."
        );
      });
    closeNewAdditiveModal();
  };

  console.log(additives);

  if (isLoading || !additives.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <section className="headings">
        <BackButton url={"/private/home"} />
        <h1>Gestion des additifs</h1>
      </section>
      <button onClick={openNewAdditiveModal} className="btn">
        Ajouter un nouvel additif
      </button>

      <div className="ticket-headings">
        <div>Code</div>
        <div>Nom</div>
        <div>Fonction</div>
        <div>Bio</div>
        <div>Danger</div>
      </div>

      {additives.data.map((additive) => (
        <Link to={`/private/additif/${additive.id}`} key={additive.id}>
          <Ticket>
            <div>{additive.code}</div>
            <div>{additive.name}</div>
            <div>{additive.function}</div>
            <div style={{ color: additive.bioAuthorization ? "green" : "red" }}>
              {additive.bioAuthorization ? "Oui" : "Non"}
            </div>
            <div
              style={{
                color: (() => {
                  switch (additive.danger) {
                    case "1-Acceptable":
                      return "green";
                    case "2-Tolérable":
                      return "#DAA520";
                    case "3 - Peu recommandable":
                      return "orange";
                    case "4-À éviter":
                      return "red";
                    default:
                      return "black";
                  }
                })(),
              }}
            >
              {additive.danger}
            </div>
          </Ticket>
        </Link>
      ))}

      {/* // modal ajout d'un additif */}
      <Modal
        titleModal="Ajouter un nouvel additif"
        btnTxt="Ajouter"
        isOpen={isNewAdditiveModalOpen}
        onClose={closeNewAdditiveModal}
      >
        {/* Formulaire de création du nouvel additif */}
        <form onSubmit={handleNewAdditiveSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className="form-group"
              style={{
                flex: "0 1 calc(50% - 10px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                name="code"
                onChange={handleNewAdditiveChange}
                value={newAdditiveData.code || ""}
              />
              <label htmlFor="code">Code</label>
            </div>

            <div
              className="form-group"
              style={{
                flex: "0 1 calc(50% - 10px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                name="bioAuthorization"
                onChange={handleNewAdditiveChange}
                checked={newAdditiveData.bioAuthorization || false}
              />
              <label htmlFor="bioAuthorization">Autorisation Bio</label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleNewAdditiveChange}
              value={newAdditiveData.name || ""}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className="form-group"
              style={{ flex: "0 1 calc(50% - 10px)" }}
            >
              <label htmlFor="function">Fonction</label>
              <select
                name="function"
                onChange={handleNewAdditiveChange}
                value={newAdditiveData.function || ""}
              >
                <option value="">Sélectionner...</option>
                <option value="">Sélectionner...</option>
                <option value="Colorant">Colorant</option>
                <option value="Support">Support</option>
                <option value="Conservateur">Conservateur</option>
                <option value="Conservateur, agent de blanchiment (freine le brunissement)">
                  Conservateur, agent de blanchiment (freine le brunissement)
                </option>
                <option value="Antioxydant">Antioxydant</option>
                <option value="Antioxydant, agent de texture">
                  Antioxydant, agent de texture
                </option>
                <option value="Régulateur d'acidité">
                  Régulateur d'acidité
                </option>
                <option value="Édulcorant">Édulcorant</option>
                <option value="Agent d'enrobage">Agent d'enrobage</option>
                <option value="Exhausteur de goût">Exhausteur de goût</option>
                <option value="Agent de traitement des farines">
                  Agent de traitement des farines
                </option>
                <option value="Antiagglomérant">Antiagglomérant</option>
                <option value="Séquestrant">Séquestrant</option>
                <option value="Agent de rétention de la couleur">
                  Agent de rétention de la couleur
                </option>
                <option value="Gaz de conditionnement">
                  Gaz de conditionnement
                </option>
                <option value="Humectant">Humectant</option>
              </select>
            </div>

            <div
              className="form-group"
              style={{ flex: "0 1 calc(50% - 10px)" }}
            >
              <label htmlFor="danger">Danger</label>
              <select
                name="danger"
                onChange={handleNewAdditiveChange}
                value={newAdditiveData.danger || ""}
              >
                <option value="">Sélectionner...</option>
                <option value="1-Acceptable">1-Acceptable</option>
                <option value="2-Tolérable">2-Tolérable</option>
                <option value="3 - Peu recommandable">
                  3 - Peu recommandable
                </option>
                <option value="4-À éviter">4-À éviter</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              required
              onChange={handleNewAdditiveChange}
              value={newAdditiveData.description || ""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              name="source"
              onChange={handleNewAdditiveChange}
              value={
                newAdditiveData.source ||
                "https://www.quechoisir.org/comparatif-additifs-alimentaires-n56877/"
              }
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
  );
}

export default PrivateAdditives;
