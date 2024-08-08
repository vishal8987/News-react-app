import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/authSlice';
import { auth } from '../../firebase/firebase-config';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Input, Button } from '@material-tailwind/react';
import { collection, addDoc } from 'firebase/firestore';
import { fireDb } from '../../firebase/firebase-config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const [note, setNote] = useState({ title: '', description: '' });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      dispatch(signOut());
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  const handleNoteChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleAddNote = async () => {
    if (user) {
      try {
        await addDoc(collection(fireDb, 'notes'), {
          ...note,
          userId: user.uid,
          createdAt: new Date(),
        });
        setNote({ title: '', description: '' });
        setIsOpen(false);
      } catch (error) {
        console.error('Error adding note:', error.message);
      }
    }
  };

  return (
    <nav className="bg-black-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-black text-lg font-bold">
          <Link to="#">Dhakar News</Link>
        </div>
        <div className="hidden md:flex flex-1 justify-center space-x-4">
          <Link to="/" className="text-black hover:bg-blue-500 px-3 py-2 rounded">Home</Link>
          <Link to="/about" className="text-black hover:bg-blue-500 px-3 py-2 rounded">About</Link>
          {user && (
            <>
              <Link to="/notes" className="text-black hover:bg-blue-500 px-3 py-2 rounded">View Notes</Link>
              <button
                onClick={() => setIsOpen(true)}
                className="text-black hover:bg-blue-500 px-3 py-2 rounded"
              >
                Add Note
              </button>
            </>
          )}
        </div>
        <div className="hidden md:flex">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-black rounded-md bg-orange-900 px-8 hover:duration-150 translate-x-1 text-white hover:bg-blue-500 px-3 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-black hover:bg-blue-500 px-3 py-2 rounded">Login</Link>
          )}
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden text-black focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link to="/" className="text-black hover:bg-blue-500 px-3 py-2 rounded">Home</Link>
          <Link to="/about" className="text-black hover:bg-blue-500 px-3 py-2 rounded">About</Link>
          {user && (
            <>
              <Link to="/notes" className="text-black hover:bg-blue-500 px-3 py-2 rounded">View Notes</Link>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setMenuOpen(false); // Close menu after clicking
                }}
                className="text-black hover:bg-blue-500 px-3 py-2 rounded"
              >
                Add Note
              </button>
            </>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-black rounded-md bg-orange-900 px-8 hover:duration-150 translate-x-1 text-white hover:bg-blue-500 px-3 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-black hover:bg-blue-500 px-3 py-2 rounded">Login</Link>
          )}
        </div>
      )}

      {/* Add Note Modal */}
      <Dialog open={isOpen} handler={() => setIsOpen(false)}>
        <DialogHeader>Add Note</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <Input
              label="Title"
              name="title"
              value={note.title}
              onChange={handleNoteChange}
              required
            />
            <Input
              label="Description"
              name="description"
              value={note.description}
              onChange={handleNoteChange}
              required
              type="textarea"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setIsOpen(false)}
          >
            <span>Cancel</span>
          </Button>
          <Button
            color="blue"
            onClick={handleAddNote}
          >
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </nav>
  );
};

export default Navbar;
