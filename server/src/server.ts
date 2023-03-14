import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.shhh_secret = "doggy";
//   next();
// });

app.get("/", (req, res) => {
  console.log("Hello");
  res.status(200);
  res.json({ message: "Hello" });
});

app.post("/user", createNewUser);
app.post("/signin", signin);

app.use("/api", protect, router);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "inputs") {
    res.status(400).json({ message: "Invalid input" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

export default app;
