"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createAlert, getAlerts, getServices } from "@/actions";

export default function AlertsPage() {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceValue, setServiceValue] = useState("");

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return getServices();
    },
    refetchInterval: 5000,
  });

  const { data: alerts } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      await createAlert();
      return await getAlerts();
    },
    refetchInterval: 1000,
  });

  if (!services) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Alerts</h1>
      <form className="w-52">
        <h2>Create an Alert</h2>
        <Label htmlFor="title">Title</Label>
        <Input name="title" type="text" />

        <Label htmlFor="service">Service</Label>

        <Popover open={serviceOpen} onOpenChange={setServiceOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[200px] justify-between"
            >
              {serviceValue
                ? services.find((s) => s.key.id === serviceValue).key.service
                : "Select a service..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {services.map((s, i) => (
                    <CommandItem
                      key={i}
                      value={s.key.id}
                      onSelect={(val) => {
                        setServiceValue(val === serviceValue ? "" : val);
                        setServiceOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          serviceValue === s.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {s.key.service}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Label htmlFor="cron">CRON</Label>
        <Input name="cron" type="number" />

        <Button>Create</Button>

        <div>
          {alerts?.map((a) => (
            <div>{a.title}</div>
          ))}
        </div>
      </form>
    </div>
  );
}
