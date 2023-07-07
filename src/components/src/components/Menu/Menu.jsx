import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Menu({ user }) {
    const navigate = useNavigate()

    const handleLogout = () => {
      console.log(user)
      // Perform logout logic here
      // For example, clear user session, remove tokens, etc.
      // Then redirect to the login page
      navigate('/login');
    };
  
    return (
        <div className="fixed left-0  h-full bg-teal-600 text-white w-48">
        <ul className="p-4">
          <li className="mb-4">
            <Link to=  "/score" state={user}  className="text-white hover:text-gray-200">
              Score
            </Link>
          </li>
          <li className="mb-4">
            <Link to=  "/home" state={user}  className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-white text-red-400 hover:bg-red-100 hover:text-red-500 rounded px-4 py-2"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
}

export default Menu