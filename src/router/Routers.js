import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './../pages/Home'
import Searchcard from '../shared/Searchcard'
import Email from '../pages/register/Email'
import Name from '../pages/register/Name'
import Birthyear from '../pages/register/Birthyear'
import Gender from '../pages/register/Gender'
import Password from '../pages/register/Password'
import Emailpassword from '../pages/login/Emailpassword'
import Emailverify from '../pages/register/Emailverify'
import Phonenumber from '../pages/register/Phonenumber'
import Phoneverify from '../pages/register/Phoneverify'
import Searchcarsharing from '../pages/Searchcarsharing'


import Menu from '../pages/profile/menu'
import Avatar from '../pages/profile/Avatar'
import Bio from '../pages/profile/bio'
import Details from '../pages/profile/details'
import Licensenum from '../pages/profile/vehicle/licensenum'
import Names from '../pages/profile/details/Names'
import Birthyears from '../pages/profile/details/Birthyears'
import Genders from '../pages/profile/details/Gender'
import Passwords from '../pages/profile/details/Password'
import Phonenumbers from '../pages/profile/details/Phonenumber'

import Dates from '../pages/ride/Date'
import Time from '../pages/ride/Time'
import Passengers from '../pages/ride/Passengers'
import Price from '../pages/ride/Price'
import Pickup from '../pages/ride/Pickup'
import Dropoff from '../pages/ride/Dropoff'
import Info from '../pages/ride/Info'
import Ride from '../pages/ride/Ride'
import PublishAlert from '../pages/ride/PublishAlert'
import Rideplan from '../shared/Rideplan'
import RideDelete from '../pages/ride/RideDelete'
import ReservationDelete from '../pages/ride/ReservationDelete'

