import './ticket.css'

function Ticket({children, className = ''}) {
  return <div className={`ticket ${className}`}>
    {children}
  </div>;
}

export default Ticket;