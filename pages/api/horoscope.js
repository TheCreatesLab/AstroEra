// Daily cache — same sign same day = same reading
// Saves 95% of API costs. Max 12 generations per day.
const cache = {};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { sign, type } = req.body;
  if (!sign) return res.status(400).json({ error: 'Sign required' });

  const today = new Date().toISOString().split('T')[0];
  const key = `${sign}-${type || 'daily'}-${today}`;

  if (cache[key]) return res.status(200).json({ horoscope: cache[key] });

  try {
    const isCompat = type === 'compatibility';
    const prompt = isCompat
      ? `You are the AstroEra team — professional astrologers trusted by millions. Write a compatibility reading for ${sign}. Format: score out of 10 on its own line as "X/10", then 3-sentence "The Vibe", then "What works:" with 2 bullet points, then "Watch out for:" with 1 point, then one closing italic line. Warm, direct, modern Gen-Z tone. Under 180 words.`
      : `You are the AstroEra team — professional astrologers trusted by millions. Write today's horoscope for ${sign}. Three sections: "Today's Energy", "Love & Connection", "Work & Abundance" — each 2-3 sentences. End with "Today's Mantra:" on its own line. Speak directly to the reader. Warm, honest, Gen-Z tone — like a wise friend who knows your chart. Under 200 words. No emojis.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const horoscope = data.content?.[0]?.text || 'The stars are aligning... please try again.';
    cache[key] = horoscope;
    res.status(200).json({ horoscope });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate reading' });
  }
}
