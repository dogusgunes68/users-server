import express from "express";
import "express-async-errors";
import { errorHandler } from "./middleware/error-handler";
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors/not-found-error";
import { userRouter } from "./routes/user-route";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use("/api/v1/users", userRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
