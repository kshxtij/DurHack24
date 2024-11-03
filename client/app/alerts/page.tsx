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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAutomation, getAlerts, getAutomations, getServices } from "@/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const levelMap = {
    INFO: "info",
    ERROR: "error",
    DEBUG: "debug",
    WARNING: "warn",
    CRITICAL: "critical",
  };

export default function AlertsPage() {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceValue, setServiceValue] = useState("");

  const [title, setTitle] = useState("");
  const [cron, setCron] = useState("* * * * *");
  const [email, setEmail] = useState("");
  const [severity, setSeverity] = useState<keyof typeof levelMap>("INFO");


  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return getServices();
    },
    refetchInterval: 5000,
  });

  const { data: automations } = useQuery({
    queryKey: ["automations"],
    queryFn: async () => {
      return getAutomations()
    },
  staleTime: 1000,
  })

  const queryClient = useQueryClient()


  const mutate = useMutation({
    mutationFn: async () => {
      await createAutomation({
        cron: cron,
        email: email,
        severity: severity,
        service: serviceValue,
        trigger: severity,
        title: title,
      })

      queryClient.invalidateQueries({
        queryKey: ["automations"],
      })
    }
  })

  if (!services) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Automations</h1>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex justify-end">
            <Button>Create Automation</Button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create Automation</AlertDialogTitle>
            </AlertDialogHeader>
            <Label htmlFor="title">Title</Label>
            <Input name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

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
            <Input name="cron" type="text" value={cron} onChange={(e) => setCron(e.target.value)} />

            <Label htmlFor="email">Email</Label>
            <Input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Label htmlFor="severity">Trigger when Severity Level</Label>
            <select
              name="severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value as keyof typeof levelMap)}
            >
              {Object.keys(levelMap).map((key) => (
                <option key={key} value={key}>
                  {levelMap[key]}
                </option>
              ))}
            </select>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                mutate.mutate()
              }}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div>
        {automations?.map((a) => (
          <div>
            <p>test</p>
            {a.title}</div>
        ))}
      </div>
    </div>
  );
}
