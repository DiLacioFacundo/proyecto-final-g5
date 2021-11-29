const Nota = props => {
  const { id, title, text, deleteNote, updateNote } = props;
  return (
    <div className="nota">
      <h2>{title}</h2>
      <p>{text}</p>

      <button className="btn btn-danger" onClick= {() => deleteNote(id)}>Borrar</button>


      <button  className="btn btn-warning" onClick= {() => updateNote(id)}>Editar</button>
    </div>
  );
};

export default Nota;
