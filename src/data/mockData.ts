// Smart Capital - Mock Data Layer
// Simulated data for a ~R$9B industrial company

export const stockLines = [
  "Papel – Produto Acabado",
  "Papel – Semi Acabado",
  "Celulose",
  "Fluff",
  "Insumos Industriais e Florestais",
  "MRO Industrial e Florestal",
  "Madeira em Pilha",
  "Aparas",
  "Materiais de Terceiros",
  "Mudas",
] as const;

export const units = [
  "Unidade Imperatriz",
  "Unidade Três Lagoas",
  "Unidade Suzano",
  "Unidade Mucuri",
  "Unidade Limeira",
  "Unidade Jacareí",
  "Unidade Aracruz",
  "Unidade Belém",
] as const;

export const suppliers = [
  "Voith Paper S.A.",
  "Valmet Brasil Ltda.",
  "SKF do Brasil Ltda.",
  "Andritz Brasil Ltda.",
  "Buckman Laboratórios Ltda.",
  "Nalco Brasil Ltda.",
  "Metso Outotec Brasil",
  "ABB Ltda.",
  "Siemens Energy Brasil",
  "WEG S.A.",
  "Klabin Embalagens",
  "Fertibom Ind. Ltda.",
  "Bracell Bahia Specialty",
  "CMPC Celulose Riograndense",
];

// KPIs
export const kpis = {
  totalStockValue: 9_120_000_000,
  totalMaterials: 847_312,
  aged120PlusValue: 1_340_000_000,
  aged120PlusPercent: 14.7,
  inventoryPercent: 72.3,
  blockedMaterials: 12_847,
  blockedValue: 287_000_000,
  tpecTotal: 4_213,
  tpecValue: 156_000_000,
  noPositionMaterials: 3_892,
  criticalAlerts: 14,
};

// Stock distribution by line
export const stockDistribution = [
  { line: "Papel – Produto Acabado", value: 2_850_000_000, items: 124_500, percent: 31.3 },
  { line: "Papel – Semi Acabado", value: 1_420_000_000, items: 87_200, percent: 15.6 },
  { line: "Celulose", value: 1_180_000_000, items: 45_800, percent: 12.9 },
  { line: "Fluff", value: 680_000_000, items: 32_100, percent: 7.5 },
  { line: "Insumos Ind. e Florestais", value: 890_000_000, items: 156_400, percent: 9.8 },
  { line: "MRO Ind. e Florestal", value: 720_000_000, items: 234_700, percent: 7.9 },
  { line: "Madeira em Pilha", value: 540_000_000, items: 28_300, percent: 5.9 },
  { line: "Aparas", value: 380_000_000, items: 67_200, percent: 4.2 },
  { line: "Materiais de Terceiros", value: 310_000_000, items: 52_112, percent: 3.4 },
  { line: "Mudas", value: 150_000_000, items: 19_000, percent: 1.6 },
];

