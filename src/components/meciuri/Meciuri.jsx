import React from 'react'
import "./Meciuri.scss"
import ListaMeciuriJucate from './listaMeciuriJucate/ListaMeciuriJucate'
import Clasament from "./clasament/Clasament"
import ListaMeciuriViitoare from './listaMeciuriViitoare/ListaMeciuriViitoare'
import UrmatorulMeci from '../meciuri/urmatorulMeci/UrmatorulMeci'

/*import CardStireFiltru from  '../meciuri/cardStireFiltru/CardStireFiltru'*/
const Meciuri = () => {

  const textMeciuri ={
    textLink: 'CLASAMENT➜',
    titluUltimeleRezultate: 'ULTIMELE REZULTATE',
    titluUrmatoareleRezultate: 'URMĂTOARELE MECIURI'
  }
  
  return (
    <div className='componentaMeciuri'>
    <div className='catreClasament'>
      <a href="#clasament" className='catreClasament'>{textMeciuri.textLink}</a>
    </div>
      <UrmatorulMeci/>
      <div className='containerUltimeleRezultate'>
        <p className='ultimeleRezultate'>{textMeciuri.titluUltimeleRezultate}</p>
        <ListaMeciuriJucate />
      </div>
      <div className='contMeciuriViitoare'>
        <p className='meciuriViitoare'>{textMeciuri.titluUrmatoareleRezultate}</p>
        <ListaMeciuriViitoare />
      </div>
      <div id='clasament'>
        <Clasament />
      </div> 
    </div>
  )
}

export default Meciuri