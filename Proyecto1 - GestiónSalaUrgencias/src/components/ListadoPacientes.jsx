//Utilizamos la funcion de js .map para poder iterar sobre los datos y mostrarlos en el lista de paciente
// siempre que se usa .map debemos definir una key donde pasaremos el id que utilizamos en la funcion de su componente correspondiente, en este caso la funcion generarId del componente Formulario
import Paciente from "./Paciente"

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
            
            {pacientes && pacientes.length ? (
                <>
                    <h2 className="font-black text-2xl text-center">Listado de pacientes</h2>
                    <p className="text-lg mt-6 mb-10 text-center">
                        Administrar {''}
                        <span className="text-indigo-600 font-bold">Pacientes</span>
                    </p>
                    
                    {pacientes.map( paciente => (
                        //Pasamos el componente para que se muestre tantas veces se agreguen pacientes
                        <Paciente 
                            key={paciente.id}
                            paciente={paciente}
                            setPaciente={setPaciente}  
                            eliminarPaciente={eliminarPaciente}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-2xl text-center">No hay pacientes registrados</h2>
                    <p className="text-lg mt-6 mb-10 text-center">
                        Los pacientes ingresados {''}
                        <span className="text-indigo-600 font-bold">Aparecerán Aquí</span>
                    </p>
                </>
            )}

            

            
            
        </div>

    )

    
}

export default ListadoPacientes