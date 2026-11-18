import db from "#db/client";

export async function getTracks() {
  const { rows } = await db.query("SELECT * FROM tracks ORDER BY id");
  return rows;
}

export async function getTrack(id) {
  const { rows } = await db.query("SELECT * FROM tracks WHERE id = $1", [id]);
  return rows[0];
}