// Aging data
export const agingData = {
  summary: [
    { range: "120–180 dias", value: 520_000_000, items: 34_200, percent: 38.8 },
    { range: "181–365 dias", value: 480_000_000, items: 28_700, percent: 35.8 },
    { range: "Acima de 365 dias", value: 340_000_000, items: 18_400, percent: 25.4 },
  ],
  byLine: stockLines.map((line, i) => ({
    line,
    "120-180": [180, 95, 72, 35, 120, 210, 18, 45, 32, 8][i] * 1_000_000,
    "181-365": [160, 82, 64, 28, 98, 180, 15, 38, 27, 6][i] * 1_000_000,
    "365+": [110, 58, 42, 18, 68, 130, 10, 25, 18, 4][i] * 1_000_000,
  })),
  mroStrategic: {
    strategic: { value: 312_000_000, items: 8_420, percent: 60.2 },
    reduction: { value: 208_000_000, items: 5_630, percent: 39.8 },
  },
  mroIntelligence: {
    totalValue: 520_000_000,
    percentOfAging: 38.8,
    above180Percent: 59.6,
    criticalPercent: 42.3,
    avgCoverageMonths: 14.2,
    lowConsumptionPercent: 34.7,
    excessPercent: 22.1,
    // Visão por unidade — Risco Operacional
    criticalByUnit: [
      { unit: "Três Lagoas", type: "Industrial" as const, value: 38_500_000, items: 342, avgAging: 412, criticalPercent: 58, above180Percent: 72, coverage: 18.4 },
      { unit: "Imperatriz", type: "Industrial" as const, value: 32_100_000, items: 287, avgAging: 367, criticalPercent: 51, above180Percent: 65, coverage: 15.7 },
      { unit: "Mucuri", type: "Industrial" as const, value: 28_700_000, items: 265, avgAging: 298, criticalPercent: 44, above180Percent: 58, coverage: 13.2 },
      { unit: "Suzano", type: "Industrial" as const, value: 24_300_000, items: 198, avgAging: 345, criticalPercent: 47, above180Percent: 61, coverage: 14.8 },
      { unit: "Aracruz", type: "Industrial" as const, value: 21_800_000, items: 176, avgAging: 278, criticalPercent: 39, above180Percent: 52, coverage: 11.6 },
      { unit: "Jacareí", type: "Industrial" as const, value: 18_200_000, items: 154, avgAging: 234, criticalPercent: 35, above180Percent: 48, coverage: 10.3 },
      { unit: "Limeira", type: "Florestal" as const, value: 12_400_000, items: 112, avgAging: 312, criticalPercent: 28, above180Percent: 55, coverage: 16.1 },
      { unit: "Cachoeiro", type: "Florestal" as const, value: 9_800_000, items: 94, avgAging: 267, criticalPercent: 22, above180Percent: 44, coverage: 12.4 },
    ],
    // Visão por unidade — Oportunidade de Redução
    reductionByUnit: [
      { unit: "Três Lagoas", type: "Industrial" as const, value: 14_200_000, items: 1_240, avgAging: 445, lowConsumptionPercent: 78, action: "Reduzir" as const },
      { unit: "Imperatriz", type: "Industrial" as const, value: 11_800_000, items: 980, avgAging: 398, lowConsumptionPercent: 72, action: "Reduzir" as const },
      { unit: "Mucuri", type: "Industrial" as const, value: 9_600_000, items: 870, avgAging: 512, lowConsumptionPercent: 81, action: "Desmobilizar" as const },
      { unit: "Suzano", type: "Industrial" as const, value: 8_100_000, items: 720, avgAging: 367, lowConsumptionPercent: 68, action: "Reduzir" as const },
      { unit: "Aracruz", type: "Industrial" as const, value: 7_300_000, items: 645, avgAging: 423, lowConsumptionPercent: 74, action: "Desmobilizar" as const },
      { unit: "Jacareí", type: "Industrial" as const, value: 5_900_000, items: 510, avgAging: 345, lowConsumptionPercent: 65, action: "Reduzir" as const },
      { unit: "Limeira", type: "Florestal" as const, value: 4_200_000, items: 380, avgAging: 478, lowConsumptionPercent: 85, action: "Desmobilizar" as const },
      { unit: "Cachoeiro", type: "Florestal" as const, value: 3_100_000, items: 285, avgAging: 534, lowConsumptionPercent: 88, action: "Desmobilizar" as const },
    ],
    // Ranking de impacto por unidade
    impactRanking: [
      { unit: "Três Lagoas", type: "Industrial" as const, value: 52_700_000, items: 1_582, avgAging: 428, risk: "Alto" as const, excessPercent: 32 },
      { unit: "Imperatriz", type: "Industrial" as const, value: 43_900_000, items: 1_267, avgAging: 382, risk: "Alto" as const, excessPercent: 28 },
      { unit: "Mucuri", type: "Industrial" as const, value: 38_300_000, items: 1_135, avgAging: 405, risk: "Alto" as const, excessPercent: 30 },
      { unit: "Suzano", type: "Industrial" as const, value: 32_400_000, items: 918, avgAging: 356, risk: "Médio" as const, excessPercent: 24 },
      { unit: "Aracruz", type: "Industrial" as const, value: 29_100_000, items: 821, avgAging: 350, risk: "Médio" as const, excessPercent: 22 },
      { unit: "Jacareí", type: "Industrial" as const, value: 24_100_000, items: 664, avgAging: 289, risk: "Médio" as const, excessPercent: 19 },
      { unit: "Limeira", type: "Florestal" as const, value: 16_600_000, items: 492, avgAging: 395, risk: "Médio" as const, excessPercent: 26 },
      { unit: "Cachoeiro", type: "Florestal" as const, value: 12_900_000, items: 379, avgAging: 400, risk: "Alto" as const, excessPercent: 31 },
    ],
    classification: {
      healthy: { value: 187_000_000, items: 3_940, percent: 36.0 },
      attention: { value: 198_000_000, items: 4_820, percent: 38.1 },
      excess: { value: 135_000_000, items: 5_290, percent: 25.9 },
    },
  },
  topMaterials: [
    { code: "MRO-4521-BR", desc: "Rolamento Axial SKF 320mm", unit: "Unidade Três Lagoas", days: 847, value: 4_200_000, curve: "A" },
    { code: "INS-8834-FL", desc: "Resina Catiônica Premium", unit: "Unidade Imperatriz", days: 623, value: 3_800_000, curve: "A" },
    { code: "PAP-1209-AC", desc: "Bobina Kraft 120g/m² Especial", unit: "Unidade Mucuri", days: 542, value: 6_100_000, curve: "A" },
    { code: "MRO-7721-IN", desc: "Motor WEG W22 150cv", unit: "Unidade Suzano", days: 498, value: 2_900_000, curve: "B" },
    { code: "CEL-3345-PR", desc: "Celulose Branqueada Grau Especial", unit: "Unidade Aracruz", days: 456, value: 8_300_000, curve: "A" },
    { code: "FLF-0098-EX", desc: "Fluff Alta Absorção Exportação", unit: "Unidade Limeira", days: 412, value: 1_700_000, curve: "B" },
    { code: "APR-5567-RC", desc: "Aparas Brancas Selecionadas", unit: "Unidade Jacareí", days: 389, value: 980_000, curve: "C" },
    { code: "MRO-1123-EL", desc: "Inversor Frequência ABB 500kW", unit: "Unidade Belém", days: 367, value: 3_400_000, curve: "A" },
  ],
};

