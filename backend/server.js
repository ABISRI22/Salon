const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { fullname, email, message } = req.body;
  console.log('Received:', fullname, email, message);
  res.json({ msg: 'Message received!', success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
