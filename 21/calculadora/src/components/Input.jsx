import "../App.css"

// rfce -> crea un componente funcional con el nombre del archivo

// Responsabilidad unica
// los componentes funcionales tambien usan parametros pero se llaman props
// properties
function Input({ type, label, value, labelId, evento, placeholder }) {
  return (
    <div className="campo">
      <label htmlFor={labelId}>{label}</label>
      <input
        type={type}
        id={labelId}
        value={value}
        onChange={evento}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
