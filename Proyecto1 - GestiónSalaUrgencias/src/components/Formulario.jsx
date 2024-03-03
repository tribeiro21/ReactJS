// Agregamos en la línea 16 el html para poder usar el For
// Este import es necesario para definir los states que vamos a utilizar
// Importamos useEffect que nos permitirá ejecutar el código cuando algo cambie, pe dentro del formulario
//Recordar: dentro del return se usa el if como ternario y fuera si podemos usar el if else
import {useState, useEffect} from 'react';
import Error from './Error';
const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
    //Aquí agregamos el Hook (state) con el cual vamos hacer que las variables tome un valor
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    //Para mostrar un mensaje en pantalla de si los datos estan completos o no
    const [error, setError] = useState(false)

    //Se ejecutará sólo cuando "paciente" haya cambiado"
    //Con el object.keys verificamos si el objeto tiene datos o está vacío
    useEffect(() => {
        if( Object.keys(paciente).length > 0 ){
            //Usamos paciente.nombre porque es el del listado de pacientes, el nombre es del formulario
            setNombre(paciente.nombre)
            setEdad(paciente.edad)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        
        } 
    }, [paciente])

    //Con la de declaración de eata función,nos aseguramos tener un Id único para cada registro
    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)

        return random + fecha
    }
    //Aquí definimos la función para enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        //Validación del formulario
        if([nombre,edad,email,fecha,sintomas].includes('')){
            console.log('hay uno vacío')

            setError(true)
            return;
            
        }
        //Con esta línea, hacemos que el formulario cambie entre true y false según los campos rellenados
        setError(false)

        //Objeto de paciente
        const objetoPaciente = {
            nombre,
            edad,
            email,
            fecha,
            sintomas,
        }

        //Esto lo hacemos para que al editar los datos de uno existente, no creé un nuevo registro sino que edite el mismo
        if(paciente.id) {
            // Editando el registro
            //Le asignamos el mismo id del objeto que estamos editando
            objetoPaciente.id = paciente.id
            //Identifica cual es el objeto que se esta editando y lo retorna por medio de objetoPaciente y sino retorna el del state que es el que no se está editando
            //El map itera sobre todos los pacientes creados, luego identifica a través del id cuál es el que tiene el mismo id del que se está editando en el formulario y retorna el objeto nuevo
            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )
            //Seteamos los datos del nuevo paciente
            setPacientes(pacientesActualizados)
            setPaciente({})

        }else{
            // Nuevo Registro
            //Tenemos que declarar aquí es state para que guarde el dato introducido en el formulario
            // Colocamos ...pacientes para tomar una copia del dato anterior y no sobreescribirlo
            //Cuando tenga un nuevo registro, genero un id
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }
            
        // Reiniciar el formulario para que no aparezcan en los campos los datos anteriores
        setNombre('')
        setEdad('')
        setEmail('')
        setFecha('')
        setSintomas('')
        


    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-2xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-6 text-center mb-10">
                Agregar Paciente y {''}
                <span className="text-indigo-600 font-bold">Ver Pacientes</span>
            </p>
            
            <form 
                //Agregamos esta línea para que el formulario envié los datos
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-xl py-8 px-4 mb-10 mx-5">
                
                { error && <Error><p>Todos los campos son obligatorios</p></Error>}
                
                <div className="mb-5">
                    
                    <label htmlFor="paciente" className="block text-gray-700 uppercase font-bold">
                        Nombre del Paciente
                    </label>

                    <input
                        id="paciente"
                        type="text"
                        placeholder="Introduce el nombre del paciente"
                        className="border-2 w-full p-2 mt-2 placeholder-neutral-600 rounded-md"
                        //Definimos la variable del hook como un value en JS {}
                        value={nombre}
                        //Registramos el evento, para que al escribir en el campo, se muestre en el campo
                        onChange={ (e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    
                    <label htmlFor="edad" className="block text-gray-700 uppercase font-bold">
                        Edad del Paciente
                    </label>

                    <input
                        id="edad"
                        type="number"
                        placeholder="Introduce la edad del paciente"
                        className="border-2 w-full p-2 mt-2 placeholder-neutral-600 rounded-md"
                        value={edad}
                        //Registramos el evento, para que al escribir en el campo, se muestre en el campo
                        onChange={ (e) => setEdad(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email del Paciente
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Introduce el email del paciente"
                        className="border-2 w-full p-2 mt-2 placeholder-neutral-600 rounded-md"
                        value={email}
                        //Registramos el evento, para que al escribir en el campo, se muestre en el campo
                        onChange={ (e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    
                    <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">
                        Fecha de Ingreso
                    </label>

                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-neutral-600 rounded-md"
                        value={fecha}
                        //Registramos el evento, para que al escribir en el campo, se muestre en el campo
                        onChange={ (e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>

                    <textarea
                        id="sintomas"
                        placeholder="Detalle de los síntomas que presenta el paciente"
                        className="border-2 w-full p-2 mt-2 placeholder-neutral-600 rounded-md"
                        value={sintomas}
                        //Registramos el evento, para que al escribir en el campo, se muestre en el campo
                        onChange={ (e) => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 rounded-md w-full p-3 text-zinc-800 uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-transform"
                    //Cambiamos el texto del botón según sea un nuevo paciente o la edición de uno ya existente
                    value={ paciente.id ? 'Editar Paciente' : 'Registrar Paciente' }
                />

            </form>
        </div>
    )
}

export default Formulario