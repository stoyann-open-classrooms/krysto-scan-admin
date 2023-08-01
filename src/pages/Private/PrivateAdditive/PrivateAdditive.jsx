import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAdditive } from "../../../features/additive/additiveSlice";
import { toast } from "react-toastify";
import Spinner from "../../../components/shared/spinner/Spinner";
import { BackButton } from "../../../components/shared/BackButton";

function PrivateAdditive() {
  const { additive, isLoading, isError, message } = useSelector(
    (state) => state.additive
  );
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getAdditive(params.id));
  }, [dispatch, isError, message, params.id]);

  console.log(additive.data);
  if (isLoading || !additive.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }
  return (
    <section className="ticket-page">
      <header className="ticket-header">
        <BackButton url={"/private/additifs"} />
        <h2>
          nom : {additive.data.name}
          <span
            className="code"
            style={{
              backgroundColor: (() => {
                switch (additive.data.danger) {
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
            {additive.data.danger}
          </span>
        </h2>
        <h3>
          Date ajout : {new Date(additive.data.createdAt).toLocaleDateString()}{" "}
        </h3>
      </header>
      <hr />
      <div className="ticket-desc">
        <h3>Détails de l'additifs</h3>
        <p>{additive.data.description}</p>
      </div>
      <h2>
        {" "}
        Source :{" "}
        <span>
          {" "}
          <Link to={additive.data.source}>{additive.data.source}</Link>{" "}
        </span>{" "}
      </h2>
    </section>
  );
}

export default PrivateAdditive;
