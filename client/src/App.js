// App.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nota from './Nota';
const App = () => {

  const [notes, setNotes] = useState([]);

  const deleteNote = id => {
    axios.delete('http://localhost:4000/api/notes/' + id)
    .then(res => {
      const notasActualizadas = notes.filter(note => id !== note.id);
      console.log(notasActualizadas);
      setNotes(notasActualizadas);
    })
    .catch(err => console.log(err));
  };

const updateNote = id =>{
  console.log(id);
  const tituloActualizado = prompt('ingrese nuevo titulo');
  const textoActualizado = prompt('ingrese nuevo texto');
  const datos = {
    title: tituloActualizado,
    text: textoActualizado
  };
  axios.put('http://localhost:4000/api/notes/' + id, datos)
  .then(res =>  {
    const notasActualizadas = notes.map(note =>(
      note._id === id ? res.data : note
    ));
    setNotes(notasActualizadas);
  })
  .catch(err => console.log(err));
};

  useEffect(() => {
    console.log('Vamos a buscar todas las notas');
    axios.get('http://localhost:4000/api/notes')
      .then(res => {
      //  console.log(res.data);
        setNotes(res.data);
      });
  }, []);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Enviando formulario...');
    console.log(title, text);
    const note = { title, text };
    axios.post('http://localhost:4000/api/notes', note)
    .then(res => {
      console.log(res.data);
      setNotes([res.data, ...notes]);
      setTitle('');
      setText('');
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="app">
      <h1 className="center">Mi app</h1>
      <div className="agregarNota">
        <form onSubmit={handleSubmit}>
          <label>Titulo</label>
          <br/>
          <input
            onChange={e => setTitle(e.target.value)}
            value={title}
            type="text"
          />
          <br/>
          <label>Texto</label>
          <br/>
          <textarea
            rows="6"
            cols="40"
            spellCheck={false}
            onChange={e => setText(e.target.value)}
            value={text}
            ></textarea>
            <br/>
            <inputclassName="btn btn-primary" type="submit"
            value="Guardar" />
            </form>
            </div>
      <div className="notas">
        {notas.map(note => {
          return <Nota
          key={note._id}
          id={note._id}
          title={nottte.title}
          deleteNote={deleteNote}
          updateNote={updateNote}
          text={note.text} />
        })}
      </div>
    </div>
  );
};

export default App;
