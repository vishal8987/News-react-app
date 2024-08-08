import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { fireDb } from '../../firebase/firebase-config';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Importing icons
import Modal from 'react-modal'; // Import modal for editing

const Notes = () => {
  const { user } = useSelector((state) => state.auth);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: '', title: '', description: '' });

  useEffect(() => {
    const fetchNotes = async () => {
      if (user) {
        try {
          const q = query(collection(fireDb, 'notes'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const notesList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setNotes(notesList);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching notes:', error.message);
          setLoading(false);
        }
      }
    };
    fetchNotes();
  }, [user]);

  const handleDelete = async (noteId) => {
    try {
      await deleteDoc(doc(fireDb, 'notes', noteId));
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleUpdateNote = async () => {
    try {
      const noteRef = doc(fireDb, 'notes', currentNote.id);
      await updateDoc(noteRef, {
        title: currentNote.title,
        description: currentNote.description
      });
      setNotes(notes.map(note => note.id === currentNote.id ? currentNote : note));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating note:', error.message);
    }
  };

  if (loading) {
    return <p>Loading notes...</p>;
  }

  return (
    <div className="p-4 w-[80%] mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-6">My Notes</h1>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <li key={note.id} className="relative p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
              <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
              <p className="text-gray-700">{note.description}</p>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button className="p-1 text-blue-500 hover:text-blue-600" onClick={() => handleEdit(note)}>
                  <FiEdit size={20} />
                </button>
                <button className="p-1 text-red-500 hover:text-red-600" onClick={() => handleDelete(note.id)}>
                  <FiTrash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Note"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
        <input
          type="text"
          value={currentNote.title}
          onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
          placeholder="Title"
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={currentNote.description}
          onChange={(e) => setCurrentNote({ ...currentNote, description: e.target.value })}
          placeholder="Description"
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateNote}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Notes;
