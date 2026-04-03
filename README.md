# Marathon Tracker V2

Aplicação web de acompanhamento de treinamento de corrida e maratona.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- React Hook Form + Zod
- Recharts

## Funcionalidades incluídas
- Dashboard com KPIs
- Prontidão diária
- Log de treinos de corrida
- Log de treinos de força
- Importação XLSX
- Alertas e recomendações
- Plano adaptativo
- Auth base + middleware + RLS
- Testes unitários e E2E
- Estrutura pronta para multiusuário

## Como rodar

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

## Banco / Supabase
Execute as migrations em `supabase/migrations`.

## Observações
- O projeto está organizado em `domain`, `features`, `data`, `lib`, `types` e `components`.
- A integração Apple Saúde não está incluída neste ZIP web; ela exige companion app iOS nativo/custom build.
