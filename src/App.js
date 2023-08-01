// REACT ROUTER
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// PRIVATE OUTLET
import Private from './pages/Private/Private.jsx'

// SCROOL COMPONENTS
import ScrollToTop from './components/shared/ScrollToTop.'

// STYLES
import './index.css'

// PAGES COMPONENTS
import Login from './pages/Login/Login.jsx'
import Header from './components/Header/Header.jsx'
// PRIVATE PAGES COMPONENTS
import PrivateHome from './pages/Private/PrivateHome/PrivateHome.jsx'
import PrivateUsers from './pages/Private/PrivateUsers/PrivateUsers.jsx'
import PrivateProducts from './pages/Private/PrivateProducts/PrivateProducts.jsx'
import PrivateProduct from './pages/Private/PrivateProduct/PrivateProduct.jsx'
import PrivateProductCategories from './pages/Private/PrivateProductCategories/PrivateProductCategories.jsx'
import PrivateEnseignes from './pages/Private/PrivateEnseignes/PrivateEnseignes.jsx'
import PrivateVoluntaryDropPoints from './pages/Private/PrivateVoluntaryDropPoints/PrivateVoluntaryDropPoints.jsx'
import PrivateScores from './pages/Private/PrivateScores/PrivateScores.jsx'
import PrivateMessages from './pages/Private/PrivateMessages/PrivateMessages.jsx'
import PrivatePriceRecords from './pages/Private/PrivatePriceRecords/PrivatePriceRecords.jsx'
import PrivateAdditives from './pages/Private/PrivateAdditives/PrivateAdditives.jsx'
import Footer from './components/Footer/Footer.jsx'
import PrivateEnseigne from './pages/Private/PrivateEnseigne/PrivateEnseigne.jsx'
import PrivateProductCategory from './pages/Private/PrivateProductCategory/PrivateProductCategory.jsx'
import PrivateGarbagesTypes from './pages/Private/PrivateGarbageTypes/PrivateGarbageTypes.jsx'
import PrivateVoluntaryDropPoint from './pages/Private/PrivateVoluntaryDropPoint/PrivateVoluntaryDropPoint.jsx'
import PrivateAdditive from './pages/Private/PrivateAdditive/PrivateAdditive.jsx'

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/private" element={<Private />}>
              <Route path="/private/home" element={<PrivateHome />} />
              <Route path="/private/uttilisateurs" element={<PrivateUsers />} />
              <Route path="/private/enseignes" element={<PrivateEnseignes />} />
              <Route
                path="/private/enseigne/:id"
                element={<PrivateEnseigne />}
              />
              <Route
                path="/private/produit-categories"
                element={<PrivateProductCategories />}
              />
              <Route
                path="/private/produit-categorie/:id"
                element={<PrivateProductCategory />}
              />
              <Route path="/private/produits" element={<PrivateProducts />} />
              <Route path="/private/product/:id" element={<PrivateProduct />} />

              <Route path="/private/additifs" element={<PrivateAdditives />} />
              <Route path="/private/additif/:id" element={<PrivateAdditive />} />
              <Route
                path="/private/prix-enregistree"
                element={<PrivatePriceRecords />}
              />
              <Route
                path="/private/points-apport-volontaire"
                element={<PrivateVoluntaryDropPoints />}
              />
              <Route
                path="/private/point-apport-volontaire/:id"
                element={<PrivateVoluntaryDropPoint />}
              />
              <Route
                path="/private/types-de-dechets"
                element={<PrivateGarbagesTypes />}
              />
              <Route path="/private/scores" element={<PrivateScores />} />
              <Route path="/private/messages" element={<PrivateMessages />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
