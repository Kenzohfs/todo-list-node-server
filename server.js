const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ res: 'Server is up and running' });
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})