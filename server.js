require("dotenv").config();
const mongoose = require("mongoose");
require("colors");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful".bold.cyan.italic);
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}`.bold.cyan.italic
      );
    });
  })
  .catch((error) => {
    console.log(error.message.bold.red);
    process.exit(1);
  });
