"use client"

import { useMemo, useState } from "react"
import { ModuleCard, ModulePage } from "@/components/hermes/module-page"

const mentorModes = ["Sessão", "Psicologia", "Risco", "Setup"] as const

type MentorMode = (typeof mentorModes)[number]

type Insight = {
  id: string
  title: string
  severity: "Info" | "Atenção" | "Bloqueio"
  body: string
}

const insightPool: Record<MentorMode, Insight[]> = {
  Sessão: [
    { id: "s1", title: "Ritmo de sessão elevado", severity: "Atenção", body: "Estás a simular 5+ decisões num curto intervalo. Reduz a velocidade e espera confirmação clara." },
    { id: "s2", title: "Boa janela para observar", severity: "Info", body: "O mercado ainda não deu entrada limpa. Mantém watchlist em XAUUSD e BTCUSD." },
  ],
  Psicologia: [
    { id: "p1", title: "Risco de FOMO", severity: "Atenção", body: "O preço já se afastou da zona ideal. Entrar agora aumenta a probabilidade de chase." },
    { id: "p2", title: "Disciplina preservada", severity: "Info", body: "Esperar pela liquidez ser varrida é mais importante do que apanhar o primeiro impulso." },
  ],
  Risco: [
    { id: "r1", title: "Reduzir exposição", severity: "Atenção", body: "Para este contexto, o risco sugerido é 0.5% até haver confirmação de direção." },
    { id: "r2", title: "Trade bloqueado", severity: "Bloqueio", body: "Não executar se já atingiste o limite diário ou se a entrada não respeitar SL lógico." },
  ],
  Setup: [
    { id: "st1", title: "Setup 123 incompleto", severity: "Atenção", body: "A Vela 3 ainda não confirmou continuação. Espera fecho acima/abaixo da estrutura." },
    { id: "st2", title: "Pullback válido", severity: "Info", body: "O setup ganha qualidade se houver reteste à zona da EMA/pullback com pavio de rejeição." },
  ],
}

export default function MentorPage() {
  const [mode, setMode] = useState<MentorMode>("Sessão")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("Escolhe um modo e pede uma leitura. O Mentor está em modo mock funcional.")
  const [history, setHistory] = useState<string[]>([])

  const insights = useMemo(() => insightPool[mode], [mode])

  function askMentor() {
    const clean = question.trim()
    const main = insights[0]
    const response = clean
      ? `${main.title}: ${main.body} Pergunta analisada: “${clean}”.`
      : `${main.title}: ${main.body}`

    setAnswer(response)
    setHistory((current) => [response, ...current].slice(0, 5))
    setQuestion("")
  }

  return (
    <ModulePage
      eyebrow="Módulo 05"
      title="Mentor IA"
      description="Mentor contextual para disciplina, risco e leitura de setups. O objetivo não é dar sinais cegos, é impedir más decisões e melhorar execução."
    >
      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <ModuleCard title="Conversa com o Mentor">
          <div className="mb-4 flex flex-wrap gap-2">
            {mentorModes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  mode === item
                    ? "border-primary/70 bg-primary/15 text-primary"
                    : "border-border/70 bg-secondary/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border/70 bg-secondary/30 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Resposta do Mentor</p>
            <p className="mt-3 text-base leading-7 text-foreground">{answer}</p>
          </div>

          <div className="mt-4 flex flex-col gap-2 md:flex-row">
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ex: posso comprar XAUUSD agora?"
              className="h-11 flex-1 rounded-xl border border-border/70 bg-secondary/40 px-4 text-sm outline-none transition focus:border-primary/50"
            />
            <button onClick={askMentor} className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90">
              Analisar decisão
            </button>
          </div>
        </ModuleCard>

        <ModuleCard title="Insights ativos">
          <div className="space-y-3">
            {insights.map((insight) => (
              <div key={insight.id} className="rounded-xl border border-border/70 bg-background/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black">{insight.title}</p>
                  <span className="rounded-full border border-border/70 bg-secondary/50 px-2 py-1 text-[10px] font-bold text-muted-foreground">
                    {insight.severity}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{insight.body}</p>
              </div>
            ))}
          </div>
        </ModuleCard>
      </div>

      <ModuleCard title="Histórico desta sessão">
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">Ainda sem análises nesta sessão.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((item, index) => (
              <li key={index} className="rounded-xl border border-border/70 bg-secondary/30 p-3 text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        )}
      </ModuleCard>
    </ModulePage>
  )
}
