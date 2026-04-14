// Suzano brand palette for charts — standardized across all pages
// Primary colors
export const BRAND_BLUE = "#1932C8";
export const BRAND_DARK_BLUE = "#03267F";
export const BRAND_GREEN = "#00C85A";
export const BRAND_DARK_GREEN = "#007836";
export const BRAND_ORANGE = "#C85F0F";
export const BRAND_GOLD = "#C8910F";
export const BRAND_ROSE = "#B44B5A";
export const BRAND_BROWN = "#91714B";
export const BRAND_DARK_BROWN = "#4B2D32";
export const BRAND_SAGE = "#AEAB9E";

// Semantic colors
export const CHART_CRITICAL = "hsl(0, 72%, 51%)"; // red — keep for critical/danger
export const CHART_SUCCESS = BRAND_GREEN;
export const CHART_WARNING = BRAND_GOLD;
export const CHART_INFO = BRAND_BLUE;

// Ordered palette for multi-series charts (pie, bar stacks, etc.)
export const CHART_PALETTE = [
  BRAND_BLUE,
  BRAND_GREEN,
  BRAND_GOLD,
  BRAND_DARK_BLUE,
  BRAND_DARK_GREEN,
  BRAND_ORANGE,
  BRAND_ROSE,
  BRAND_BROWN,
  BRAND_SAGE,
  BRAND_DARK_BROWN,
];

// For stacked aging ranges (ascending severity)
export const AGING_COLORS = [BRAND_GOLD, BRAND_ORANGE, CHART_CRITICAL];

// For "in term" vs "overdue" pattern
export const TERM_COLORS = { noPrazo: BRAND_BLUE, foraPrazo: CHART_CRITICAL };

// For paired bar charts (primary + secondary)
export const PAIRED_COLORS = [BRAND_BLUE, BRAND_DARK_BLUE];

// Tooltip style — consistent dark theme
export const TOOLTIP_STYLE = {
  background: "hsl(0, 0%, 10%)",
  border: "1px solid hsl(0, 0%, 16%)",
  borderRadius: 8,
  color: "hsl(0, 0%, 95%)",
  fontSize: 11,
};

// Axis tick style
export const AXIS_TICK = { fill: "#AEAB9E", fontSize: 11 };
export const GRID_STROKE = "hsl(0, 0%, 16%)";