// Supplier materials
export const supplierMaterials = {
  summary: { total: 18_420, value: 892_000_000, inventoried: 67.3, notInventoried: 32.7 },
  bySupplier: suppliers.slice(0, 8).map((name, i) => ({
    supplier: name,
    items: [3200, 2800, 2400, 2100, 1900, 1700, 1500, 1320][i],
    value: [180, 152, 134, 112, 98, 84, 72, 60][i] * 1_000_000,
    inventoried: [72, 65, 80, 58, 71, 63, 77, 69][i],
    avgDays: [145, 178, 112, 234, 167, 198, 89, 156][i],
  })),
  agingBreakdown: [
    { range: "0–90 dias", value: 312_000_000, items: 7_800 },
    { range: "91–180 dias", value: 268_000_000, items: 5_420 },
    { range: "181–365 dias", value: 198_000_000, items: 3_400 },
    { range: "365+ dias", value: 114_000_000, items: 1_800 },
  ],
};

// Wood and seedlings
export const woodAndSeedlings = {
  wood: {
    // KPIs
    estDispoM3: 12_180_000,
    estDispoMoM: 11_900_000,
    estDispoVar: 2.33,
    valorTotal: 1_890_000_000,
    valorTotalMoM: 1_740_000_000,
    valorTotalVar: 8.27,
    agingM3: 850_000,
    agingM3MoM: 830_000,
    agingM3Var: 2.59,
    valorAging: 113_210_000,
    valorAgingMoM: 106_450_000,
    valorAgingVar: 5.97,
    posicoesIndef: 18,
    posicoesIndefMoM: 43,
    posicoesIndefVar: -58.14,
    // Estoque por UNF
    byUNF: [
      { unf: "MS", estDispoM3: 4_897_802, valor: 879_670_000 },
      { unf: "ARAMUC", estDispoM3: 3_308_784, valor: 412_670_000 },
      { unf: "SP", estDispoM3: 2_576_849, valor: 428_140_000 },
      { unf: "MA PA", estDispoM3: 1_397_927, valor: 167_870_000 },
    ],
    // Aging última movimentação em estoque (M³)
    agingByRange: [
      { range: "De 0 à 180", m3: 11_130_000, valor: 1_746_100_000 },
      { range: "De 181 à 240", m3: 400_000, valor: 58_300_000 },
      { range: "De 241 à 300", m3: 240_000, valor: 33_500_000 },
      { range: "De 301 à 360", m3: 130_000, valor: 17_900_000 },
      { range: "De 360 à acima", m3: 280_000, valor: 32_600_000 },
    ],
    // Madeira acima de 180 dias — insights por UNF
    above180ByUNF: [
      { unf: "MS", m3: 529_000, valor: 73_960_000, percent: 50, insight: "Unidade com maior volume de estoque concentrando 50% do total." },
      { unf: "SP", m3: 266_900, valor: 46_580_000, percent: 33, insight: "Segundo maior volume concentrando 33% do valor total." },
      { unf: "ARAMUC", m3: 239_700, valor: 20_030_000, percent: 0, insight: "Maior redução comparado ao mês anterior, reduzindo em 50% seu valor total." },
      { unf: "MA", m3: 13_900, valor: 1_710_000, percent: 0, insight: "Sem impacto relevante." },
    ],
    // Distribuição por Classificação de Madeira
    byClassification: [
      { tipo: "Celulose", m3: 680_520, valor: 94_670_000, percent: 64, insight: "Principal grupo de madeira sem movimentação representando 64% do total de estoque parado concentrado principalmente em MS (62,1%)." },
      { tipo: "Energia", m3: 201_080, valor: 29_960_000, percent: 19, insight: "Correspondente a 19% do valor total com volume maior em MS e ARAMUC." },
      { tipo: "Venda", m3: 167_830, valor: 20_660_000, percent: 16, insight: "Impacto menor (16%), porém relevante para gestão comercial e giro de estoques." },
    ],
  },
  seedlings: {
    // KPIs
    qtdTotal: 18_000,
    qtdTotalMoM: 18_000,
    qtdTotalVar: -1.29,
    valorTotal: 18_443_000,
    valorTotalMoM: 16_811_000,
    valorTotalVar: 9.71,
    qtdAcima60d: 1_500,
    qtdAcima60dMoM: 1_000,
    qtdAcima60dVar: 17.0,
    valorAcima60d: 1_109_070,
    valorAcima60dMoM: 955_000,
    valorAcima60dVar: 16.15,
    // Mudas por UNF — último mês
    byUNF: [
      { unf: "UNF Três Lagoas", qtdTotal: 3_700, qtdAcima60d: 100, valorTotal: 5_500_000, valorAcima60d: 200_000 },
      { unf: "UNF SP", qtdTotal: 2_600, qtdAcima60d: 0, valorTotal: 1_900_000, valorAcima60d: 0 },
      { unf: "UNF Ribas", qtdTotal: 6_800, qtdAcima60d: 100, valorTotal: 7_900_000, valorAcima60d: 100_000 },
      { unf: "UNF MA PA", qtdTotal: 500, qtdAcima60d: 0, valorTotal: 400_000, valorAcima60d: 0 },
      { unf: "UNF ARAMUC", qtdTotal: 4_400, qtdAcima60d: 1_300, valorTotal: 2_800_000, valorAcima60d: 800_000 },
    ],
    // Evolução mudas sem movimentação acima 60 dias
    evolution: [
      { month: "Dez 2025", data: [
        { unf: "UNF Três Lagoas", qtd: 800, valor: 490_000 },
        { unf: "UNF ARAMUC", qtd: 0, valor: 0 },
        { unf: "UNF SP", qtd: 0, valor: 100_000 },
        { unf: "UNF Ribas", qtd: 0, valor: 0 },
        { unf: "UNF MA PA", qtd: 0, valor: 0 },
      ]},
      { month: "Jan 2026", data: [
        { unf: "UNF Três Lagoas", qtd: 900, valor: 550_000 },
        { unf: "UNF ARAMUC", qtd: 300, valor: 290_000 },
        { unf: "UNF SP", qtd: 100, valor: 100_000 },
        { unf: "UNF Ribas", qtd: 0, valor: 0 },
        { unf: "UNF MA PA", qtd: 0, valor: 0 },
      ]},
      { month: "Fev 2026", data: [
        { unf: "UNF Três Lagoas", qtd: 1_300, valor: 820_000 },
        { unf: "UNF ARAMUC", qtd: 100, valor: 190_000 },
        { unf: "UNF SP", qtd: 100, valor: 0 },
        { unf: "UNF Ribas", qtd: 0, valor: 0 },
        { unf: "UNF MA PA", qtd: 0, valor: 0 },
      ]},
    ],
  },
};

