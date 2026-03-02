import { useState, useEffect } from "react";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const profitData = [
  { year: "2014", profit: 21492.95 },
  { year: "2015", profit: 28678.42 },
  { year: "2016", profit: 38291.18 },
  { year: "2017", profit: 50684.64 },
];

const salesData = [
  { category: "Phones", sales: 330007 },
  { category: "Chairs", sales: 281056 },
  { category: "Storage", sales: 219344 },
  { category: "Tables", sales: 206966 },
  { category: "Binders", sales: 200029 },
  { category: "Machines", sales: 189238 },
  { category: "Accessories", sales: 161785 },
];

const monthlyData = [
  { month: "Jan", sales: 94672 },
  { month: "Feb", sales: 59740 },
  { month: "Mar", sales: 112043 },
  { month: "Apr", sales: 88921 },
  { month: "May", sales: 103456 },
  { month: "Jun", sales: 95234 },
  { month: "Jul", sales: 108765 },
  { month: "Aug", sales: 121432 },
  { month: "Sep", sales: 139876 },
  { month: "Oct", sales: 156234 },
  { month: "Nov", sales: 187654 },
  { month: "Dec", sales: 201543 },
];

const customerData = [
  { name: "Tamara Chand", value: 8981 },
  { name: "Raymond Buch", value: 6976 },
  { name: "Sanjit Chand", value: 5757 },
  { name: "Hunter Lopez", value: 5622 },
  { name: "Bill Eplett", value: 3765 },
];

const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5"];

const regionalData = [
  { state: "California", sales: 446306 },
  { state: "New York", sales: 310876 },
  { state: "Texas", sales: 170188 },
  { state: "Washington", sales: 138641 },
  { state: "Pennsylvania", sales: 116512 },
];

const AnimatedNumber = ({ value, prefix = "", suffix = "" }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(15,15,20,0.95)", border: "1px solid rgba(249,115,22,0.4)", borderRadius: 8, padding: "10px 14px" }}>
        <p style={{ color: "#f97316", fontFamily: "monospace", fontSize: 12, margin: 0 }}>{label}</p>
        <p style={{ color: "#fff", fontFamily: "monospace", fontSize: 14, margin: "4px 0 0" }}>
          {payload[0].name}: <strong style={{ color: "#f97316" }}>{typeof payload[0].value === "number" ? payload[0].value.toLocaleString() : payload[0].value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080a0f",
      fontFamily: "'Courier New', monospace",
      color: "#e5e7eb",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: -200, right: -200, width: 600, height: 600,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "24px 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, borderBottom: "1px solid rgba(249,115,22,0.2)", paddingBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 6, color: "#f97316", marginBottom: 6, textTransform: "uppercase" }}>
              ▸ SYSTEM ONLINE · LIVE FEED
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: -1, color: "#fff" }}>
              FACTORY SALES <span style={{ color: "#f97316" }}>INTELLIGENCE</span>
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: 2 }}>FISCAL PERIOD</div>
            <div style={{ fontSize: 16, color: "#f97316", fontWeight: 700 }}>2014 – 2017</div>
          </div>
        </div>

        {/* KPI Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "TOTAL REVENUE", value: 2297200, prefix: "$", suffix: "" },
            { label: "NET PROFIT", value: 286397, prefix: "$", suffix: "" },
            { label: "TOP PRODUCT SALES", value: 330007, prefix: "$", suffix: "" },
            { label: "PROFIT GROWTH", value: 136, suffix: "%" },
          ].map((kpi, i) => (
            <div key={i} style={{
              background: "rgba(249,115,22,0.05)",
              border: "1px solid rgba(249,115,22,0.2)",
              borderRadius: 10,
              padding: "16px 20px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "#f97316", borderRadius: "3px 0 0 3px" }} />
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#9ca3af", marginBottom: 8 }}>{kpi.label}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#f97316" }}>
                <AnimatedNumber value={kpi.value} prefix={kpi.prefix || ""} suffix={kpi.suffix || ""} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 16, marginBottom: 16 }}>
          {/* Sales by Category */}
          <div style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#f97316", marginBottom: 16 }}>▸ SALES BY CATEGORY</div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={salesData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="category" tick={{ fill: "#d1d5db", fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
                  {salesData.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "#f97316" : `rgba(249,115,22,${0.7 - i * 0.08})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Profit Over Time */}
          <div style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#f97316", marginBottom: 4 }}>▸ PROFIT GROWTH INTELLIGENCE</div>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 16 }}>$21,493 → $50,685 · 4-year trajectory</div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={profitData}>
                <CartesianGrid stroke="rgba(249,115,22,0.08)" strokeDasharray="4 4" />
                <XAxis dataKey="year" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="profit" stroke="#f97316" strokeWidth={3} dot={{ fill: "#f97316", r: 6, strokeWidth: 2, stroke: "#080a0f" }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
          {/* Monthly Seasonality */}
          <div style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#f97316", marginBottom: 4 }}>▸ MONTHLY SEASONALITY</div>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 16 }}>Peak demand: Nov – Dec</div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(249,115,22,0.07)" strokeDasharray="4 4" />
                <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top Customers Pie */}
          <div style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#f97316", marginBottom: 16 }}>▸ TOP CUSTOMERS</div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={customerData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {customerData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 8 }}>
              {customerData.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i], flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: "#9ca3af", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
                  <span style={{ fontSize: 10, color: "#f97316" }}>${c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Sales */}
          <div style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#f97316", marginBottom: 16 }}>▸ REGIONAL LEADERS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {regionalData.map((r, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#d1d5db" }}>{r.state}</span>
                    <span style={{ fontSize: 11, color: "#f97316" }}>${(r.sales / 1000).toFixed(0)}k</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(249,115,22,0.12)", borderRadius: 2 }}>
                    <div style={{
                      height: "100%",
                      width: `${(r.sales / regionalData[0].sales) * 100}%`,
                      background: `rgba(249,115,22,${1 - i * 0.15})`,
                      borderRadius: 2,
                      transition: "width 1s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(249,115,22,0.15)" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#6b7280", marginBottom: 8 }}>EFFICIENCY GAINS</div>
              <div style={{ fontSize: 13, color: "#10b981", fontWeight: 700 }}>↓ 80% reporting time</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>via automated pipeline</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 20, textAlign: "center", fontSize: 10, color: "#374151", letterSpacing: 3 }}>
          FACTORY OPERATIONS & SALES ANALYTICS · AUTOMATED INTELLIGENCE SYSTEM · ALL DATA LIVE
        </div>
      </div>
    </div>
  );
}
