import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

const ALLOWED_SIGNATURES: [number, number[]][] = [
  [3, [0xff, 0xd8, 0xff]],                                         // JPEG
  [4, [0x89, 0x50, 0x4e, 0x47]],                                   // PNG
  [4, [0x47, 0x49, 0x46, 0x38]],                                   // GIF
  [4, [0x52, 0x49, 0x46, 0x46]],                                   // WebP (RIFF header — checked further below)
];

function isValidImage(buf: Buffer): boolean {
  for (const [len, sig] of ALLOWED_SIGNATURES) {
    if (buf.length >= len && sig.every((b, i) => buf[i] === b)) {
      // WebP also requires bytes 8-11 to be "WEBP"
      if (sig[0] === 0x52 && buf.length >= 12) {
        return buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50;
      }
      return true;
    }
  }
  return false;
}

const ALLOWED_CATEGORIES = ["BEFORE", "AFTER", "PROGRESS", "SKIN_CONCERN", "GENERAL"] as const;
type PhotoCategory = (typeof ALLOWED_CATEGORIES)[number];

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const rawCategory = (formData.get("category") as string) || "GENERAL";
  const zone = formData.get("zone") as string | null;
  const notes = formData.get("notes") as string | null;

  if (!file) return NextResponse.json({ message: "No file provided" }, { status: 400 });

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ message: "El archivo no puede superar 10 MB" }, { status: 413 });
  }

  const category: PhotoCategory = ALLOWED_CATEGORIES.includes(rawCategory as PhotoCategory)
    ? (rawCategory as PhotoCategory)
    : "GENERAL";

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (!isValidImage(buffer)) {
    return NextResponse.json({ message: "Tipo de archivo no permitido. Solo imágenes (JPEG, PNG, GIF, WebP)." }, { status: 415 });
  }

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
      category,
      zone: zone || null,
      notes: notes ? notes.slice(0, 500) : null,
    },
  });

  return NextResponse.json(photo, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const photos = await prisma.skinPhoto.findMany({
    where: { userId: session.user.id! },
    orderBy: { takenAt: "desc" },
  });

  return NextResponse.json(photos);
}
