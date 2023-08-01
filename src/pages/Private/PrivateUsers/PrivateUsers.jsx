import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import { getUsers } from '../../../features/user/userSlice'
import Ticket from '../../../components/shared/ticket/Ticket'

function PrivateUsers() {
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.user,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getUsers())
  }, [dispatch, isError, message])

  console.log(users)

  if (isLoading || !users.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des uttilisateurs</h1>
      </section>



      <div className="ticket-headings">
     <div>Username</div>
     <div>Email</div>
     <div>Role</div>
     <div>Créer le</div>
     <div>Modifier le</div>
   </div>

   {users.data.map((user) => (
       <Ticket key={user.id}>
       <div>{user.username}</div>
       <div>{user.email}</div>
       <div>{user.role}</div>
       <div>{new Date(user.createdAt).toLocaleDateString()}</div>
       <div>{new Date(user.updatedAt).toLocaleDateString()}</div>
     </Ticket>
   ))}


    </>
  )
}

export default PrivateUsers