import EditDates from '../shared/EditRide/Date'
import EditTime from '../shared/EditRide/Time'
import EditPassengers from '../shared/EditRide/Passengers'
import EditPrice from '../shared/EditRide/Price'
import EditPickup from '../shared/EditRide/Pickup'
import EditDropoff from '../shared/EditRide/Dropoff'
import EditInfo from '../shared/EditRide/Info'
import EditRide from '../shared/EditRide/Ride'
import EditPublishAlert from '../shared/EditRide/PublishAlert'
import ReservationAlert from '../shared/ReservationAlert'
import Ridedetails from '../shared/Ridedetails'
import BookPlan from '../shared/BookPlan'
import { AuthContext } from '../context/AuthContext'
import Alert from '../shared/Alert'
import Myrides from '../pages/Myrides'
const Routers = () => {
   const {user}=useContext(AuthContext)
   return (
      <Routes>
         {user?
         <>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/myrides' element={<Myrides/>} />
         <Route path='/searchresults' element={<Searchcard/>} />

         <Route path='/register/email' element={<Email/>} />
         <Route path='/register/emailverify' element={<Emailverify/>} />
         <Route path="/register/name" element={<Name />} />
         <Route path='/register/birthyear' element={<Birthyear/>} />
         <Route path='/register/gender' element={<Gender/>} />
         <Route path='/register/password' element={<Password />} />
         <Route path='/register/phonenumber' element={<Phonenumber/>} />
         <Route path='/register/phoneverify' element={<Phoneverify/>} />

         <Route path='/login/emailpassword' element={<Emailpassword />} />

         <Route path='/searchcarsharing' element={<Searchcarsharing/>} />

         <Route path='/profile/menu' element={<Menu/>} />
         <Route path='/profile/avatar' element={<Avatar/>} />
         <Route path='/profile/details' element={<Details/>} />
         <Route path='/profile/bio' element={<Bio/>} />
         <Route path='/profile/vehicle/licensenum' element={<Licensenum />} />
         <Route path='/profile/details/name' element={<Names />} />
         <Route path='/profile/details/gender' element={<Genders />} />
         <Route path='/profile/details/phonenumber' element={<Phonenumbers />} />
         <Route path='/profile/details/birthday' element={<Birthyears />} />
         <Route path='/profile/details/password' element={<Passwords />} />

         <Route path='/ride/date' element={<Dates/>} />
         <Route path='/ride/time' element={<Time/>} />
         <Route path='/ride/passengers' element={<Passengers/>} />
         <Route path='/ride/price' element={<Price/>} />
         <Route path='/ride/pickup' element={<Pickup />} />
         <Route path='/ride/dropoff' element={<Dropoff />} />
         <Route path='/ride/info' element={<Info />} />
         <Route path='/ride/ride' element={<Ride />} />
         <Route path='/publishalert' element={<PublishAlert alert="Your ride is published! Passengers can now book&#10;and travel with you!"/>} />
         <Route path='/rideplan' element={<Rideplan />} />
         <Route path='/bookplan' element={<BookPlan />} />
         <Route path='/ride/edit/date' element={<EditDates/>} />
         <Route path='/ride/edit/time' element={<EditTime/>} />
         <Route path='/ride/edit/passengers' element={<EditPassengers/>} />
         <Route path='/ride/edit/price' element={<EditPrice/>} />
         <Route path='/ride/edit/pickup' element={<EditPickup />} />
         <Route path='/ride/edit/dropoff' element={<EditDropoff />} />
         <Route path='/ride/edit/info' element={<EditInfo />} />
         <Route path='/ride/edit/ride' element={<EditRide />} />
         <Route path='/ride/delete' element={<RideDelete />} />
         <Route path='/bookplan/rides/deleteReservation' element={<ReservationDelete />} />

         <Route path='/edit/publishalert' element={<EditPublishAlert alert="Your ride is published! Passengers can now book&#10;and travel with you!"/>} />
         <Route path='/rideplan' element={<Rideplan />} />
         
         <Route path='/alert' element={<Alert />} />

         <Route path='/rides/details' element={<Ridedetails />} />
         <Route path='/rides/booked' element={<ReservationAlert />} />
         </>
         :
         <>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home />} />
         <Route path='/myrides' element={<Myrides/>} />
         <Route path='/ride' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/searchresults' element={<Navigate to='/login/emailpassword'/>} />

         <Route path='/register/email' element={<Email/>} />
         <Route path='/register/emailverify' element={<Emailverify/>} />
         <Route path="/register/name" element={<Name />} />
         <Route path='/search/results' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/register/birthyear' element={<Birthyear/>} />
         <Route path='/register/gender' element={<Gender/>} />
         <Route path='/register/password' element={<Password />} />
         <Route path='/register/phonenumber' element={<Phonenumber/>} />
         <Route path='/register/phoneverify' element={<Phoneverify/>} />

         <Route path='/login/emailpassword' element={<Emailpassword />} />

         <Route path='/searchcarsharing' element={<Navigate to='/login/emailpassword'/>} />

         <Route path='/profile/menu' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/profile/avatar' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/profile/details' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/profile/bio' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/profile/vehicle/licensenum' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/profile/details/name' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/profile/details/gender' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/profile/details/phonenumber' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/profile/details/birthday' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/profile/details/password' element={<Navigate to='/login/emailpassword'/>} />

         <Route path='/ride/date' element={<Navigate to='/login/emailpassword'/>}/>
         <Route path='/ride/time' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/passengers' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/price' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/pickup' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/dropoff' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/info' element={<Navigate to='/login/emailpassword'/>}  />
         <Route path='/ride/ride' element={<Navigate to='/login/emailpassword'/>}  />
         <Route path='/rides/details' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/rides/booked' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/edit/date' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/edit/time' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/edit/passengers' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/edit/price' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/edit/pickup' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/edit/dropoff' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/edit/info' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/edit/ride' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/ride/delete' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/edit/publishalert' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='bookplan/rides/deleteReservation' element={<Navigate to='/login/emailpassword'/>} />

         <Route path='/rideplan' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/bookplan' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/alert' element={<Navigate to='/login/emailpassword'/>} />
         <Route path='/publishalert' element={<Navigate to='/login/emailpassword'/>} />


         </>}
      </Routes>
   )
}
export default Routers