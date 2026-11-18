import db from "#db/client";

export async function getPlaylists() {
  const { rows } = await db.query("SELECT * FROM playlists ORDER BY id");
  return rows;
}

export async function createPlaylist({ name, description }) {
  const { rows } = await db.query(
    "INSERT INTO playlists (name, description) VALUES ($1, $2) RETURNING *",
    [name, description],
  );
  return rows[0];
}

export async function getPlaylist(id) {
  const { rows } = await db.query("SELECT * FROM playlists WHERE id = $1", [id]);
  return rows[0];
}

export async function getPlaylistTracks(id) {
  const { rows } = await db.query(
    `SELECT tracks.* FROM tracks
     JOIN playlists_tracks ON playlists_tracks.track_id = tracks.id
     WHERE playlists_tracks.playlist_id = $1 ORDER BY tracks.id`,
    [id],
  );
  return rows;
}

export async function addPlaylistTrack(playlistId, trackId) {
  const { rows } = await db.query(
    "INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ($1, $2) RETURNING *",
    [playlistId, trackId],
  );
  return rows[0];
}