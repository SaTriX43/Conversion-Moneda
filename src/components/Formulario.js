import React, { useEffect, useState } from "react";
import '../assets/styles/formulario.css'
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange } from "@fortawesome/free-solid-svg-icons";

// Banderas 
import USA from '../assets/images/USA.png'
import COP from '../assets/images/COP.png'
import EUR from '../assets/images/EUR.png'
import JPY from '../assets/images/JPY.png'
import MXN from '../assets/images/MXN.png'


function Formulario () {
  // estado de seleccion de moneda 
  const [paisSeleccionado1, setPaisSeleccionado1] = useState('EUR');
  const [paisSeleccionado2 , setPaisSeleccionado2] = useState('USD');
  const [importe, setImporte] = useState('');
  const [resultado , setResultado] = useState(null)


  //monedas 
  const mondedaPaises = [
    {moneda: 'USD', bandera:USA, label:'USD - Dollar Estados Unidos'},
    {moneda: 'COP', bandera:COP, label:'COP - Pesos Colombianos'},
    {moneda: 'EUR', bandera:EUR, label:'EUR - Euro'},
    {moneda: 'JPY', bandera:JPY, label:'JPY - Yen Japones'},
    {moneda: 'MXN', bandera:MXN, label:'MXN - Pesos Mexicanos'},
  ]

  function handleMonedaChange1(e) {
    setPaisSeleccionado1(e.target.value)
  }

  function handleMonedaChange2(e) {
    setPaisSeleccionado2(e.target.value)
  }

  function handleImporteChange(e) {
    setImporte(e.target.value)
  }
  // ------------------------------------------------------------- 
  // peticion de API 

  const apiFetch = '8eda9161c10e8191746d42d7';

    async function conversionMoneda(e) {
      e.preventDefault()
      if(!importe || isNaN(importe)) {
        console.log('Porfavor solo numeros validos')
      }

      try {
        const peticion = await fetch(`https://v6.exchangerate-api.com/v6/${apiFetch}/pair/${paisSeleccionado1}/${paisSeleccionado2}`);
        const data = await peticion.json()
        if(data.result === 'success') {
          let tasaCambio = data.conversion_rate;
          const conversionResultado = (importe * tasaCambio).toFixed(2);
          setResultado(conversionResultado)
        }
      } catch (error) {
        console.log(error)
      }
    }

  


  return (
    <form className="formulario">
      <Navbar/>
      <div className="contenedor__convertir">
        <div className="contenedor__convertir-item">
          <label htmlFor="importe">Importe</label>
          <input 
            type="text" 
            id="importe" 
            placeholder="1,00  $" 
            onChange={handleImporteChange}
            value={importe}
          />
        </div>
        {/* -------------------------------------------------  */}
        <div className="contenedor__convertir-item">
          <label htmlFor="de">
            <p>De : </p>
            {mondedaPaises.map((moneda) => (
              paisSeleccionado1 == moneda.moneda &&
              <img src={moneda.bandera} className="imagen-bandera" alt=""/>
            ))}
          </label>
          <select value={paisSeleccionado1} name="de" id="de" onChange={handleMonedaChange1}>
            <option value="USD">USD Dollar Estado Unidense</option>
            <option value="EUR">EUR Euro</option>
            <option value="JPY">JPY Yen Japones</option>
            <option value="COP">COP Pesos Colombianos</option>
            <option value="MXN">MXN Pesos Mexicanos</option>
          </select>
        </div>
        {/* ---------------------------------------------------------  */}
        <FontAwesomeIcon
          icon={faExchange}
          className="convertir__icon"
        />
        {/* ----------------------------------------------------  */}
        <div className="contenedor__convertir-item">
          <label htmlFor="a">
            <p>A: </p>
            {mondedaPaises.map((moneda) => (
              paisSeleccionado2 == moneda.moneda &&
              <img src={moneda.bandera} className="imagen-bandera" alt=""/> 
            ))}
          </label>
          <select value={paisSeleccionado2} onChange={handleMonedaChange2} name="a" id="a">
            <option value="USD">USD Dollar Estado Unidense</option>
            <option value="EUR">EUR Euro</option>
            <option value="JPY">JPY Yen Japones</option>
            <option value="COP">COP Pesos Colombianos</option>
            <option value="MXN">MXN Pesos Mexicanos</option>
          </select>
        </div>
        {/* ----------------------------------------------------------------  */}
        <button className="convertir__boton" onClick={conversionMoneda}>
          Convertir
        </button>
        {resultado && (
          <div className="container__resultado-conversion">
            <p>Su conversion de {importe} {paisSeleccionado1} = {resultado} {paisSeleccionado2} </p>
          </div>
        )}
      </div>
    </form>
  )
}

export default Formulario