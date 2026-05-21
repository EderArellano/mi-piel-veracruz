import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const category = (formData.get("category") as string) || "GENERAL";
  const zone = formData.get("zone") as string | null;
  const notes = formData.get("notes") as string | null;

  if (!file) return NextResponse.json({ message: "No file provided" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const { url, publicId } = await uploadImage(
    base64,
    `mipiel-veracruz/patients/${session.user.id}`,
    { tags: [category, zone || "general"] }
  );

  const medicalRecord = await prisma.medicalRecord.findUnique({
    where: { userId: session.user.id! },
  });

  const photo = await prisma.skinPhoto.create({
    data: {
      userId: session.user.id!,
      medicalRecordId: medicalRecord?.id,
      url,
      publicId,
      category: category as never,
      zone: zone || null,
      notes: notes || null,
    },
  });

  return NextResponse.json(photo, { status: 201 });
}

export async function GET(_req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const photos = await prisma.skinPhoto.findMany({
    where: { userId: session.user.id! },
    orderBy: { takenAt: "desc" },
  });

  return NextResponse.json(photos);
}
