import { prisma } from "./supabase.server";
export async function addUrl(urlData) {
  try {
    return await prisma.url.create({
      data: {
        short: urlData.short,
        long: urlData.long,
        created_at: new Date(urlData.created_at),
        expires_at: new Date(urlData.expires_at),
        userId: urlData.userId,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function readUrl(userId) {
  try {
    return await prisma.url.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteUrl(urlId) {
  try {
    return await prisma.url.delete({
      where: {
        id: urlId,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function findUrl(urlShort) {
  const url = process.env.DOMAIN_NAME + urlShort;
  try {
    return await prisma.url.findFirst({
      where: {
        short: url,
      },
    });
  } catch (error) {
    throw error;
  }
}
