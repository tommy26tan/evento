import H1 from "@/components/h1";
import prisma from "@/lib/db";
import { EventoEvent, PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

type EventPageProps = {
  params: {
    slug: string;
  };
};
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const event = await prisma.eventoEvent.findUnique({
    where: { slug },
  });

  return {
    title: event?.name ?? "Event",
  };
}
export async function generateStaticParams() {
  return [
    {
      slug: "comeday-extravaganza",
    },
    {
      slug: "dj-practice-session",
    },
  ];
}
export default async function EventPage({ params }: EventPageProps) {
  const slug = params.slug;
  const event = await prisma.eventoEvent.findUnique({
    where: { slug },
  });
  if (!event) {
    return notFound();
  }
  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          src={event.imageUrl}
          alt={event.name}
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover blur-3xl z-0"
          quality={50}
          priority
        ></Image>
        <div className="z-1 flex relative gap-x-6 lg:gap-16 lg:flex-row">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {event.date &&
                new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
            </p>
            <H1
              className="mb-2 mt-1 whitespace-nowrap lg:text-5xl"
              title={event.name}
            ></H1>
            <p className="whitespace-nowrap text=xl text-white/75">
              Organized by {""}
              <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 text-lg capitalize bg-blur mt-5 lg:mt-auto w-[95vw] rounded-md border-white/10 border-2 sm:w-full py-2 state-effects">
              Get tickets
            </button>
          </div>
        </div>
      </section>
      <div className="text-center px-5 py-16 min-h-[75vh]">
        <section className="mb-12">
          <h2 className="text-2xl mb-8">About the Event</h2>
          <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
            {event.description}
          </p>
        </section>
        <section className="">
          <h2 className="text-2xl mb-8">Location</h2>
          <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
            {event.location}
          </p>
        </section>
      </div>
    </main>
  );
}
