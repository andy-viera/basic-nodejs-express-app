import express from "express";
import bodyParser from "body-parser";
import booksRoutes from "./routes/books";
import authorsRoutes from "./routes/authors";
import categoriesRoutes from "./routes/categories";
import errorHandler from "./middleware/errorHandler";
import { env } from "./config/env";
import sequelize from "./models";

const app = express();
const port = env.PORT;

app.use(bodyParser.json());
app.use("/api/books", booksRoutes);
app.use("/api/authors", authorsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => console.error("Error syncing database:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
