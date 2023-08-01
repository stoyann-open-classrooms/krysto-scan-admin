
import Loader from '../../../assets/krysto_loader.svg'
import './spinner.css'
function Spinner() {
  return (
    <div className='loadingSpinnerContainer'>
        <img src={Loader} alt="" />
    </div>
  )
}

export default Spinner