import React, { useState } from 'react';
import Error from "./Error"
import shortid from "shortid"
import PropTypes from "prop-types"

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

  const [nombre, guardarNombre] = useState("")
  const [cantidad, guardarCantidad] = useState(0)
  const [error, guardarError] = useState(false)

  // cuando el usuario agrega un gasto
  const agregarGasto = (event) => {
    event.preventDefault()

    // Validar
    if (nombre.trim() === "" || cantidad < 1 || isNaN(cantidad) ) {
      guardarError(true)
      return;
    }
    guardarError(false)
    
    // construir el gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate()
    }

    // pasar el gasto al componente principal
    guardarGasto(gasto)
    guardarCrearGasto(true)

    // resetear el formulario
    guardarNombre("")
    guardarCantidad(0)
  }

  return ( 
    <form
      onSubmit={agregarGasto}
    >
      <h2>Agrega Tus Gastos Aqui</h2>

      { error && <Error mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto" /> }

      <div className="campo">
        <label>Nombre Gasto</label>
        <input 
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          onChange={event =>  guardarNombre(event.target.value)}
          value={nombre}
          />
      </div>

      <div className="campo">
        <label>Cantidad Gasto</label>
        <input 
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          onChange={event =>  guardarCantidad(parseInt(event.target.value, 10))}
          value={cantidad}
          />
      </div>

      <input 
        type="submit"
        className="u-full-width button-primary"  
        value="Agregar Gasto"
      />
    </form>

   );
}

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired, 
  guardarCrearGasto: PropTypes.func.isRequired,
}
 
export default Formulario;