// TPEC — Materiais de Sinistro aguardando baixa
export const tpecData = {
  // KPIs
  estDispoKg: 375_000,
  estDispoMoM: 397_000,
  estDispoVar: -5.59,
  estDispoAcima90d: 183_000,
  estDispoAcima90dMoM: 178_000,
  estDispoAcima90dVar: 2.35,
  valorTotal: 1_149_317,
  valorTotalMoM: 1_523_293,
  valorTotalVar: -24.80,
  valorAcima90d: 577_498,
  valorAcima90dMoM: 806_532,
  valorAcima90dVar: -28.40,
  // Estoque por local (KG e R$) — fora do prazo vs no prazo
  byLocal: [
    { local: "Fábrica Suzano", kgForaPrazo: 124_000, kgNoPrazo: 0, valorForaPrazo: 413_000, valorNoPrazo: 0 },
    { local: "Fábrica Limeira", kgForaPrazo: 107_000, kgNoPrazo: 0, valorForaPrazo: 322_000, valorNoPrazo: 0 },
    { local: "CD Pinhais", kgForaPrazo: 50_000, kgNoPrazo: 0, valorForaPrazo: 182_000, valorNoPrazo: 0 },
    { local: "CD Serra", kgForaPrazo: 64_000, kgNoPrazo: 0, valorForaPrazo: 158_000, valorNoPrazo: 0 },
    { local: "CDL Fortaleza", kgForaPrazo: 29_000, kgNoPrazo: 0, valorForaPrazo: 74_000, valorNoPrazo: 0 },
  ],
  // Estoque disponível KG por mês (stacked: fora do prazo + no prazo)
  monthlyKg: [
    { month: "Mar/25", foraPrazo: 148_000, noPrazo: 100_000 },
    { month: "Abr/25", foraPrazo: 173_000, noPrazo: 42_000 },
    { month: "Mai/25", foraPrazo: 175_000, noPrazo: 73_000 },
    { month: "Jun/25", foraPrazo: 97_000, noPrazo: 118_000 },
    { month: "Jul/25", foraPrazo: 192_000, noPrazo: 56_000 },
    { month: "Ago/25", foraPrazo: 219_000, noPrazo: 29_000 },
    { month: "Set/25", foraPrazo: 136_000, noPrazo: 83_000 },
    { month: "Out/25", foraPrazo: 148_000, noPrazo: 67_000 },
    { month: "Nov/25", foraPrazo: 128_000, noPrazo: 87_000 },
    { month: "Dez/25", foraPrazo: 115_000, noPrazo: 100_000 },
    { month: "Jan/26", foraPrazo: 138_000, noPrazo: 77_000 },
    { month: "Fev/26", foraPrazo: 125_000, noPrazo: 90_000 },
  ],
  // Valor do estoque por mês (stacked)
  monthlyValor: [
    { month: "Mar/25", foraPrazo: 484_000, noPrazo: 165_000 },
    { month: "Abr/25", foraPrazo: 544_000, noPrazo: 89_000 },
    { month: "Mai/25", foraPrazo: 619_000, noPrazo: 130_000 },
    { month: "Jun/25", foraPrazo: 751_000, noPrazo: 98_000 },
    { month: "Jul/25", foraPrazo: 596_000, noPrazo: 126_000 },
    { month: "Ago/25", foraPrazo: 807_000, noPrazo: 120_000 },
    { month: "Set/25", foraPrazo: 572_000, noPrazo: 150_000 },
    { month: "Out/25", foraPrazo: 610_000, noPrazo: 112_000 },
    { month: "Nov/25", foraPrazo: 577_000, noPrazo: 145_000 },
    { month: "Dez/25", foraPrazo: 490_000, noPrazo: 132_000 },
    { month: "Jan/26", foraPrazo: 520_000, noPrazo: 103_000 },
    { month: "Fev/26", foraPrazo: 480_000, noPrazo: 118_000 },
  ],
  // Evolução No Prazo x Fora do Prazo (KG — linha)
  evolutionKg: [
    { month: "Mar/25", foraPrazo: 120_000, noPrazo: 164_000 },
    { month: "Abr/25", foraPrazo: 115_000, noPrazo: 148_000 },
    { month: "Mai/25", foraPrazo: 136_000, noPrazo: 130_000 },
    { month: "Jun/25", foraPrazo: 57_000, noPrazo: 173_000 },
    { month: "Jul/25", foraPrazo: 215_000, noPrazo: 180_000 },
    { month: "Ago/25", foraPrazo: 249_000, noPrazo: 170_000 },
    { month: "Set/25", foraPrazo: 178_000, noPrazo: 192_000 },
    { month: "Out/25", foraPrazo: 163_000, noPrazo: 143_000 },
    { month: "Nov/25", foraPrazo: 141_000, noPrazo: 128_000 },
  ],
  // Highlights
  highlights: [
    "R$ 1,15 MM de valor total em TPEC, representando redução de -24,80% vs mês anterior, refletindo baixa e tratamento de saldos no período.",
    "Redução do estoque total para 375 mil kg, indicando avanço no saneamento geral dos materiais em TPEC.",
    "Redução relevante do valor acima de 90 dias, que passou de R$ 806 mil para R$ 577 mil, demonstrando evolução no tratamento do estoque crítico.",
  ],
  // Ações pendentes
  actions: [
    "107 toneladas em Limeira aguardando aprovação do jurídico para baixa.",
    "Na Fábrica Suzano, sinistro da SuzanLog já comunicado via e-mail de cobrança, aguardando retorno até 23/03.",
    "Em CD Pinhais, sinistro aguardando aprovação para baixa.",
  ],
};

