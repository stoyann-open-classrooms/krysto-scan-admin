

function ProductBanner({ product }) {
  return (
    <section className="productBanner">
      <div className="img-container">
        <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.photo}`}
          alt=""
        />
      </div>
      <div className="score-container">
        <div className="score">
        <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.nutriScore.photos}`}
          alt=""
        />
        </div>
        <div className="score">
        <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.novaScore.photos}`}
          alt=""
        />
        </div>
        <div className="score">
        <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${product.ecoScore.photos}`}
          alt=""
        />
        </div>
        
      </div>
    </section>
  );
}

export default ProductBanner;
