import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import React, { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { z } from "zod";

type EventsPageProps = {
  params: {
    city: string;
  };
};

type EventsPageWithSearchProps = EventsPageProps & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({
  params,
}: {
  params: { city: string };
}): Metadata {
  const city = params.city;
  return {
    title: `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageWithSearchProps) {
  const city = params.city;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1
        title={`Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`}
        className="mb-28"
      />
      <Suspense key={city + parsedPage.data} fallback={<Loading />}>
        <EventsList city={city} page={+(parsedPage.data ?? 1)} />
      </Suspense>
    </main>
  );
}
