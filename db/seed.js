import db from "#db/client";

await db.connect();
try {
  await seed();
  console.log("🌱 Database seeded.");
} finally {
  await db.end();
}

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await db.query(
      "INSERT INTO tracks (name, duration_ms) VALUES ($1, $2)",
      [`Track ${i}`, 150000 + i * 10000],
    );
  }

  for (let i = 1; i <= 10; i++) {
    await db.query(
      "INSERT INTO playlists (name, description) VALUES ($1, $2)",
      [`Playlist ${i}`, `Songs for playlist ${i}`],
    );
  }

  for (let i = 1; i <= 15; i++) {
    await db.query(
      "INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ($1, $2)",
      [((i - 1) % 10) + 1, i],
    );
  }
}