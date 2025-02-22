"use client";

import { useState } from "react";
import LampCard from "~/components/lamps/card";
import LampCreateDialog from "~/components/lamps/dialog";
import StatisticsPanel from "~/components/lamps/statisctics";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "~/components/ui/sidebar";
import { useGetAllLampsQuery } from "~/hooks/api/lamps/use-get-all-lamps-query";
import { LampsResponse } from "~/lib/validations/lamps";

export default function LampsPage() {
  const { data: lamps, isLoading } = useGetAllLampsQuery({});
  const [selectedLamp, setSelectedLamp] = useState<LampsResponse | null>(null);

  if (isLoading || !lamps) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  }
  return (
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Lamps Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {selectedLamp ? selectedLamp.groupName : "Overview"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-col lg:flex-row flex-1 gap-4 p-4">
          <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-1">
            <LampCreateDialog />
            {lamps.map((lamp) => (
                <LampCard
                    key={lamp.id}
                    lamp={lamp}
                    onClick={() => setSelectedLamp(lamp)}
                />
            ))}
          </div>
          <div className="w-full md:w-[350px] lg:w-[400px]">
            <div className="sticky top-20">
              <StatisticsPanel lamps={lamps} selectedLamp={selectedLamp} />
            </div>
          </div>
        </div>
      </SidebarInset>
  );
}
