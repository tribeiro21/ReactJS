//En la variable children se toma todo lo que se pase al comppnente, como funciones o código html
const Error = ({children}) => {
  return (
    <div className="bg-red-700 text-white font-bold text-center p-3 uppercase mb-3 rounded-lg">
        {children}
    </div>
  )
}

export default Error