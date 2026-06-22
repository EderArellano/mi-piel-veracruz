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
  revenueByMonth: { month: string; revenue: number }[];
  topServices: { name: string; count: number }[];
}

export function AdminDashboard({ stats, revenueByMonth, topServices }: AdminDashboardProps) {
  const statCards = [
    {
      title: "Clientes totales",
      value: stats.totalClients.toLocaleString("es-MX"),
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Citas hoy",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "text-primary",
      bg: "bg-primary/8",
    },
    {
      title: "Ingresos del mes",
      value: formatCurrency(stats.monthlyRevenue),
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Citas pendientes",
      value: stats.pendingAppointments,
      icon: Clock,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
        <p className="text-muted-foreground mt-1">Resumen de Mi Piel Veracruz</p>
      </motion.div>

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
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.title}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          {revenueByMonth.length === 0 || revenueByMonth.every((m) => m.revenue === 0) ? (
            <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">
              Sin pagos registrados aún
            </div>
          ) : (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueByMonth}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v >= 1000 ? `${v / 1000}k` : v}`}
                  />
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
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-6"
        >
          <h2 className="font-bold text-foreground mb-6">Servicios más solicitados</h2>
          {topServices.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">
              Sin citas completadas aún
            </div>
          ) : (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topServices} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={60}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
