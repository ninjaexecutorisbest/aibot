export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const response = await fetch('https://api.sambanova.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'f82c1018-c36c-4d3f-91e6-793a607ccd8c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });

  const data = await response.json();
  res.status(200).json(data);
}
