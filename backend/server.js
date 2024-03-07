const express = require("express");
const cors = require('cors');

const app = express();
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000;
const databaseConnect = require("./database");
const authRouter = require("./routes/auth.route");

dotenv.config();

app.use(cors());
app.use("/api/messenger", authRouter);

databaseConnect();

app.get('/', (req, res)=>{
  res.send('This is from backend Sever')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
