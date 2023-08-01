import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/shared/spinner/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // redirect when logged in
    if (isSuccess) {
      navigate(`/private/home`);
      toast.success("Vous etes connecter");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vous devez entrer votre email !");
    }
    if (!password) {
      toast.error("Merci d'entrez un mot de passe !");
    }
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const { email, password } = formData;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>

      {user ? (
        <>
         <section className="heading">
          Bienvenue sur l'administration de KRYSTO SCAN !
         </section>
          <Link className="btn " to={"/private/home"}>
            Acceder a l'administration
          </Link>
          <Link className="btn btn-reverse" to={"/documentation"}>
            Documentation
          </Link>
        </>
      ) : (
        <>
          <section className="heading">
            <h1>
              <FaSignInAlt /> Ce connecter
            </h1>
            <p>Connecter vous pour commencer vos collectes</p>
          </section>

          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  name="email"
                  type="mail"
                  id="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Entrer votre email"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  id="password"
                  value={password}
                  autocomplete="new-password"
                  onChange={onChange}
                  placeholder="Entrer votre mot de passe"
                />
              </div>
              <div className="form-group">
                <button className=" btn btn-block">Ce connecter</button>
              </div>
            </form>
          </section>
        
        </>
      )}
    </>
  );
}

export default Login;
