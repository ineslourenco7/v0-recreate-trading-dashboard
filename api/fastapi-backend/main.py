
from fastapi import FastAPI
from datetime import datetime, timedelta

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Bem-vindo ao Backend do Trading Room!"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/api/journal")
async def get_journal_entries():
    now = datetime.now()
    return {
        "entries": [
            {
                "date": (now - timedelta(days=1)).isoformat(),
                "text": "Hoje controla o risco. Menos setups, mais rigor.",
                "tags": ["risk", "discipline"],
                "insight": ""
            },
            {
                "date": (now - timedelta(days=2)).isoformat(),
                "text": "Lucro consistente na sessão de Londres.",
                "tags": ["win"],
                "insight": "Manter stop curto no último setup."
            },
            {
                "date": (now - timedelta(days=3)).isoformat(),
                "text": "Recuperação após perda: respeitar pausa obrigatória.",
                "tags": ["psychology"],
                "insight": ""
            },
        ],
        "updated_at": now.isoformat()
    }

@app.get("/api/market/score")
async def get_market_score():
    return {
        "asset": "XAU/USD",
        "score": 82,
        "metrics": {
            "trade_count": 1247,
            "win_rate": 0.58,
            "total_pnl_pct": 0.12,
        },
        "items": [
            { "symbol": "XAUUSD", "score": 92, "tone": "high", "flag": "🥇" },
            { "symbol": "BTCUSD", "score": 88, "tone": "high", "flag": "🟠" },
            { "symbol": "NAS100", "score": 76, "tone": "mid", "flag": "🟢" },
            { "symbol": "EURUSD", "score": 45, "tone": "low", "flag": "🇪🇺" },
            { "symbol": "GBPUSD", "score": 40, "tone": "low", "flag": "🇬🇧" },
            { "symbol": "US30", "score": 38, "tone": "low", "flag": "🔵" },
        ],
    }
