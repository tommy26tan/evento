import React from "react";
import EventCard from "./event-card";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import PaginationControl from "./pagination-control";
import { unstable_cache } from "next/cache";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default async function EventsList({
  city,
  page = 1,
}: {
  city: string;
  page?: number;
}) {
  const events = await unstable_cache(
    async () =>
      await prisma.eventoEvent.findMany({
        where: {
          city: city === "all" ? undefined : capitalize(city),
        },
        orderBy: {
          date: "asc",
        },
        take: 6,
        skip: (page - 1) * 6,
      }),
    [`events-list-${city}-${page}`],
    { revalidate: 60 }
  )();
  if (!events) {
    return notFound();
  }

  const totalCount = await prisma.eventoEvent.count({
    where: {
      city: city === "all" ? undefined : capitalize(city),
    },
  });

  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath =
    totalCount > page * 6 ? `/events/${city}?page=${page + 1}` : "";

  return (
    <section className="max-w-[1100px] flex flex-wrap justify-center gap-10 px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControl previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
