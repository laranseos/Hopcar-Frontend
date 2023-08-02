import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Form, FormGroup } from 'reactstrap'
import '../shared/search-bar.css'
import Alert from '../shared/Alert'
import { BASE_URL } from '../utils/config'


const SearchBar = ({pos}) => {
   const autoCompleteRef = useRef();

   const fromRef = useRef('')
   const toRef = useRef('')
   const todayRef = useRef(new Date())
   const passengersRef = useRef(0)
   const navigate = useNavigate()
   const Today = new Date().toISOString().slice(0, 10);

   const options = {
   fields: ["address_components", "geometry", "icon", "name"],
   types: ['(cities)']
   };
   useEffect(() => {
   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      fromRef.current,
      options
   );
   }, []);
 useEffect(() => {
   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      toRef.current,
      options
   );
   }, []);
   
   const searchHandler = async () => {
      const from = fromRef.current.value;
      const to = toRef.current.value;
      const today = todayRef.current.value;
      const passengers = passengersRef.current.value

      if (from === '' || to === '' || today === '' || passengers === '') {
            return false;
      }
      const res = await fetch(`${BASE_URL}/search/results?from=${from}&to=${to}&date=${today}&passengers=${passengers}`)
      const result = await res.json()
      console.log(result.success)
      if(!result.success){
         navigate('/searchresults',{state:false})
      }else{
         const {data} = result
         navigate(`/searchresults`, { state: data})
      }
      
   }

   return <Col lg="12">
      <div className={`${pos} search__bar`}>
         <Form className='d-flex align-items-center gap-4 forms'>
            <FormGroup className='d-flex gap-3 form__group form__group-fast m-0'>
               <span><i className='ri-map-pin-line'></i></span>
               <input type="text" className=' border-none rounded-full' placeholder='Where do you leave?' ref={fromRef} />
            </FormGroup>
            <FormGroup className='d-flex gap-3 form__group form__group-fast m-0'>
               <span><i className='ri-map-pin-time-line'></i></span>
               <input type="text" className=' border-none rounded-full' placeholder='Where do you want to go' ref={toRef} />
            </FormGroup>
            <FormGroup className='d-flex gap-3 form__group form__group-last m-0'>
               <span><i className='ri-calendar-line'></i></span>
               <input type="date" className=' border-none rounded-full'  placeholder={Today} ref={todayRef} />
            </FormGroup>
            <FormGroup className='d-flex gap-3 form__group form__group-last m-0'>
               <span><i className='ri-group-line'></i></span>
               <input type="number" className=' border-none rounded-full'  placeholder='0' ref={passengersRef} />
            </FormGroup>
            <FormGroup className='d-flex gap-3 form__group form__group-last m-0'>
               <span className='search__icon' type='submit' onClick={searchHandler}>
                  <i className='ri-search-line'></i>
               </span>
            </FormGroup>
         </Form>
      </div>
   </Col>
}

export default SearchBar