// Blocked materials and reversals
export const blockedData = {
  blocked: {
    total: 12_847,
    value: 287_000_000,
    byReason: [
      { reason: "Qualidade", items: 4_820, value: 108_000_000 },
      { reason: "Inspeção pendente", items: 3_210, value: 72_000_000 },
      { reason: "Divergência fiscal", items: 2_450, value: 56_000_000 },
      { reason: "Avaria logística", items: 1_380, value: 31_000_000 },
      { reason: "Decisão gerencial", items: 987, value: 20_000_000 },
    ],
    byUnit: units.slice(0, 6).map((unit, i) => ({
      unit,
      items: [3200, 2800, 2100, 1900, 1500, 1347][i],
      value: [72, 62, 47, 42, 34, 30][i] * 1_000_000,
      avgDays: [89, 112, 67, 98, 78, 102][i],
    })),
  },
  reversals: {
    total: 6_240,
    value: 134_000_000,
    recurrent: 2_180,
    byPeriod: [
      { month: "Jan", items: 480, value: 10_200_000 },
      { month: "Fev", items: 520, value: 11_400_000 },
      { month: "Mar", items: 610, value: 13_100_000 },
      { month: "Abr", items: 540, value: 11_800_000 },
      { month: "Mai", items: 490, value: 10_600_000 },
      { month: "Jun", items: 580, value: 12_500_000 },
      { month: "Jul", items: 530, value: 11_200_000 },
      { month: "Ago", items: 620, value: 13_400_000 },
      { month: "Set", items: 470, value: 10_000_000 },
      { month: "Out", items: 550, value: 11_900_000 },
      { month: "Nov", items: 510, value: 11_000_000 },
      { month: "Dez", items: 340, value: 6_900_000 },
    ],
  },
};

