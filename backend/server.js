// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// app.use(cors());

// const MUSIC_DIR = "C:\\Users\\HP\\Music";

// // API endpoint to get all MP3 files
// app.get('/api/songs', (req, res) => {
//   fs.readdir(MUSIC_DIR, (err, files) => {
//     if (err) {
//       console.error("Error reading directory:", err);
//       return res.status(500).json({ error: "Unable to read music directory" });
//     }

//     const mp3Files = files.filter(file => path.extname(file).toLowerCase() === '.mp3')
//       .map(file => ({
//         name: path.parse(file).name,
//         path: path.join(MUSIC_DIR, file)
//       }));

//     res.json(mp3Files);
//   });
// });

// // API endpoint to stream a specific song
// app.get('/api/songs/:filename', (req, res) => {
//   const filePath = path.join(MUSIC_DIR, req.params.filename);
  
//   if (!fs.existsSync(filePath)) {
//     return res.status(404).send('File not found');
//   }

//   const stat = fs.statSync(filePath);
//   const fileSize = stat.size;
//   const range = req.headers.range;

//   if (range) {
//     const parts = range.replace(/bytes=/, "").split("-");
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//     const chunksize = (end - start) + 1;
//     const file = fs.createReadStream(filePath, { start, end });
//     const head = {
//       'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunksize,
//       'Content-Type': 'audio/mpeg',
//     };
//     res.writeHead(206, head);
//     file.pipe(res);
//   } else {
//     const head = {
//       'Content-Length': fileSize,
//       'Content-Type': 'audio/mpeg',
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(filePath).pipe(res);
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

















const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MUSIC_DIR = "C:\\Users\\HP\\Music";

// 📩 Gmail Email Sender API
app.post('/api/send-email', async (req, res) => {
  const { token, to, subject, message } = req.body;

  if (!token || !to || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: token });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const encodedMessage = Buffer.from(
      `To: ${to}\r\n` +
      `Subject: ${subject}\r\n` +
      `Content-Type: text/plain; charset="UTF-8"\r\n\r\n` +
      `${message}`
    )
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});


// 🎵 Music file list API
app.get('/api/songs', (req, res) => {
  fs.readdir(MUSIC_DIR, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).json({ error: "Unable to read music directory" });
    }

    const mp3Files = files.filter(file => path.extname(file).toLowerCase() === '.mp3')
      .map(file => ({
        name: path.parse(file).name,
        path: path.join(MUSIC_DIR, file)
      }));

    res.json(mp3Files);
  });
});

// 🎶 Stream single music file
app.get('/api/songs/:filename', (req, res) => {
  const filePath = path.join(MUSIC_DIR, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'audio/mpeg',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

app.post('/api/send-email', async (req, res) => {
  const { token, to, subject, message } = req.body;

  if (!token || !to || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: token });

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const rawMessage = [
      `To: ${to}`,
      `Subject: ${subject}`,
      `Content-Type: text/plain; charset="UTF-8"`,
      "",
      message
    ].join("\n");

    const encodedMessage = Buffer.from(rawMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


