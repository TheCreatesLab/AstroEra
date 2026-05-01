const cache = {};

function getWeekRange() {
  const now = new Date();
  const day = now.getDay();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - day + (day === 0 ? 0 : 7));
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(sunday)} – ${fmt(saturday)}`;
}

function getMonthName() {
  return new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getCacheKey(sign, type) {
  const now = new Date();
  if (type === "daily") return `${sign}-daily-${now.toISOString().split("T")[0]}`;
  if (type === "weekly") {
    const day = now.getDay();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - day + (day === 0 ? -6 : 1));
    return `${sign}-weekly-${weekStart.toISOString().split("T")[0]}`;
  }
  if (type === "monthly") return `${sign}-monthly-${now.getFullYear()}-${now.getMonth()}`;
  return `${sign}-${type}-${now.toISOString().split("T")[0]}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { sign, type } = req.body;
  if (!sign) return res.status(400).json({ error: "Sign required" });

  const key = getCacheKey(sign, type);
  if (cache[key]) return res.status(200).json({ horoscope: cache[key] });

  const weekRange = getWeekRange();
  const monthName = getMonthName();

  const prompts = {
    daily: `You are AstroEra — professional astrologers trusted by millions. Write today's horoscope for ${sign}. Three sections: "Today's Energy", "Love & Connection", "Work & Abundance" — each 2-3 sentences. End with "Today's Mantra:" on its own line. Warm, Gen-Z tone. Under 200 words. No emojis.`,
    weekly: `You are AstroEra — professional astrologers trusted by millions. Write the weekly horoscope for ${sign} for the week of ${weekRange}. Four sections: "This Week's Energy", "Love & Relationships", "Career & Money", "Health & Wellbeing" — each 2-3 sentences. End with "This Week's Mantra:" on its own line. Warm, insightful tone. Under 280 words. No emojis.`,
    monthly: `You are AstroEra — professional astrologers trusted by millions. Write the monthly horoscope for ${sign} for ${monthName}. Five sections: "Overall Energy", "Love & Relationships", "Career & Ambition", "Health & Wellbeing", "Key Dates to Watch" — each 2-3 sentences. End with "This Month's Mantra:" on its own line. Empowering tone. Under 350 words. No emojis.`,
    rising: `You are AstroEra — professional astrologers trusted by millions. Write a rising sign reading for ${sign} rising. Four sections: "First Impressions & Appearance", "How Others See You", "Your Life Approach", "What Your Soul Is Here to Learn" — each 2-3 sentences. Warm, personal tone. Under 300 words.`,
    compatibility: `You are AstroEra — professional astrologers. Write a compatibility reading for ${sign}. Include a score out of 10 on its own line as "X/10", then "The Vibe" (3 sentences), "What Works" (2 bullet points), "Watch Out For" (1 bullet point), and a closing line. Under 180 words.`,
    tarot_weekly: `You are AstroEra — professional astrologers and tarot readers. Write a weekly tarot reading for ${sign} for the week of ${weekRange}. Include: the card drawn (major arcana), what it means this week, guidance for love, guidance for career, and one action to take. Warm, empowering tone. Under 220 words.`,
  };

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        messages: [{ role: "user", content: prompts[type] || prompts.daily }],
      }),
    });

    const data = await response.json();
    const horoscope = data.content?.[0]?.text || "The stars are aligning... please try again.";
    cache[key] = horoscope;
    res.status(200).json({ horoscope });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate reading" });
  }
}