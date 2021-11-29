// App.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nota from './Nota';
import {Button, Form, Card, Navbar, Nav} from 'react-bootstrap'
import ico from './assets/img/ico.png';

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
      console.log(id);
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
          console.log(res.data);
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
    <Navbar style={{background:'#C1BEB3', border: '1px solid #fffafa	', margin:'10px'}}>
        <Nav.Link href="#home">

    <h1>TASKS APP</h1>
        </Nav.Link>


      </Navbar>
        <br/>
          <br/>

      <div className="agregarNota">
        <Form onSubmit={handleSubmit}>

      <Card style={{ width: '328px', top:'50px'}}>
       <Card.Body>
        <div className="tittle">
          <Form.Label>Titulo:</Form.Label>
          <br/>
          <input
            onChange={e => setTitle(e.target.value)}
            value={title}
            type="text"
          />
          </div>
          <br/>
          <div className="text">
          <br/>
          <Form.Label>Texto:</Form.Label>
          <textarea
            onChange={e => setText(e.target.value)}
            value={text}
            name="textarea"
            rows="10"
            cols="30">
            spellCheck={false}
          </textarea>
          </div>
          <br/>
          <div className="button">
          <Form.Control type="submit" className="btn btn-dark" value="Guardar"></Form.Control>
          </div>
          </Card.Body>
        </Card>
        </Form>
      </div>

            <Card style={{width: '45rem', border: '1px solid #e6e6fa', float: 'right', bottom:'435px', left:'3px'}}>
            <Form.Group className="task">
            {notes.map(note => {
              return <Nota title={note.title} text={note.text}
                key={note._id}
                id={note._id}
                title={note.title}
                deleteNote={deleteNote}
                updateNote={updateNote}
                text={note.text} />
            })}
            </Form.Group>
          </Card>



    </div>
  );
};

        //  <img src={} alt=""/>
export default App;
