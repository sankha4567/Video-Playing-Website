import fetch from "node-fetch"; // only needed for Node environment

export default async function handler(req, res) {
  const query = req.query.q;
  if (!query) {
    res.status(400).json({ error: "Query missing" });
    return;
  }

  try {
    // Call the old YouTube suggestion API
    const response = await fetch(
      `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`
    );

    const data = await response.json(); // this will be valid JSON
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
}
