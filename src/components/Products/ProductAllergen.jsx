import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../features/product/productSlice";
import Modal from "../shared/modal/Modal";
import { toast } from "react-toastify";

function ProductAllergens({ product }) {
  const [isNewAllergenModalOpen, setIsNewAllergenModalOpen] = useState(false);
  const [newAllergenData, setNewAllergenData] = useState({
    allergen: "",
  });

  const dispatch = useDispatch();

  const openNewAllergenModal = () => {
    setIsNewAllergenModalOpen(true);
  };

  const closeNewAllergenModal = () => {
    setIsNewAllergenModalOpen(false);
  };

  const handleNewAllergenChange = (e) => {
    const { value } = e.target;
    setNewAllergenData({
      allergen: value,
    });
  };

  const handleNewAllergenSubmit = (e) => {
    e.preventDefault();
    const newAllergens = newAllergenData.allergen.split(","); // split allergens by comma
    const updatedAllergens = product.allergens.concat(newAllergens); // add new allergens to existing ones
    dispatch(
      updateProduct({
        productId: product.id,
        updatedData: { allergens: updatedAllergens },
      })
    )
      .then(() => {
        toast.success("Le produit a été mis à jour avec succès.");
        closeNewAllergenModal();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error(`Une erreur est survenue, merci de réessayer.`);
      });
  };

  return (
    <>
      <section className="allergens-section">
        <div className="section-header">
          <h1 className="product-title">ALLERGENS</h1>
          <button className="btn btn-danger" onClick={openNewAllergenModal}>
            Ajouter des allergènes pour ce produit
          </button>
        </div>
        <h2 className="nb-allergen">Nombre d'allergènes :  <span> {product.allergens.length}</span>  </h2>
       <div className="allergen-container">

        {product.allergens.map((allergen, index) => (
            <div className="allergen" key={index}>{allergen}</div>
            ))}
            </div>
      </section>
      <hr />
      <Modal
        titleModal="Ajouter un allergène"
        isOpen={isNewAllergenModalOpen}
        onClose={closeNewAllergenModal}
      >
        <form onSubmit={handleNewAllergenSubmit}>
          <div className="form-group">
            <label htmlFor="allergen">Allergènes (séparés par des virgules)</label>
            <input
              id="allergen"
              name="allergen"
              onChange={handleNewAllergenChange}
              value={newAllergenData.allergen || ""}
            />
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

export default ProductAllergens;