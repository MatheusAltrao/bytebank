'use client'
import { Button } from "@/components/ui/button";
import { formatAmount } from "@/helpers/amount";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";


export default function AvaliableAmountCard() {

    const [isShowing, setIsShowing] = useState(false);

    const toggleAmountVisibility = () => {
        setIsShowing(!isShowing);
    }

    const amount = 2000
    const dynamicEyeIcon = isShowing ? <Eye /> : <EyeClosed />;

    return (
        <div className="flex flex-col gap-1" >
            <div className="flex items-center gap-1 " >
                <span className="text-xl font-bold" >{isShowing ? formatAmount(amount) : '******* '}</span>
                <Button variant={'outline'} className="h-8 w-8 rounded" onClick={toggleAmountVisibility} > {dynamicEyeIcon} </Button>
            </div>
            <span className="text-sm text-muted-foreground" >Saldo disponível</span>
        </div>
    )
}