
import { Outlet, Navigate } from 'react-router-dom'

function Private() {
  const user = JSON.parse(localStorage.getItem('userToken'))

    if (user === undefined || !user || user === null ) {
      
      return <Navigate to={'/connection'} />
    }
  else {

  return (
    <>
      <Outlet />
    </>
  )
  }
}

export default Private