export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ReferidosClient } from "@/components/dashboard/referidos-client";

export default async function ReferidosPage() {
  const session = await auth();
  if (!session) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin");

  const userId = session.user.id;
  // Use the short user id slice as the referral code (no new DB model needed)
  const referralCode = userId.slice(0, 8).toUpperCase();

  // Count completed appointments by users whose referralCode field matches
  // (graceful: if the column doesn't exist yet, return 0)
  let referralCount = 0;
  let totalReward = 0;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const referred = await (prisma.user as any).count({
      where: { referredBy: referralCode },
    });
    referralCount = typeof referred === "number" ? referred : 0;
    totalReward = referralCount * 150;
  } catch {
    // referredBy column not yet in schema — shows zeros until migration runs
  }

  const WA_NUMBER = "522299330014";
  const referralLink = `https://mipielveracruz.com?ref=${referralCode}`;
  const waMessage = encodeURIComponent(
    `Hola, quiero agendar con el código de referido: ${referralCode} 😊`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <ReferidosClient
      userName={session.user.name ?? "Paciente"}
      referralCode={referralCode}
      referralLink={referralLink}
      waLink={waLink}
      referralCount={referralCount}
      totalReward={totalReward}
    />
  );
}
