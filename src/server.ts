import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import databaseConnect from "./database";
import { expressMiddleware } from "@apollo/server/express4";
import { PORT } from "./config/config";
import { server } from "./graphql";
import router from "./routes";
import { verifyToken } from "./utils/generate_token";
import { urlMiddleware } from "./middleware/url.middleware";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/api",urlMiddleware);
databaseConnect();

async function startGraphqlServer(): Promise<void> {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async function ({ req }) {
        const token = req.headers.authorization;
        if (token) {
          try {
            return verifyToken(token);
          } catch (e) {
            return {};
          }
        } else {
          return {};
        }
      },
    })
  );
}

startGraphqlServer();
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server start port:${PORT} 🚀`);
});
