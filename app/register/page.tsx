"use client";
import { useState } from "react";

import {
  useStepPlans,
  useStepName,
  useStepPaymentMethod,
  useStepPlaceName,
  useStepServices,
  welcomeStep,
  useWhatsappNumber,
  useStepSimpleSchedule,
  useStepAddressPlace,
} from "./pages";

import { useRouter, useSearchParams } from "next/navigation";

export interface CustomComponentProps {
  nextFunction: VoidFunction;
  previousFunction: VoidFunction;
  value?: any;
  step?: number;
  data?: any;
}

export default function Register() {
  const params = useSearchParams();
  const router = useRouter();

  const getStartIndex = () => {
    const step = params.get("s");
    console.log(step)
    return step ? Number(step) : 0;
  };
  
  const [index, setIndex] = useState<number>(getStartIndex);

  const nextFunction = () => {
    if (index == pages.length - 1) router.push("/dashboard");
    if (index < pages.length - 1) setIndex((prev) => prev + 1);
  };
  const previousFunction = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };

  const pages = [
    welcomeStep({ previousFunction, nextFunction }),
    useStepName({ previousFunction, nextFunction, step: 2 }),
    useWhatsappNumber({ previousFunction, nextFunction, step: 3 }),
    useStepPlans({ previousFunction, nextFunction, step: 4 }),
    useStepPaymentMethod({ previousFunction, nextFunction, step: 5 }),
    useStepPlaceName({ previousFunction, nextFunction, step: 6 }),
    // useStepAddressPlace({ previousFunction, nextFunction, step: 7 }),
    // useStepTargetPublic({ previousFunction, nextFunction }),
    // useStepOpenDays({ previousFunction, nextFunction, step: 7 }),
    // useStepSameTime({ previousFunction, nextFunction }),
    useStepServices({ previousFunction, nextFunction, step: 7 }),
    // useStepSchedule({ previousFunction, nextFunction, step: 8 }),
    useStepSimpleSchedule({ previousFunction, nextFunction, step: 0 }),
  ];
  return (
    <div className="p-8 w-full h-screen flex justify-between flex-col">
      {pages[index]}
    </div>
  );
}
