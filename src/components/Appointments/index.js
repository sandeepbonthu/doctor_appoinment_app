import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    nameInput: '',
    genderInput: '',
    ageInput: '',
    emailInput: '',
    phoneNumberInput: '',
    addressInput: '',
    slotInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeGenderInput = event => {
    this.setState({genderInput: event.target.value})
  }

  onChangeAgeInput = event => {
    this.setState({ageInput: event.target.value})
  }

  onChangeEmailInput = event => {
    this.setState({emailInput: event.target.value})
  }

  onChangePhoneNumberInput = event => {
    this.setState({phoneNumberInput: event.target.value})
  }

  onChangeAddressInput = event => {
    this.setState({addressInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeSlotInput = event => {
    this.setState({slotInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {
      nameInput,
      genderInput,
      ageInput,
      emailInput,
      phoneNumberInput,
      addressInput,
      slotInput,
      dateInput,
    } = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      name: nameInput,
      gender: genderInput,
      age: ageInput,
      email: emailInput,
      phoneNumber: phoneNumberInput,
      address: addressInput,
      slot: slotInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      nameInput: '',
      genderInput: '',
      ageInput: '',
      emailInput: '',
      phoneNumberInput: '',
      addressInput: '',
      slotInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {
      nameInput,
      genderInput,
      ageInput,
      emailInput,
      phoneNumberInput,
      addressInput,
      slotInput,
      dateInput,
    } = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Appointment Form</h1>
                <hr className="hr_up" />
                <label htmlFor="name" className="label">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  value={nameInput}
                  onChange={this.onChangeNameInput}
                  className="input"
                  placeholder="Name"
                />
                <label htmlFor="gender" className="label">
                  GENDER
                </label>
                <div className="radio-container mb-2">
                  <label className="label">
                    <input
                      type="radio"
                      value="Male"
                      checked={genderInput === 'Male'}
                      onChange={this.onChangeGenderInput}
                    />
                    Male
                  </label>
                  <label className="label">
                    <input
                      type="radio"
                      value="Female"
                      checked={genderInput === 'Female'}
                      onChange={this.onChangeGenderInput}
                    />
                    Female
                  </label>
                  <label className="label">
                    <input
                      type="radio"
                      value="Other"
                      checked={genderInput === 'Other'}
                      onChange={this.onChangeGenderInput}
                    />
                    Other
                  </label>
                </div>
                <label htmlFor="age" className="label">
                  AGE
                </label>
                <input
                  type="text"
                  id="age"
                  value={ageInput}
                  onChange={this.onChangeAgeInput}
                  className="input"
                  placeholder="Age"
                />
                <label htmlFor="email" className="label">
                  EMAIL
                </label>
                <input
                  type="text"
                  id="email"
                  value={emailInput}
                  onChange={this.onChangeEmailInput}
                  className="input"
                  placeholder="Email"
                />
                <label htmlFor="phoneNumber" className="label">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  id="phoneNUmber"
                  value={phoneNumberInput}
                  onChange={this.onChangePhoneNumberInput}
                  className="input"
                  placeholder="Phone Number"
                />
                <label htmlFor="address" className="label">
                  ADDRESS
                </label>
                <input
                  type="textarea"
                  id="address"
                  value={addressInput}
                  onChange={this.onChangeAddressInput}
                  className="input"
                  placeholder="Address"
                />
                <label htmlFor="slot" className="label">
                  SLOT
                </label>
                <input
                  type="time"
                  id="slot"
                  value={slotInput}
                  onChange={this.onChangeSlotInput}
                  className="input"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Book Appointment
                </button>
              </form>
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
