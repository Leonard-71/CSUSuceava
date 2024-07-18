import React  from 'react'
import "./ContainerClasament.scss";

import "../../meciuri/clasament/script"

import UltimulMeci from './ultimulMeci/UltimulMeci';
import UrmatorulMeci from './urmatorulMeci/UrmatorulMeci';
import SectiuneClasament from './sectiuneClasament/SectiuneClasament';

const ContainerClasament = () => {

  return (
    <div className="meciuri-container">
      <UltimulMeci />
      <UrmatorulMeci/>
      <SectiuneClasament />  
  </div>
  )
}

export default ContainerClasament
