import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import { getMessages } from '../../../features/message/messageSlice'

function PrivateMessages() {
  const { messages, isLoading, isError, message } = useSelector(
    (state) => state.message,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getMessages())
  }, [dispatch, isError, message])

  console.log(messages)

  if (isLoading || !messages.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des messages</h1>
      </section>
    </>
  )
}

export default PrivateMessages
