import React, { Fragment, useState } from 'react'
import Error from './Error';
import PropTypes from "prop-types"

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {
  
  // definir el state
  const [cantidad, guardarCantidad] = useState(0)
  const [error, guardarError] = useState(false)

  // funcion que lee el presupuesto
  const definirPresupuesto = (event) => {
    guardarCantidad(parseInt(event.target.value, 10))
  }

  // submit para definir el presupuesto
  const agregarPresupuesto = (event) => {
    event.preventDefault()

    // validar
    if (cantidad < 1 || isNaN(cantidad)) {
      guardarError(true)
      return;
    }
    
    // si se pasa la validacion
    guardarError(false)
    guardarPresupuesto(cantidad)
    guardarRestante(cantidad)
    actualizarPregunta(false)
  }

  return ( 
    <Fragment>
      <h2>Coloca tu presupuesto</h2>

      { error && <Error mensaje="El presupuesto es incorrecto" /> }

      <form
        onSubmit={agregarPresupuesto}
      >
        <input
          type="number"
          className="u-full-width"
          placeholder="Coloca tu presupuesto"
          onChange={definirPresupuesto}
        />

        <input 
          type="submit"
          className="button-primary u-full-width"
          value="Definir Presupuesto"
        />
      </form>
    </Fragment>
  );
}

Pregunta.propTypes = {
  guardarPresupuesto: PropTypes.func.isRequired, 
  guardarRestante: PropTypes.func.isRequired,
  actualizarPregunta: PropTypes.func.isRequired,
}
 
export default Pregunta;