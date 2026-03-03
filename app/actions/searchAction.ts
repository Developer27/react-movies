"use server";

import { redirect } from "next/navigation";

export async function searchItem(formData: FormData) {
  const q = formData.get('q');

  if (!q || typeof q !== "string") {
    throw new Error("Search query is empty");
  }

  redirect(`/animes?q=${encodeURIComponent(q)}`);
}