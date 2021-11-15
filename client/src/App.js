// App.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nota from './Nota';
const App = () => {

  const [notes, setNotes] = useState([]);


  const deleteNote = id => {
    axios.delete('http://localhost:4000/api/notes/' + id)
    .then(res => {
      const notasActualizadas = notes.filter(note => id !==
      note.id);
      console.log(notasActualizadas);
    }
    )


  }

const updateNote = id =>{
  console.log(id);
  const tituloactualizado = prompt('ingrese nuevo titulo');
  const textoactualizado = prompt('ingrese nuevo texto');
  const datos = {
    title: tituloactualizado,
    text: textoactualizado
  };
  axios.put('' + id, datos)
  .then(res =>  {
    const notasActualizadas = notes.map(note =>(
      note._id === id ? res.data : note
    ));
    setNotes(notasActualizadas);
  })
  .catch(err => console.log(err));
}

  useEffect(() => {
    console.log('Vamos a buscar todas las notas');
    axios.get('http://localhost:4000/api/notes')
      .then(res => {
        console.log(res.data);
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
      <div className="agregarNota">
        <form onSubmit={handleSubmit}>
          <label>Titulo</label>
          <input
            onChange={e => setTitle(e.target.value)}
            value={title}
            type="text"
          />
          <label>Texto</label>
          {/*<input
            onChange={e => setText(e.target.value)}
            value={text}
            type="text"
          />*/}
           <textarea
                      onChange={e => setText(e.target.value)}
                      value = {text}
                      name="textarea"
                      rows="10"
                      cols="50">
                    </textarea>

                    <input type="submit" value="Guardar" />


        </form>
      </div>
      <div className="notas">
        <h1>Lista de notas</h1>
        {notes.map(note => {
          return <Nota key={note._id} title={note.title}
          text={note.text} updateNote={updateNote} deleteNote={deleteNote} />
        })}
      </div>
    </div>
  );
};

export default App;
