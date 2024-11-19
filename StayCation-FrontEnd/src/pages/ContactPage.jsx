import React, { useState } from 'react';
import axios from 'axios';
import '../components/Navbar/Navbar.css';


function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !phoneNumber || !message) {
      alert('All fields must be filled');
      return;
    }
    if (!email.includes('@')) {
      alert('Email must contain @');
      return;
    }
    if (phoneNumber.length < 10) {
      alert('Phone number must contain 10 digits');
      return;
    }
    if (message.length <4) {
      alert('Message must contain at least 10 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/messages', {
        name,
        email,
        phoneNumber,
        message,
      });
    
      console.log(response.data);
    
      if (response.status !== 200) {
        throw new Error(`Error: ${response.data.message}`);
      }
    
      if (response.status === 200)
        alert('Message sent successfully');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <section className="contact" id="contact">
      <h1 className="heading"> contact us </h1>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" className="box" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="email" className="box" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="number" placeholder="phone number" className="box" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <textarea name="" className="box" placeholder="message" id="" cols="30" rows="10" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <input type="submit" value="submit" className="btn" />
        </form>
        <div className="image">
        </div>
      </div>
    </section>
  );
}

export default ContactPage;