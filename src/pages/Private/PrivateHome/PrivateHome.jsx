import { Link } from 'react-router-dom'

function PrivateHome() {
  return (
    <>
      <section className="heading">
        <h1>Bienvenue sur l'administration de l'application KRYSTO SCAN</h1>
      </section>
      <section>
      <Link className="btn" to={'/private/uttilisateurs'}>
          Gestion des uttilisateurs
        </Link>
        <Link className="btn" to={'/private/enseignes'}>
          Gestion des enseignes
        </Link>
        <Link className="btn" to={'/private/produit-categories'}>
          Gestion des catégories de produit
        </Link>
        <Link className="btn" to={'/private/produits'}>
          Gestion des produits
        </Link>
        <Link className="btn" to={'/private/prix-enregistree'}>
          Gestion des prix enregistrées
        </Link>
        <Link className="btn" to={'/private/points-apport-volontaire'}>
          Gestion des points d'apport volontaire
        </Link>
        <Link className="btn" to={'/private/scores'}>
          Gestion des scores
        </Link>
        <Link className="btn" to={'/private/additifs'}>
          Gestion des additifs
        </Link>
        <Link className="btn" to={'/private/types-de-dechets'}>
          Gestion des types de déchets
        </Link>
        <Link className="btn" to={'/private/messages'}>
          Gestion des messages
        </Link>
      </section>
    </>
  )
}

export default PrivateHome
