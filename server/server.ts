import app from "./src/app.js";
import { connectDatabase } from "./src/config/database.js";
import config from "./src/config/config.js";

const startServer = async () => {
  await connectDatabase();
  app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});