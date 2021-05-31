import './App.css';
import _ from 'lodash';
import { useState } from 'react';

const Horca = ({ children, ancho, alto, anchoContenido }) => {

  const styleContainer = {
    width: ancho,
    height: alto
  };

  const styleContent = {
    width: anchoContenido,
    marginLeft: -anchoContenido / 2
  }

  return <div style={styleContainer}>
    <div className="horca-tope">
      <div className="horca-contenido" style={styleContent}>
        {children}
      </div>
    </div>
    <div className="horca-columna" />
    <div className="horca-plataforma" />
  </div>;
}

const Hombre = ({ nivel }) => {
  const espacio = <span>&nbsp;</span>;

  const parts = {
    cabeza: nivel >= 7 ? 'X' : (nivel >= 1 ? 'O' : espacio),
    cuerpo: nivel >= 2 ? '|' : espacio,
    brazoIzquierdo: nivel >= 3 ? '/' : espacio,
    brazoDerecho: nivel >= 4 ? '\\' : espacio,
    pieIzquierdo: nivel >= 5 ? '/' : espacio,
    pieDerecho: nivel >= 6 ? '\\' : espacio
  };
  return <div className="hombre">
    <div>{parts.cabeza}</div>
    <div>{parts.brazoIzquierdo}{parts.cuerpo}{parts.brazoDerecho}</div>
    <div>{parts.cuerpo}</div>
    <div>{parts.pieIzquierdo}{parts.pieDerecho}</div>
  </div>;
}

const Palabra = ({ palabra }) => {
  return <div className="palabra">
    {palabra.split("").join(" ")}
  </div>
}

const FinJuego = ({ juegoGanado, onResetearJuego }) => {
  const mensaje = juegoGanado ? <span style={{ color: 'green' }}>Ganaste!</span>
    : <span style={{ color: 'red' }}>Perdiste!</span>;
  return <div>
    {mensaje}
    <button onClick={onResetearJuego}>Intenta otra vez</button>
  </div>;
}

const LetrasUsadas = ({ letras, onNuevaLetra }) => {
  const handleNuevaLetra = (ev) => {
    const letra = ev.target.value[0];

    if (/[A-Za-z]/.test(letra)) {
      onNuevaLetra(letra.toUpperCase());
    }
  }

  return <div>
    Letras usadas:  {letras.join(" - ")}
    <input
      type="text"
      value=""
      className="input-letra"
      placeholder="Adivina una letra"
      onChange={handleNuevaLetra}
    />
  </div>
}

const Juego = ({ onResetearJuego, onNuevaLetra, palabra, errores, ganador, perdio, letrasUsadas }) => {
  const juegoTerminado = ganador || perdio
  return (
    <div className="juego">
      <h3>Juego de Ahorcado</h3>
      <Horca ancho={300} alto={300} anchoContenido={200}>
        <Hombre nivel={errores} />
      </Horca>

      <Palabra palabra={palabra} />

      {!juegoTerminado ? <LetrasUsadas letras={letrasUsadas} onNuevaLetra={onNuevaLetra} /> :
        <FinJuego juegoGanado={ganador} onResetearJuego={onResetearJuego} />
      }
    </div>
  );
}

const App = () => {
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [palabra, setPalabra] = useState(elegirPalabra());

  const onResetearJuego = () => {
    setLetrasUsadas([]);
    setPalabra(elegirPalabra());
  };

  const onNuevaLetra = (letra) => {
    if (letrasUsadas.indexOf(letra) !== -1) {
      return;
    }
    setLetrasUsadas(letrasUsadas.concat(letra));
  }

  return <div>
    <Juego
      onResetearJuego={onResetearJuego}
      onNuevaLetra={onNuevaLetra}
      letrasUsadas={letrasUsadas}
      perdio={juegoEstaPerdido(palabra, letrasUsadas)}
      ganador={juegoEstaGanado(palabra, letrasUsadas)}
      palabra={palabraAdivinada(palabra, letrasUsadas)}
      errores={obtenerErrores(palabra, letrasUsadas)} />
  </div>
}


const palabras = [
  'JAVASCRIPT',
  'SOFKAU',
  'REACTJS',
  'DESARROLLADOR',
  'JAVA',
  'Spring'
];

function elegirPalabra() {
  const indice = Math.floor(Math.random() * palabras.length);
  return palabras[indice];
}

function palabraAdivinada(palabra, letrasUsadas) {
  const letrasNoAdivinadas = _.difference(palabra.split(''), letrasUsadas);
  return letrasNoAdivinadas.reduce((palabraAdivinada, letrasNoAdivinada) => {
    return palabraAdivinada.replace(new RegExp(letrasNoAdivinada, 'g'), '_');
  }, palabra);
}

function obtenerErrores(palabra, letrasUsadas) {
  let errores = 0;
  letrasUsadas.forEach(function (letra) {
    if (palabra.indexOf(letra) === -1) {
      errores++;
    }
  });
  return errores;
}

function juegoEstaGanado(palabra, letrasUsadas) {
  return palabraAdivinada(palabra, letrasUsadas) === palabra;
}

function juegoEstaPerdido(palabra, letrasUsadas) {
  return obtenerErrores(palabra, letrasUsadas) >= 7;
}

export default App;
