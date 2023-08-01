import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import { getNutriScores } from '../../../features/nutriScore/nutriScoreSlice'
import { getNovaScores } from '../../../features/novaScore/novaScoreSlice'
import { getEcoScores } from '../../../features/ecoScore/ecoScoreSlice'
import Ticket from '../../../components/shared/ticket/Ticket'
import './PrivateScore.css'


function PrivateScores() {
  const { ecoScores, isLoading, isError, message } = useSelector(
    (state) => state.ecoScore,
  )
  const { novaScores } = useSelector(
    (state) => state.novaScore,
  )
  const { nutriScores } = useSelector(
    (state) => state.nutriScore,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getNutriScores())
    dispatch(getNovaScores())
    dispatch(getEcoScores())
  }, [dispatch, isError, message])

  console.log(novaScores, nutriScores,ecoScores)

  if (isLoading || !ecoScores.data || !nutriScores.data || !novaScores.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des scores</h1>
      </section>
      
      <h3>Nova scores</h3>
      <div className="ticket-headings">
     <div>Score</div>
     <div>détails</div>
     <div>photo</div>
     <div>Créer le</div>
     <div>Modifier le</div>
   </div>

   {novaScores.data.map((novaScore) => (
       <Ticket key={novaScore.id}>
       <div>{novaScore.score}</div>
       <div>{novaScore.detail}</div>
       <div className='ticket-img-container'>
       <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${novaScore.photos}`}
          alt=""
        />
       </div>
       <div>{new Date(novaScore.createdAt).toLocaleDateString()}</div>
       <div>{new Date(novaScore.updatedAt).toLocaleDateString()}</div>
     </Ticket>
   ))}
      <h3>Nutri scores</h3>
      <div className="ticket-headings">
     <div>Score</div>
     <div>détails</div>
     <div>photo</div>
     <div>Créer le</div>
     <div>Modifier le</div>
   </div>

   {nutriScores.data.map((nutriScore) => (
       <Ticket key={nutriScore.id}>
       <div>{nutriScore.score}</div>
       <div>{nutriScore.detail}</div>
       <div className='ticket-img-container'>
       <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${nutriScore.photos}`}
          alt=""
        />
       </div>
       <div>{new Date(nutriScore.createdAt).toLocaleDateString()}</div>
       <div>{new Date(nutriScore.updatedAt).toLocaleDateString()}</div>
     </Ticket>
   ))}
      <h3>Eco scores</h3>
      <div className="ticket-headings">
     <div>Score</div>
     <div>détails</div>
     <div>photo</div>
     <div>Créer le</div>
     <div>Modifier le</div>
   </div>

   {ecoScores.data.map((ecoScore) => (
       <Ticket key={ecoScore.id}>
       <div>{ecoScore.score}</div>
       <div>{ecoScore.detail}</div>
       <div className='ticket-img-container'>
       <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${ecoScore.photos}`}
          alt=""
        />
       </div>
       <div>{new Date(ecoScore.createdAt).toLocaleDateString()}</div>
       <div>{new Date(ecoScore.updatedAt).toLocaleDateString()}</div>
     </Ticket>
   ))}

    </>
  )
}

export default PrivateScores
