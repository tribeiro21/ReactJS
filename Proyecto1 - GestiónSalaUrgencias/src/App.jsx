import {useState, useEffect} from 'react'
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  //Esto es un state (padre)para que los datos se vayan llenando de acuerdo a lo que se introduce en el formulario, crea los datos
  const[pacientes, setPacientes] = useState([]);
  //Creamos un segunto state para la función de editar o actualizar
  const[paciente, setPaciente] = useState({});
  //Este es el useEffect para no perder los datos al recargar la página, el de abajo es para guardarlos
  //Aquí utilizamos el JSON.parse para convertirlo de strin a un objeto
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
    }

    obtenerLS();
  }, []);

  //Aquí vamos a definir el LocalStorage para no perder los datos ya registyrados
  //Debemos convertirl los datos a string, por eso utilizamos el stringify
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes])

  //Para eliminar pacientes
  const eliminarPaciente = id => {
      const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);
      setPacientes(pacientesActualizados)
  }

  
  // El return permite mostrar en pantalla, es obligatorio
  // Siempre se retorna el elemento más alto
  // Utilizamos un "fragment" <> </> como línea padre
  // Dentro del return es lo que se ve en pantalla
  // Antes del return, código js, ej. funciones, "if"
  // Dentro del return, para meter funciones utilizamos {} llamadas expresiones
  // Colocar el flex permite que todos los elementos dentro de ese div se pongan uno al lado del otro
  // Colocar el md significa a qué tamaño de pantalla aplica la propiedad
    return (
    <div className="container mx-auto mt-10">
      <Header 
        //Aqui pasamos la variable que definimos arriba en el padre
        
      />
        <div className="mt-12 md:flex">
          <Formulario
            //Tenemos que pasar el state que declaramos arriba por cada componente que lo vaya a utilizar 
            //Primero pasamos la variable
            pacientes={pacientes}
            //Luego pasamos el modificador
            setPacientes={setPacientes}
            //Ahora pasamos el objeto
            paciente={paciente}
            //Para que elimine de la memoria el paciente antes de editar
            setPaciente={setPaciente}
          />
          <ListadoPacientes 
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
          />
        </div>
    </div>
  )
}

export default App
