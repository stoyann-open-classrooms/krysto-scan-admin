import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdditives } from "../../features/additive/additiveSlice";
import { updateProduct } from "../../features/product/productSlice";
import Modal from "../shared/modal/Modal";
import Spinner from "../shared/spinner/Spinner";
import { toast } from "react-toastify";
import { AiOutlineClose } from 'react-icons/ai';

function ProductAdditives({ product }) {
  const [isNewAdditiveModalOpen, setIsNewAdditiveModalOpen] = useState(false);
  const [newAdditiveData, setNewAdditiveData] = useState({
    additiveCode: [],
  });

  const { additives, isLoading, isError, message } = useSelector(
    (state) => state.additive
  );

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
    const { name, value } = e.target;
    setNewAdditiveData((prevData) => ({
      ...prevData,
      [name]: Array.from(e.target.selectedOptions, option => option.value),
    }));
  };

  const handleNewAdditiveSubmit = (e) => {
    e.preventDefault();
    const existingAdditiveIds = product.additives.map((additive) => additive.id);
    const allAdditives = existingAdditiveIds.concat(newAdditiveData.additiveCode);
    dispatch(
      updateProduct({
        productId: product.id,
        updatedData: { additives: allAdditives },
      })
    )
      .then(() => {
        toast.success("Le produit a été mis à jour avec succès.");
        closeNewAdditiveModal();
        setTimeout(() => {
          window.location.reload();
        }, 3000);  // Recharge la page après 3 secondes
      })
      .catch((error) => {
        toast.error(`Une erreur est survenue, merci de réessayer.`);
      });
  };


  const handleAdditiveDelete = (additiveId) => {
    // Filtrer le tableau d'additifs pour exclure l'additif à supprimer
    const updatedAdditives = product.additives.filter(additive => additive.id !== additiveId);
  
    // Convertir le tableau d'additifs mis à jour en un tableau d'ID d'additifs
    const updatedAdditiveIds = updatedAdditives.map(additive => additive.id);
  
    // Appeler l'action Redux pour mettre à jour le produit
    dispatch(
      updateProduct({
        productId: product.id,
        updatedData: { additives: updatedAdditiveIds },
      })
    )
      .then(() => {
        toast.success("L'additif a été supprimé avec succès.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);  // Recharge la page après 3 secondes
      })
      .catch((error) => {
        toast.error(`Une erreur est survenue, merci de réessayer.`);
      });
  };
  
  if (isLoading || !additives.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
      <section className="additives-section">
        <div className="section-header">
          <h1 className="product-title">ADDITIFS</h1>
          <button className="btn btn-danger" onClick={openNewAdditiveModal}>
            Ajouter des additifs pour ce produit
          </button>
        </div>
        <div className="additives-card-container">

        {product.additives.length === 0 ? (
            <p>Aucun additif enregistré pour ce produit.</p>
            ) : (
                
                product.additives.map((additive) => (
                    <div
                      className="additive-card"
                      title={additive.name}
                      key={additive.id}
                      style={{
                        backgroundColor: (() => {
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
                      {additive.code}
                      <AiOutlineClose
                        className="delete-icon"
                        onClick={() => handleAdditiveDelete(additive.id)}
                      />
                    </div>
                  ))
                )}
              </div>
      </section>
      <hr />
      <Modal
        titleModal="Ajouter un additif"
        isOpen={isNewAdditiveModalOpen}
        onClose={closeNewAdditiveModal}
      >
        <form onSubmit={handleNewAdditiveSubmit}>
          <div className="form-group">
            <label htmlFor="additiveCode">Additifs</label>
            <select
              id="additiveCode"
              name="additiveCode"
              onChange={handleNewAdditiveChange}
              value={newAdditiveData.additiveCode || []}
              multiple
            >
              {additives.data.map((additive) => (
                <option key={additive.id} value={additive.id}>
                  {additive.code}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ProductAdditives;