// Volumetry & inventory
export const volumetryData = {
  lines: stockDistribution.map((s, i) => ({
    ...s,
    inventoried: [78, 71, 82, 69, 65, 58, 74, 63, 52, 80][i],
    notInventoried: [22, 29, 18, 31, 35, 42, 26, 37, 48, 20][i],
    annualBase: [95, 88, 92, 84, 78, 72, 86, 70, 65, 90][i],
  })),
  monthlyEvolution: [
    { month: "Jan", covered: 8.2 },
    { month: "Fev", covered: 16.1 },
    { month: "Mar", covered: 25.4 },
    { month: "Abr", covered: 33.8 },
    { month: "Mai", covered: 42.1 },
    { month: "Jun", covered: 50.7 },
    { month: "Jul", covered: 58.3 },
    { month: "Ago", covered: 64.9 },
    { month: "Set", covered: 72.3 },
    { month: "Out", covered: 0 },
    { month: "Nov", covered: 0 },
    { month: "Dez", covered: 0 },
  ],
};

// Monthly trend for overview
export const monthlyTrend = [
  { month: "Jan", value: 8_420_000_000, aged: 1_120_000_000 },
  { month: "Fev", value: 8_580_000_000, aged: 1_180_000_000 },
  { month: "Mar", value: 8_730_000_000, aged: 1_210_000_000 },
  { month: "Abr", value: 8_810_000_000, aged: 1_250_000_000 },
  { month: "Mai", value: 8_920_000_000, aged: 1_270_000_000 },
  { month: "Jun", value: 8_950_000_000, aged: 1_290_000_000 },
  { month: "Jul", value: 9_010_000_000, aged: 1_310_000_000 },
  { month: "Ago", value: 9_080_000_000, aged: 1_320_000_000 },
  { month: "Set", value: 9_120_000_000, aged: 1_340_000_000 },
];

