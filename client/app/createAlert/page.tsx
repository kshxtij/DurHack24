'use client'
import { useState } from "react";
import { ServiceCombobox } from "./combo-box";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { createAlert } from "@/actions";

export default function Page() {
    const [service, setService] = useState<string | null>(null);

    const mut = useMutation({
        mutationFn: async () => {
            createAlert({
                service: "DUPA"
            })
            console.log('mutationFn');
        }
    })


    return (
        <div className="flex flex-col">
            <ServiceCombobox value={service} onChange={setService} />
        <Button onClick={() => mut.mutate()}>Create</Button>
        </div>
    )
};
