const express = require("express");
const app = express();

app.use(express.json());

const Users = require("./routes/users");
app.use("/users", Users);

const PORT = 8000;
app.listen(PORT, () => console.log(`${PORT} is Listen`));