import { Router } from "express";
import { getTracks, getTrack } from "#db/queries/tracks";

const router = Router();
const validId = (id) => /^[1-9]\d*$/.test(id) && Number.isSafeInteger(Number(id));

router.get("/", async (req, res) => {
  res.json(await getTracks());
});

router.get("/:id", async (req, res) => {
  if (!validId(req.params.id)) return res.sendStatus(400);
  const track = await getTrack(req.params.id);
  if (!track) return res.sendStatus(404);
  res.json(track);
});

export default router;