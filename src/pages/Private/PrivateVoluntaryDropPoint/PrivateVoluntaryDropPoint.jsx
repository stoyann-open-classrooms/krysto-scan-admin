import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVoluntaryDropPoint } from "../../../features/voluntaryDropPoint/voluntaryDropPointSlice";
import { toast } from "react-toastify";
import Spinner from "../../../components/shared/spinner/Spinner";

function PrivateVoluntaryDropPoint() {
  const { voluntaryDropPoint, isLoading, isError, message } = useSelector(
    (state) => state.voluntaryDropPoint
  );
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getVoluntaryDropPoint(params.id));
  }, [dispatch, isError, message, params.id]);

  console.log(voluntaryDropPoint.data);
  if (isLoading || !voluntaryDropPoint.data) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }
  return (
    <section className="headings">
      <h1>{voluntaryDropPoint.data.organisme}</h1>
     
    </section>
  );
}

export default PrivateVoluntaryDropPoint;
