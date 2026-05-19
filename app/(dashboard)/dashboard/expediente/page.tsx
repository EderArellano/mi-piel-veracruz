import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MedicalRecordView } from "@/components/dashboard/medical-record";

export const metadata = { title: "Mi Expediente" };

export default async function ExpedientePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const [record, photos] = await Promise.all([
    prisma.medicalRecord.findUnique({
      where: { userId: session.user.id },
      include: { treatments: { orderBy: { performedAt: "desc" } } },
    }),
    prisma.skinPhoto.findMany({
      where: { userId: session.user.id },
      orderBy: { takenAt: "desc" },
    }),
  ]);

  return <MedicalRecordView record={record} photos={photos} userId={session.user.id!} />;
}
