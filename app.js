import express from "express";
import tracksRouter from "./api/tracks.js";
import playlistsRouter from "./api/playlists.js";

const app = express();
app.use(express.json());
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  res.status(500).json({ error: "Internal server error" });
});

export default app;