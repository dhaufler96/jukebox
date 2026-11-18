import { Router } from "express";
import { getTrack } from "#db/queries/tracks";
import {
  getPlaylists, createPlaylist, getPlaylist,
  getPlaylistTracks, addPlaylistTrack,
} from "#db/queries/playlists";

const router = Router();
const validId = (id) => /^[1-9]\d*$/.test(String(id)) && Number.isSafeInteger(Number(id));

router.get("/", async (req, res) => {
  res.json(await getPlaylists());
});

router.post("/", async (req, res) => {
  const { name, description } = req.body ?? {};
  if (typeof name !== "string" || !name.trim() ||
      typeof description !== "string" || !description.trim()) {
    return res.sendStatus(400);
  }
  const playlist = await createPlaylist({ name, description });
  res.status(201).json(playlist);
});

router.get("/:id", async (req, res) => {
  if (!validId(req.params.id)) return res.sendStatus(400);
  const playlist = await getPlaylist(req.params.id);
  if (!playlist) return res.sendStatus(404);
  res.json(playlist);
});

router.get("/:id/tracks", async (req, res) => {
  if (!validId(req.params.id)) return res.sendStatus(400);
  const playlist = await getPlaylist(req.params.id);
  if (!playlist) return res.sendStatus(404);
  res.json(await getPlaylistTracks(req.params.id));
});

router.post("/:id/tracks", async (req, res) => {
  if (!validId(req.params.id)) return res.sendStatus(400);
  const { trackId } = req.body ?? {};
  if (!validId(trackId) || typeof trackId !== "number") return res.sendStatus(400);
  const playlist = await getPlaylist(req.params.id);
  if (!playlist) return res.sendStatus(404);
  const track = await getTrack(trackId);
  if (!track) return res.sendStatus(400);
  const existing = await getPlaylistTracks(req.params.id);
  if (existing.some((item) => item.id === trackId)) return res.sendStatus(400);
  const result = await addPlaylistTrack(req.params.id, trackId);
  res.status(201).json(result);
});

export default router;