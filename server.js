require("dotenv").config();
const app = require("./app");

// const defaultPort = 3000;
// const port = process.env.PORT || defaultPort;
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
