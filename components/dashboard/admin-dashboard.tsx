"use client";

import { motion } from "framer-motion";
import { Users, Calendar, DollarSign, Clock, TrendingUp, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

interface AdminDashboardProps {
  stats: {
    totalClients: number;
    todayAppointments: number;
    monthlyRevenue: number;
    pendingAppointments: number;
  };
}

const mockRevenueData = [
  { month: "Ene", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Abr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
];

const mockServiceData = [
  { name: "Axilas", count: 142 },
  { name: "Piernas", count: 98 },
  { name: "Bikini", count: 87 },
  { name: "Facial", count: 76 },
  { name: "Cuerpo", count: 54 },
];

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const statCards = [
    {
      title: "Clientes totales",
      value: stats.totalClients.toLocaleString(),
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
      change: "+12% vs. mes anterior",
      up: true,
    },
    {
      title: "Citas hoy",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "text-primary",
      bg: "bg-rose-50",
      change: "3 confirmadas, 2 pendientes",
      up: true,
    },
    {
      title: "Ingresos del mes",
      value: formatCurrency(stats.monthlyRevenue),
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      change: "+8.5% vs. mes anterior",
      up: true,
    },
    {
      title: "Citas pendientes",
      value: stats.pendingAppointments,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
      change: "Requieren confirmación",
      up: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
        <p className="text-muted-foreground mt-1">Resumen de Mi Piel Veracruz</p>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
      >
        {statCards.map((s, i) => (
          <div key={i} className="card-premium p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-2xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <ArrowUpRight className={`w-4 h-4 ${s.up ? "text-emerald-500" : "text-amber-500"}`} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{s.value}</div>
            <div className="text-sm text-muted-foreground mb-2">{s.title}</div>
            <div className={`text-xs font-medium ${s.up ? "text-emerald-600" : "text-amber-600"}`}>
              {s.change}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-premium p-6 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-foreground">Ingresos mensuales</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip formatter={(v) => [formatCurrency(Number(v)), "Ingresos"]} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Services chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-6"
        >
          <h2 className="font-bold text-foreground mb-6">Servicios más solicitados</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockServiceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={50} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
