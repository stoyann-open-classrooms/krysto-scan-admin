import {  FaSignOutAlt } from "react-icons/fa";
import logo from '../../assets/logo_krysto.png'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const token = JSON.parse(localStorage.getItem("userToken"));
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to={"/"}>
         <img src={logo} alt="" />
        </Link>
      </div>

      <ul>
        {user ? (
          <>
          <li>
            <Link to={"/private/my-profil"} className="btn btn-sm">
              {" "}
             
              <FaSignOutAlt /> Mon profil{" "}
      
            </Link>
          </li>
          <li>
            <button className="btn btn-sm btn-danger" onClick={onLogout}>
              {" "}
              <FaSignOutAlt /> Déconection
            </button>
          </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </header>
  );
}

export default Header;
