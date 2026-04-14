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
    totalBalance: 420_000_000,
    noMovement: 78_000_000,
    noPosition: 12_340,
    avgDaysStopped: 87,
    byUnit: units.slice(0, 5).map((unit, i) => ({
      unit,
      value: [120, 95, 82, 68, 55][i] * 1_000_000,
      noMovement: [22, 18, 15, 12, 11][i] * 1_000_000,
      daysStopped: [102, 87, 76, 65, 94][i],
    })),
  },
  seedlings: {
    totalBalance: 150_000_000,
    noMovement: 28_000_000,
    noPosition: 4_200,
    byNursery: [
      { name: "Viveiro Central – Imperatriz", value: 42_000_000, items: 8_200, aging: 67 },
      { name: "Viveiro Sul – Três Lagoas", value: 38_000_000, items: 7_100, aging: 54 },
      { name: "Viveiro Nordeste – Mucuri", value: 32_000_000, items: 5_800, aging: 78 },
      { name: "Viveiro Sudeste – Jacareí", value: 24_000_000, items: 4_500, aging: 45 },
      { name: "Viveiro Norte – Belém", value: 14_000_000, items: 2_600, aging: 92 },
    ],
  },
};

// TPEC
export const tpecData = {
  total: 4_213,
  totalValue: 156_000_000,
  avgDays: 134,
  byUnit: units.slice(0, 6).map((unit, i) => ({
    unit,
    items: [980, 820, 710, 640, 560, 503][i],
    value: [38, 32, 27, 23, 19, 17][i] * 1_000_000,
    avgDays: [156, 142, 128, 118, 134, 112][i],
  })),
  topMaterials: [
    { code: "PAP-8812-KR", desc: "Bobina Offset 90g Avariada", unit: "Unidade Imperatriz", days: 312, value: 2_800_000 },
    { code: "PAP-6634-CW", desc: "Papel Cartão 250g Sinistrado", unit: "Unidade Três Lagoas", days: 287, value: 2_400_000 },
    { code: "PAP-2219-LB", desc: "Kraft Liner 170g Danificado", unit: "Unidade Mucuri", days: 256, value: 1_900_000 },
    { code: "PAP-4451-RX", desc: "Tissue Base 15g Contaminado", unit: "Unidade Suzano", days: 234, value: 1_600_000 },
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
