// App.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nota from './Nota';
import {Button, Form, Card} from 'react-bootstrap'

const App = () => {

  const [notes, setNotes] = useState([]);

    const deleteNote = id => {
      axios.delete('http://localhost:4000/api/notes/' + id)
        .then(res => {
          const notasActualizadas = notes.filter(note => id !==
          note._id);
          console.log(notasActualizadas);
          setNotes(notasActualizadas);
        })
        .catch(err => console.log(err))
    };

    const updateNote = id => {
      //console.log(id);
      const tituloActualizado = prompt('Ingrese un nuevo titulo');
      const textoActualizado = prompt('Ingrese un nuevo texto');
      const datos = {
          title: tituloActualizado,
          text: textoActualizado
      };
      axios.put('http://localhost:4000/api/notes/' + id, datos)
        .then(res => {
          const notasActualizadas = notes.map(note => (
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
        //console.log(res.data);
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
    <div className='container'>
    <div className="app">
        <h1>Task App</h1>
        <br/>

          <br/>

      <div className="agregarNota">
        <Form onSubmit={handleSubmit}>

      <Card style={{ width: '18rem' }}>
       <Card.Body>
        <div className="tittle">
          <label>Titulo</label>
          <br/>
          <input
            onChange={e => setTitle(e.target.value)}
            value={title}
            type="text"
          />
          </div>

          <div className="text">
          <label>Texto</label>
          <textarea
            onChange={e => setText(e.target.value)}
            value={text}
            name="textarea"
            rows="10"
            cols="30">
            spellCheck={false}
          </textarea>
          </div>
          <div className="button">
          <input type="submit" className="btn btn-primary" value="Guardar"/>
          </div>
          </Card.Body>
        </Card>




        </Form>
      </div>

      <div className="notas">
        <br/>
        <h1>Lista de notas</h1>
          <br/>

        <Card style={{width: '50rem'}}>
        <div className="task">
        {notes.map(note => {
          return <Nota title={note.title} text={note.text}
            key={note._id}
            id={note._id}
            title={note.title}
            deleteNote={deleteNote}
            updateNote={updateNote}
            text={note.text} />
        })}
        </div>
        </Card>
      </div>

    </div>
    </div>
  );
};

export default App;
