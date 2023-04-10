import React, { useState } from "react";
import "./ingresoPresupuesto.css"; // Importamos el archivo de estilos CSS
import Swal from 'sweetalert2';

const IngresoPresupuesto = () => {
  const [inputValue, setInputValue] = useState();
  const [inputLabelCosto, setInputLabelCosto] = useState();
  const [inputValorCosto, setInputValorCosto] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [sumaGastos, setSumaGastos] = useState(0);
  const [gastos, setGastos] = useState([]);
 

  function verificarPresupuesto(){
    if(inputValue===undefined){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese un presupuesto inicial',
      });
    }else if(inputValue<1){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese un presupuesto válido (Superior a 1)',
      });
    }else{
      setIsButtonClicked(true);
    }
  }

  function verificarGasto(labelCosto,valorCosto){
    if(inputLabelCosto===undefined || inputValorCosto===undefined){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Complete los campos!',
      });
    }else if(inputValorCosto<1){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese un costo válido (Superior a 1)',
      });
    }else{
      setGastos([...gastos, [labelCosto,valorCosto]])
      setInputLabelCosto('')
      setInputValorCosto(0)
      Swal.fire({
        icon: 'success',
        title: 'Ingreso exitoso',
        text: '¡El gasto ha sido registrado!'
      })
    }
  }
  

  
  console.log(sumaGastos)
  return (
    <div>
      <div className="row contenedor">
        <div className=" Header">
          <h2 className="col-12 labelHeader">
            Ingrese el presupuesto disponible:
          </h2>
          <hr />
          <div className="col-12 input-button-container">
            <input
              type="number"
              value={inputValue}
              disabled={isButtonClicked ? true : false}
              onChange={(e)=>(setInputValue(e.target.valueAsNumber))}
              placeholder="Ingresa un valor"
              className="input-field"
            />
            <button
              onClick={(e)=>(verificarPresupuesto())}
              className={isButtonClicked ? "button clicked" : "button"}
              
            >
              {isButtonClicked ? "Guardado!" : "Enviar"}
            </button>
          </div>
        </div>
      </div>
      <div className="row contenedor" hidden={isButtonClicked ? false : true}>
        <div className="row Header">
          <div className="col-6 mitadDiv">
            <h2 className="labelHeader">Añada sus gastos aquí</h2>

            <div className="campo">
                <label>Ingrese el nombre del gasto</label>
                <input type="text" value={inputLabelCosto} onChange={(e)=>(setInputLabelCosto(e.target.value))}  placeholder="Ej: Protogemas"></input>
            </div>

            <div className="campo">
                <label>Ingrese el valor del gasto</label>
                <input type="number" value={inputValorCosto} onChange={(e)=>(setInputValorCosto(e.target.valueAsNumber))}></input>
            </div>

            <div className="campo">
            <button  onClick={(e)=>(verificarGasto(inputLabelCosto,inputValorCosto))}>
              Agregar gasto
            </button>
            </div>

            
          </div>
          <div className="col-6 mitadDiv">
                <div className="presupuestoInicial">
                    <span> Presupuesto inicial : ${inputValue} </span>
                </div>
               {gastos.map((gasto)=>(
                <div className="gasto"  key={gasto}>
                <span>{gasto[0]} : ${gasto[1]} </span>
                {(e)=>setSumaGastos(...+gasto[1])}
              </div>
               ))}
                
                <div className="restante">
                    <span>Balance : ${inputValue-sumaGastos} </span>
                </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IngresoPresupuesto;
