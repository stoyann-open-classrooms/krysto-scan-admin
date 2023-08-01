import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProduct,
  addProductPhoto,
} from "../../../features/product/productSlice";
import { toast } from "react-toastify";
import Spinner from "../../../components/shared/spinner/Spinner";
import Modal from "../../../components/shared/modal/Modal";
import { BackButton } from "../../../components/shared/BackButton";
import ProductBanner from "../../../components/Products/ProductBanner";
import './product.css'
import ProductAdditives from "../../../components/Products/ProductAdditives";
import ProductIngredients from "../../../components/Products/ProductIngredients";
import ProductAllergens from "../../../components/Products/ProductAllergen";
function PrivateProductDetail() {
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  const [isNewPhotoModalOpen, setIsNewPhotoModalOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const openNewPhotoModal = () => {
    setIsNewPhotoModalOpen(true);
  };

  const closeNewPhotoModal = () => {
    setIsNewPhotoModalOpen(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photoFile);
    dispatch(
      addProductPhoto({
        productId: product.data.id,
        photo: formData,
      })
    )
      .then(() => {
        setIsNewPhotoModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(`Une erreur s'est produite, merci de réessayer.`);
      });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProduct(params.id));
  }, [dispatch, isError, message, params.id]);

  console.log(product.data);

  if (isLoading || !product.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
    <>
    <section className="ticket-page">
    <BackButton url={"/private/produits"} />
  
      <h1 className="product-title">{product.data.designation}</h1>
    <ProductBanner product={product.data}/>
      <section className="ticket-header">
      <button onClick={openNewPhotoModal} className="btn btn-sm">
        Ajouter une photo
      </button>
        <h2>
          Famille :
          <span>{product.data.productFamilly}</span>
        </h2>
        <h2>
          Categorie :
          <span>{product.data.productCategory.name}</span>
        </h2>
        <h2>
         Code barre : 
          <span>{product.data.codeBarre}</span>
        </h2>
        <h2>
         Marque 
          <span>{product.data.marque}</span>
        </h2>
        <h2>
         Nom génerique : 
          <span>{product.data.genericName}</span>
        </h2>
      </section>
      <hr />
<ProductIngredients product={product.data}/>
<ProductAllergens product={product.data}/>
     <ProductAdditives product={product.data}/>
     
    </section>


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
        </>

  );
}

export default PrivateProductDetail;
