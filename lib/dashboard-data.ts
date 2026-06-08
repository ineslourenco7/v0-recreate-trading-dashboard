/**
 * Static mock data for the HERMES cockpit dashboard.
 * Centralised here so panels stay presentational and easy to wire to a real API later.
 */

export const tickers = [
  { symbol: "BTCUSD", price: "68,243.0", change: "+1.27%", dir: "up" as const },
  { symbol: "XAUUSD", price: "2,349.57", change: "+0.63%", dir: "up" as const },
  { symbol: "EURUSD", price: "1.08221", change: "-0.21%", dir: "down" as const },
  { symbol: "NAS100", price: "18,765.4", change: "+0.74%", dir: "up" as const },
  { symbol: "US30", price: "39,512.3", change: "+0.35%", dir: "up" as const },
]

export const navItems = [
  { icon: "LayoutDashboard", label: "Cockpit", sub: "Centro de Guerra", active: true },
  { icon: "Radar", label: "Radar de Mercado", sub: "Manipulação & Liquidez" },
  { icon: "BrainCircuit", label: "Análise IA", sub: "Cenários & Probabilidades" },
  { icon: "GraduationCap", label: "Mentor", sub: "IA Pessoal" },
  { icon: "NotebookPen", label: "Diário de Trading", sub: "Performance & Estatísticas" },
  { icon: "MessagesSquare", label: "Sala de Trading", sub: "Trading Room" },
  { icon: "Copy", label: "Copy Trading", sub: "Sinais & Estratégias" },
  { icon: "CalendarDays", label: "Calendário", sub: "Económico" },
  { icon: "Globe", label: "Mapas", sub: "Correlação Global" },
  { icon: "BookOpen", label: "Recursos", sub: "Aprender & Evoluir" },
  { icon: "Settings", label: "Configurações", sub: "Conta & Preferências" },
]

export const marketScore = [
  { symbol: "XAUUSD", score: 92, tone: "high" as const, flag: "🥇" },
  { symbol: "BTCUSD", score: 88, tone: "high" as const, flag: "🟠" },
  { symbol: "NAS100", score: 76, tone: "mid" as const, flag: "🟢" },
  { symbol: "EURUSD", score: 45, tone: "low" as const, flag: "🇪🇺" },
  { symbol: "GBPUSD", score: 40, tone: "low" as const, flag: "🇬🇧" },
  { symbol: "US30", score: 38, tone: "low" as const, flag: "🔵" },
]

export const newsItems = [
  { time: "14:30", title: "CPI m/m", impact: "ALTO" as const, when: "Em 45m" },
  { time: "16:00", title: "USD Fed Chair Powell Speaks", impact: "ALTO" as const, when: "Em 2h 15m" },
  { time: "09:30", title: "GBP GDP m/m", impact: "MÉDIO" as const, when: "Amanhã" },
]

export const topSetups = [
  { rank: 1, name: "Liquidity Sweep + BOS", rate: "68.7%", count: 32 },
  { rank: 2, name: "FVG + Order Block", rate: "64.2%", count: 28 },
  { rank: 3, name: "Breaker Block", rate: "61.1%", count: 22 },
  { rank: 4, name: "Trend Continuation", rate: "57.8%", count: 19 },
]

export const copyTraders = [
  { name: "AlphaTrader", change: "+27.8%", risk: "Risco 2/10", avatar: "/avatars/trader1.png" },
  { name: "KingLiquidity", change: "+19.3%", risk: "Risco 3/10", avatar: "/avatars/trader2.png" },
  { name: "MacroHunter", change: "+15.7%", risk: "Risco 2/10", avatar: "/avatars/trader3.png" },
]

export const chatMessages = [
  {
    time: "12:45",
    name: "AlphaTrader",
    avatar: "/avatars/trader1.png",
    text: "GOLD a reagir na zona de liquidez como esperado!",
    done: true,
  },
  {
    time: "12:45",
    name: "Inês Traders",
    avatar: "/avatars/ines.png",
    text: "Concordo! Estou a ver estruturas de reversão",
  },
  {
    time: "12:46",
    name: "MarketMaster",
    avatar: "/avatars/trader2.png",
    text: "Cuidado com a notícia às 14:30!",
  },
]

export const mentorTips = [
  { icon: "plus", text: "Evita operar nas sextas-feiras." },
  { icon: "plus", text: "Os teus melhores resultados são entre 14:00 - 18:00 (Londres)." },
  { icon: "minus", text: "Reduz o tamanho da posição em setups de notícias." },
]
