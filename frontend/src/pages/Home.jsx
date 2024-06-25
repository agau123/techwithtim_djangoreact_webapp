import { useEffect, useState  } from 'react';
import api from '../api';
import Note from '../components/Note';
import '../styles/Home.css';


function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get('/api/notes/')
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post('/api/notes/', { title, content })
      .then((res) => {
        if (res.status === 201) {
          alert('La note a été créée');
        } else {
          alert('Problème lors de la création de la note');
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert('La note a été supprimée');
        } else {
          alert('Problème lors de la suppression de la note');
        }
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return <div>
    <div>
      <h2>Notes</h2>
      { notes.map((note) => (
        <Note key={ note.id } note={ note } onDelete={ deleteNote } />
      ))}
    </div>
    <h2>Créez une note</h2>
    <form onSubmit={createNote}>
      <label htmlFor='title'>Titre :</label>
      <br />
      <input
        type='text'
        id='title'
        name='title'
        required
        value={ title }
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor='content'>Contenu :</label>
      <br />
      <textarea
        id='content'
        name='content'
        required
        value={ content }
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <br />
      <input type='submit' value='Envoyez' />
    </form>
  </div>;
}

export default Home;
