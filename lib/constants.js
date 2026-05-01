export const SIGNS = [
  { n: "Aries", s: "♈", d: "Mar 21–Apr 19", el: "Fire" },
  { n: "Taurus", s: "♉", d: "Apr 20–May 20", el: "Earth" },
  { n: "Gemini", s: "♊", d: "May 21–Jun 20", el: "Air" },
  { n: "Cancer", s: "♋", d: "Jun 21–Jul 22", el: "Water" },
  { n: "Leo", s: "♌", d: "Jul 23–Aug 22", el: "Fire" },
  { n: "Virgo", s: "♍", d: "Aug 23–Sep 22", el: "Earth" },
  { n: "Libra", s: "♎", d: "Sep 23–Oct 22", el: "Air" },
  { n: "Scorpio", s: "♏", d: "Oct 23–Nov 21", el: "Water" },
  { n: "Sagittarius", s: "♐", d: "Nov 22–Dec 21", el: "Fire" },
  { n: "Capricorn", s: "♑", d: "Dec 22–Jan 19", el: "Earth" },
  { n: "Aquarius", s: "♒", d: "Jan 20–Feb 18", el: "Air" },
  { n: "Pisces", s: "♓", d: "Feb 19–Mar 20", el: "Water" },
];

export const SIGN_COLORS = [
  "#FFE4E1","#FFE8CC","#E8F4FF","#E1F5E8",
  "#FFF3CC","#E8F5E1","#F0E8FF","#FFE1EC",
  "#FFE8CC","#E8F0FF","#E1F0FF","#E8E1FF"
];

export const GRAD = "linear-gradient(135deg,#FF6CAB,#C084FC)";

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Poppins', sans-serif; background: #FFFAF5; color: #1A0530; overflow-x: hidden; width: 100%; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
  @keyframes shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #E8C8F0; border-radius: 4px; }
  select option { background: #fff; color: #1A0530; }
  .desk-links { display: flex !important; }
  .mob-cta { display: none !important; }
  @media (max-width: 640px) {
    .desk-links { display: none !important; }
    .mob-cta { display: block !important; }
  }
`;

export const TAROT_CARDS = [
  { name: "The Star", emoji: "⭐", meaning: "Hope, renewal, and inspiration are flowing your way. Trust the universe has a plan." },
  { name: "The Moon", emoji: "🌙", meaning: "Trust your intuition today. Things are not as they appear on the surface." },
  { name: "The Sun", emoji: "☀️", meaning: "Joy, success and vitality surround you. This is a day to shine bright." },
  { name: "The World", emoji: "🌍", meaning: "Completion and achievement. You are exactly where you need to be." },
  { name: "The Lovers", emoji: "💞", meaning: "A meaningful choice in love or values awaits. Follow your heart." },
  { name: "The Empress", emoji: "👑", meaning: "Abundance, creativity and nurturing energy. Something beautiful is growing." },
  { name: "The High Priestess", emoji: "🔮", meaning: "Your inner wisdom holds the answers. Go within before looking outward." },
  { name: "Wheel of Fortune", emoji: "🎡", meaning: "Change is coming. The wheel turns in your favour today." },
  { name: "The Tower", emoji: "⚡", meaning: "A sudden shift clears the path for something better. Release what no longer serves." },
  { name: "Strength", emoji: "🦁", meaning: "You have more inner strength than you realise. Face today with courage." },
  { name: "The Hermit", emoji: "🕯️", meaning: "Solitude and reflection will bring clarity. Seek your own counsel." },
  { name: "Justice", emoji: "⚖️", meaning: "Balance and fairness prevail. The right outcome is coming." },
  { name: "The Chariot", emoji: "🏆", meaning: "Drive and determination lead to victory. Keep pushing forward." },
  { name: "Temperance", emoji: "🌊", meaning: "Balance and patience are your superpowers right now. Flow, don't force." },
  { name: "The Fool", emoji: "🌈", meaning: "A new beginning calls. Take the leap with an open heart." },
  { name: "The Magician", emoji: "✨", meaning: "You have all the tools you need. The power is already in your hands." },
  { name: "The Emperor", emoji: "🏛️", meaning: "Structure and authority work in your favour. Take charge of your situation." },
  { name: "The Hierophant", emoji: "📚", meaning: "Traditional wisdom and guidance from a mentor will serve you well today." },
  { name: "The Hanged Man", emoji: "🙃", meaning: "A pause and shift in perspective unlocks a new way forward." },
  { name: "Death", emoji: "🦋", meaning: "Transformation is underway. An ending makes space for a beautiful new beginning." },
  { name: "The Devil", emoji: "🔗", meaning: "Examine what is holding you back. You have the power to break free." },
  { name: "Judgement", emoji: "🎺", meaning: "A moment of clarity and awakening. Forgive yourself and rise." },
];

export const PLANETS = [
  { name: "Mercury", emoji: "☿", rules: "Communication & thinking", status: "Direct", effect: "Clear communication flows easily. Great time for important conversations, signing contracts, and making decisions." },
  { name: "Venus", emoji: "♀", rules: "Love & beauty", status: "Direct", effect: "Romantic energy is warm and inviting. Express your feelings openly — they will be well received." },
  { name: "Mars", emoji: "♂", rules: "Action & energy", status: "Direct", effect: "Your drive and ambition are fired up. Channel this energy into goals that matter to you." },
  { name: "Jupiter", emoji: "♃", rules: "Growth & luck", status: "Direct", effect: "Expansion and abundance are on the horizon. Say yes to new opportunities — Jupiter rewards bold moves." },
  { name: "Saturn", emoji: "♄", rules: "Discipline & karma", status: "Direct", effect: "Hard work pays off now. Saturn rewards those who show up consistently and honour their commitments." },
  { name: "Uranus", emoji: "♅", rules: "Change & innovation", status: "Retrograde", effect: "Internal revolution is brewing. You may be questioning long-held beliefs — this is healthy and necessary." },
  { name: "Neptune", emoji: "♆", rules: "Dreams & intuition", status: "Direct", effect: "Your intuition and creativity are heightened. Pay attention to dreams — they carry important messages." },
  { name: "Pluto", emoji: "♇", rules: "Power & transformation", status: "Retrograde", effect: "Deep transformation continues beneath the surface. Old power structures in your life are shifting." },
];
