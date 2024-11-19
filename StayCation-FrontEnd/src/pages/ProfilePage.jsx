import React, { useState, useEffect } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import axios from 'axios';
import './css/ProfilePage.css';

function ProfilePage() {
  const [profilePicture, setProfilePicture] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setProfilePicture(response.data.profilePicture);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('username', username);
    formData.append('email', email);

    try {
      const response = await axios.put('/api/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfilePicture(response.data.profilePicture);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="Profile-page">
      <h1>Profile Page</h1>
      <label>
        <h2><FaCircleUser /></h2>
        <img className="Image-import" src={profilePicture || "https://via.placeholder.com/150"} alt="Profile" />
        <p>Change profile picture</p>
        <input type="file" onChange={handleFileChange} />
      </label>
      <label>
        <p>Username</p>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      </label>
      <label>
        <p>Email</p>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </label>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
}

export default ProfilePage;

// import React from 'react';
// import { FaCircleUser } from "react-icons/fa6";
// import './css/ProfilePage.css';

// function ProfilePage() {
//   return (
//     <div className="Profile-page">
//       <h1>Profile Page</h1>
//       <label>
//         <h2><FaCircleUser /></h2>
//         <img className="Image-import" src="https://via.placeholder.com/150" alt="Profile" />
//         <p>Change profile picture</p>
//         <input type="file" />
//       </label>
//       <label>
//         <p>Username</p>
//         <input type="text" placeholder="Username" />
//       </label>
//       <label>
//         <p>Email</p>
//         <input type="email" placeholder="Email" />
//       </label>
//       <button>Save Changes</button>
//       <div className="Fake">This is a mock website. It does not have any functions.</div>
//     </div>
//   );
// }

// export default ProfilePage;