// Alerts
export const alerts = [
  { id: 1, severity: "critical", message: "MRO Três Lagoas: 210 itens acima de 365 dias sem movimentação (+R$ 48M)", module: "aging" },
  { id: 2, severity: "critical", message: "TPEC Imperatriz: 12 bobinas aguardando baixa há mais de 300 dias", module: "tpec" },
  { id: 3, severity: "warning", message: "Inventário anual em 72.3% — meta de 80% para outubro em risco", module: "volumetry" },
  { id: 4, severity: "warning", message: "Materiais bloqueados por qualidade cresceram 18% vs mês anterior", module: "blocked" },
  { id: 5, severity: "critical", message: "Fornecedor Voith: 890 itens não inventariados há mais de 180 dias", module: "supplier" },
  { id: 6, severity: "warning", message: "Viveiro Nordeste – Mucuri: aging médio de mudas acima de 78 dias", module: "wood" },
  { id: 7, severity: "info", message: "Celulose Aracruz: cobertura de inventário atingiu 82% — dentro da meta", module: "volumetry" },
  { id: 8, severity: "critical", message: "Estornos recorrentes: 2.180 materiais com 3+ reversões no ano", module: "blocked" },
];

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) return `R$ ${(value / 1_000_000_000).toFixed(2)} bi`;
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)} mi`;
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(1)} mil`;
  return `R$ ${value.toFixed(2)}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}
