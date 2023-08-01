import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../features/product/productSlice";
import Modal from "../shared/modal/Modal";
import Spinner from "../shared/spinner/Spinner";
import { toast } from "react-toastify";

function ProductIngredients({ product }) {
  const [isNewIngredientModalOpen, setIsNewIngredientModalOpen] = useState(false);
  const [newIngredientData, setNewIngredientData] = useState({
    ingredient: "",
  });

  const dispatch = useDispatch();

  const openNewIngredientModal = () => {
    setIsNewIngredientModalOpen(true);
  };

  const closeNewIngredientModal = () => {
    setIsNewIngredientModalOpen(false);
  };

  const handleNewIngredientChange = (e) => {
    const { value } = e.target;
    setNewIngredientData({
      ingredient: value,
    });
  };

  const handleNewIngredientSubmit = (e) => {
    e.preventDefault();
    const newIngredients = newIngredientData.ingredient.split(","); // split ingredients by comma
    const updatedIngredients = product.ingredients.concat(newIngredients); // add new ingredients to existing ones
    dispatch(
      updateProduct({
        productId: product.id,
        updatedData: { ingredients: updatedIngredients },
      })
    )
      .then(() => {
        toast.success("Le produit a été mis à jour avec succès.");
        closeNewIngredientModal();
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
      <section className="ingredients-section">
        <div className="section-header">
          <h1 className="product-title">INGREDIENTS</h1>
          <button className="btn btn-danger" onClick={openNewIngredientModal}>
            Ajouter des ingrédients pour ce produit
          </button>
        </div>
        <h2 className="nb-ingredient">Nombre d'ingrédients :  <span> {product.ingredients.length}</span>  </h2>
       <div className="ingredient-container">

        {product.ingredients.map((ingredient, index) => (
            <div className="ingredient" key={index}>{ingredient}</div>
            ))}
            </div>
      </section>
      <hr />
      <Modal
        titleModal="Ajouter un ingrédient"
        isOpen={isNewIngredientModalOpen}
        onClose={closeNewIngredientModal}
      >
        <form onSubmit={handleNewIngredientSubmit}>
          <div className="form-group">
            <label htmlFor="ingredient">Ingrédients (séparés par des virgules)</label>
            <input
              id="ingredient"
              name="ingredient"
              onChange={handleNewIngredientChange}
              value={newIngredientData.ingredient || ""}
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

export default ProductIngredients;
