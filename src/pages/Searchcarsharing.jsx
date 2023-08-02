import React from 'react'
import '../styles/home.css'
import { Container, Row} from 'reactstrap'
import SearchBar from './../shared/SearchBar'
import Searchcard from '../shared/Searchcard'
const Searchcarsharing = () => {

   return(
   <>
      <Container >
         <Row>
            <h1 className='text-center mt-4 mb-4 font-bold text-4xl text-slate-700'>Where do you want to go?</h1>
            <SearchBar pos="mt-2"/>
         </Row>
      </Container>
   </>
   )
}

export default Searchcarsharing
