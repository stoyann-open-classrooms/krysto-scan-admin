import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { createProduct } from '../../features/product/productSlice'

import { getProductCategories } from '../../features/productCategory/productCategorySlice'
import { getNutriScores } from '../../features/nutriScore/nutriScoreSlice'
import { getNovaScores } from '../../features/novaScore/novaScoreSlice'
import { getEcoScores } from '../../features/ecoScore/ecoScoreSlice'

function AddProductForm({ closeModal }) {
  const [newProductData, setNewProductData] = useState({
    productFamilly: 'Alimentaires',
    productCategory: '',
    codeBarre: '',
    marque: '',
    designation: '',
    genericName: '',
    quantity: '',
    ecoScore: '',
    nutriScore: '',
    novaScore: '',
    provenanceCountry: '',
    transportation: 'Importée',
  })

  const { productCategories, isError, message } = useSelector(
    (state) => state.productCategory,
  )
  const { novaScores } = useSelector((state) => state.novaScore)
  const { ecoScores } = useSelector((state) => state.ecoScore)
  const { nutriScores } = useSelector((state) => state.nutriScore)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getProductCategories())
    dispatch(getNovaScores())
    dispatch(getEcoScores())
    dispatch(getNutriScores())
  }, [dispatch, isError, message])

  const handleNewProductChange = (e) => {
    const { name, value } = e.target
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleNewProductSubmit = (e) => {
    e.preventDefault()

    dispatch(createProduct(newProductData))
      .then(() => {
        toast.success('Le nouveau produit recyclable a été créé avec succès.')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
        console.log(newProductData);
      })
      .catch(() => {
        toast.error(
          "Une erreur s'est produite lors de la création du produit recyclable.",
        )
      })
    closeModal()
  }

  if (
    !productCategories.data ||
    !ecoScores.data ||
    !novaScores.data ||
    !nutriScores.data
  ) {
    return <h3>Loading...</h3>
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <form onSubmit={handleNewProductSubmit}>
        <div className="form-group">
          <label htmlFor="productFamilly">Famille de produit</label>
          <select
            name="productFamilly"
            onChange={handleNewProductChange}
            value={newProductData.productFamilly}
          >

            <option value="Alimentaires">Alimentaires</option>
            <option value="Cosmétiques">Cosmétiques</option>
            <option value="Animaux">Animaux</option>
            <option value="Vêtements et accessoires">Vêtements et accessoires</option>
            <option value="Électronique">Électronique</option>
            <option value="Maison et jardin">Maison et jardin</option>
            <option value="Santé">Santé</option>
            <option value="Livres et médias">Livres et médias</option>
            <option value="Sport et loisirs">Sport et loisirs</option>
            <option value="Bébé et enfant">Bébé et enfant</option>
            <option value="Automobile">Automobile</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        {newProductData.productFamilly === 'Alimentaires' && (
          <>
            <div className="form-group">
              <label htmlFor="productCategory">Catégorie de produit</label>
              <select
                name="productCategory"
                onChange={handleNewProductChange}
                value={newProductData.productCategory}
              >
                <option value="">Selectionner</option>
                {productCategories.data.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>


            <div style={{ display: "flex", justifyContent: "space-between" }}>
  <div className="form-group" style={{ flex: "0 1 calc(50% - 10px)" }}>
    <label htmlFor="nutriScore">Nutri score</label>
    <select
      name="nutriScore"
      onChange={handleNewProductChange}
      value={newProductData.nutriScore}
    >
      <option default value="">
        Selectioner
      </option>
      {nutriScores.data.map((nutriScore) => (
        <option value={nutriScore.id} key={nutriScore.id}>
          {nutriScore.score}
        </option>
      ))}
    </select>
  </div>

  <div className="form-group" style={{ flex: "0 1 calc(50% - 10px)" }}>
    <label htmlFor="novaScore">Nova score</label>
    <select
      name="novaScore"
      onChange={handleNewProductChange}
      value={newProductData.novaScore}
    >
      <option default value="">
        Selectioner
      </option>
      {novaScores.data.map((novaScore) => (
        <option value={novaScore.id} key={novaScore.id}>
          {novaScore.score}
        </option>
      ))}
    </select>
  </div>
</div>
          </>
        )}

        
            <div className="form-group">
          <label htmlFor="designation">Désignation</label>
          <input
            type="text"
            name="designation"
            required
            onChange={handleNewProductChange}
            value={newProductData.designation}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
  <div className="form-group" style={{ flex: "0 1 calc(50% - 10px)" }}>
    <label htmlFor="codeBarre">Code barre</label>
    <input
      type="text"
      name="codeBarre"
      required
      onChange={handleNewProductChange}
      value={newProductData.codeBarre}
    />
  </div>

  <div className="form-group" style={{ flex: "0 1 calc(50% - 10px)" }}>
    <label htmlFor="genericName">Nom générique</label>
    <input
      type="text"
      name="genericName"
      onChange={handleNewProductChange}
      value={newProductData.genericName}
    />
  </div>
</div>

         

     
        <div style={{ display: "flex", justifyContent: "space-between" }}>
  <div className="form-group" style={{ flex: "0 1 calc(50% - 10px)" }}>
    <label htmlFor="quantity">Quantité</label>
    <input
      type="text"
      name="quantity"
      onChange={handleNewProductChange}
      value={newProductData.quantity}
    />
  </div>

  <div className="form-group" style={{ flex: "0 1 calc(50% - 10px)" }}>
    <label htmlFor="marque">Marque</label>
    <input
      type="text"
      name="marque"
      required
      onChange={handleNewProductChange}
      value={newProductData.marque}
    />
  </div>
</div>
        
        <div className="form-group">
          <label htmlFor="provenanceCountry">Pays de provenance</label>
          <input
            type="text"
            name="provenanceCountry"
            onChange={handleNewProductChange}
            value={newProductData.provenanceCountry}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
  <div className="form-group" style={{ flex: "0 1 calc(50% - 10px)" }}>
    <label htmlFor="transportation">Transportation</label>
    <select
      name="transportation"
      onChange={handleNewProductChange}
      value={newProductData.transportation}
    >
      <option value="Fabriquée en Nouvelle-Calédonie">Fabriquée en Nouvelle-Calédonie</option>
      <option value="Transformée en Nouvelle-Calédonie">Transformée en Nouvelle-Calédonie</option>
      <option value="Inconnu">Inconnu</option>
      <option value="Importée">Importée</option>
    </select>
  </div>

  <div className="form-group" style={{ flex: "0 1 calc(50% - 10px)" }}>
    <label htmlFor="ecoScore">Eco score</label>
    <select
      name="ecoScore"
      onChange={handleNewProductChange}
      value={newProductData.ecoScore}
    >
      <option default value="">
        Selectioner
      </option>
      {ecoScores.data.map((ecoScore) => (
        <option value={ecoScore.id} key={ecoScore.id}>
          {ecoScore.score}
        </option>
      ))}
    </select>
  </div>
</div>


        
        
        <div className="form-group">
          <button className="btn btn-block btn-danger" type="submit">
            Créer
          </button>
        </div>
      </form>
    </>
  )
}

export default AddProductForm
