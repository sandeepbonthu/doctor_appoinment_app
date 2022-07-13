import './index.css'

const AppointmentIem = props => {
  const {appointmentDetails} = props
  const {
    name,
    gender,
    age,
    email,
    phoneNumber,
    address,
    slot,
    date,
  } = appointmentDetails

  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="title">Name: {name}</p>
        <p className="title">Gender: {gender}</p>
        <p className="title">Age: {age}</p>
        <p className="title">Email: {email}</p>
        <p className="title">Phone Number: {phoneNumber}</p>
        <p className="title">Address: {address}</p>
      </div>
      <p className="date">Date: {date}</p>
      <p className="time">Slot: {slot}</p>
    </li>
  )
}

export default AppointmentIem
