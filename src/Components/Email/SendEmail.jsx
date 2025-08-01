// import React, { useState } from 'react';
// import { jwtDecode } from "jwt-decode";

// const CLIENT_ID = 'YOUR_CLIENT_ID_HERE'; // <-- Replace this
// const REDIRECT_URI = 'http://localhost:5173';
// const SCOPE = 'https://www.googleapis.com/auth/gmail.send';

// export default function SendEmail() {
//   const [token, setToken] = useState('');
//   const [to, setTo] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('');

//   const handleLogin = () => {
//     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}&include_granted_scopes=true&prompt=consent`;
//     window.location.href = url;
//   };

//   // On mount, extract token from URL if present

// React.useEffect(() => {
//   const hashParams = new URLSearchParams(window.location.hash.substring(1));
//   const accessToken = hashParams.get('access_token');
//   const idToken = hashParams.get('id_token');

//   if (accessToken) {
//     setToken(accessToken);
//   }

//   if (idToken) {
//     const user = jwt_decode(idToken);
//     console.log("User Info:", user);
//   }
// }, []);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token || !to || !subject || !message) {
//       setStatus('❌ Please fill all fields and login with Google');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, to, subject, message }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setStatus('✅ Email sent successfully!');
//       } else {
//         setStatus(`❌ ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus('❌ Failed to send email');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-8">
//       <h1 className="text-2xl font-bold mb-4">📧 Send Email via Gmail OAuth</h1>
//       {!token && (
//         <button onClick={handleLogin} className="bg-blue-600 text-white px-6 py-2 rounded mb-6 hover:bg-blue-700">
//           Login with Google
//         </button>
//       )}
//       <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
//         <input
//           type="email"
//           placeholder="Recipient Email"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Subject"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           placeholder="Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="w-full p-2 border rounded h-32"
//           required
//         />
//         <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
//           Send Email
//         </button>
//         <p className="text-sm mt-2">{status}</p>
//       </form>
//     </div>
//   );
// }

















// import React, { useState, useEffect } from 'react';
// import { jwtDecode } from "jwt-decode";

// const CLIENT_ID = 'YOUR_CLIENT_ID_HERE'; // Replace this with your actual client ID
// const REDIRECT_URI = 'http://localhost:5173';
// const SCOPE = 'https://www.googleapis.com/auth/gmail.send';

// export default function SendEmail() {
//   const [token, setToken] = useState('');
//   const [to, setTo] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('');

//   const handleLogin = () => {
//     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token%20id_token&scope=${SCOPE}&include_granted_scopes=true&prompt=consent&nonce=secure_nonce`;
//     window.location.href = url;
//   };

//   useEffect(() => {
//     const hashParams = new URLSearchParams(window.location.hash.substring(1));
//     const accessToken = hashParams.get('access_token');
//     const idToken = hashParams.get('id_token');

//     if (accessToken) {
//       setToken(accessToken);
//     }

//     if (idToken) {
//       try {
//         const decoded = jwtDecode(token);
//         console.log("User Info:", decoded);
//       } catch (err) {
//         console.error("JWT Decode Error:", err);
//       }
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token || !to || !subject || !message) {
//       setStatus('❌ Please fill all fields and login with Google');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, to, subject, message }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setStatus('✅ Email sent successfully!');
//       } else {
//         setStatus(`❌ ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus('❌ Failed to send email');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-8">
//       <h1 className="text-2xl font-bold mb-4">📧 Send Email via Gmail OAuth</h1>
//       {!token && (
//         <button onClick={handleLogin} className="bg-blue-600 text-white px-6 py-2 rounded mb-6 hover:bg-blue-700">
//           Login with Google
//         </button>
//       )}
//       <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
//         <input
//           type="email"
//           placeholder="Recipient Email"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Subject"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           placeholder="Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="w-full p-2 border rounded h-32"
//           required
//         />
//         <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
//           Send Email
//         </button>
//         <p className="text-sm mt-2">{status}</p>
//       </form>
//     </div>
//   );
// }







// import React, { useState, useEffect } from 'react';
// import {jwtDecode} from 'jwt-decode'; // ✅ make sure this is the default import

// export default function SendEmail() {
//   const [token, setToken] = useState('');
//   const [to, setTo] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     const hashParams = new URLSearchParams(window.location.hash.substring(1));
//     const accessToken = hashParams.get('access_token');
//     const idToken = hashParams.get('id_token');

//     if (accessToken) {
//       setToken(accessToken);
//     }

//     if (idToken) {
//       try {
//         const user = jwt_decode(idToken);
//         console.log("User Info:", user);
//       } catch (e) {
//         console.error("Failed to decode ID token", e);
//       }
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token || !to || !subject || !message) {
//       setStatus('❌ Please fill all fields and make sure token is available.');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ token, to, subject, message }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setStatus('✅ Email sent successfully!');
//       } else {
//         setStatus(`❌ ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus('❌ Failed to send email');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-8">
//       <h1 className="text-2xl font-bold mb-4">📧 Send Email via Gmail OAuth</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
//         <input
//           type="email"
//           placeholder="Recipient Email"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Subject"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           placeholder="Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="w-full p-2 border rounded h-32"
//           required
//         />
//         <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
//           Send Email
//         </button>
//         <p className="text-sm mt-2">{status}</p>
//       </form>
//     </div>
//   );
// }





















import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const SendEmail = () => {
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const user = jwtDecode(storedToken);
        setUserEmail(user.email || "");
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  const handleSend = async () => {
    if (!recipient || !subject || !message || !token) {
      alert("❌ Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/send-email", {
        token,
        to: recipient,
        subject,
        message,
      });

      alert("✅ Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("❌ Failed to send email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-900 to-slate-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-8">Send an Email as {userEmail}</h1>
      <div className="w-full max-w-md space-y-4">
        <input
          type="email"
          placeholder="Recipient's Email"
          className="w-full p-3 rounded text-black"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-3 rounded text-black"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 rounded text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded"
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
