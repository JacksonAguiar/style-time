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
import { useDisclosure } from "@nextui-org/react";
import ReportModal from "@/app/dashboard/components/ReportModal";
import { useSession } from "next-auth/react";

export interface CustomComponentProps {
  nextFunction: (data?: any) => void;
  previousFunction: VoidFunction;
  value?: any;
  step?: number;
  data?: any;
  edit?: boolean;
  onSendReport?: any;
}

export default function Register() {
  const params = useSearchParams();
  const router = useRouter();
  const { data } = useSession();

  const modalReport = useDisclosure();
  const edit = Boolean(params.get("upd")) ?? false;

  const getStartIndex = () => {
    const step = params.get("s");
    console.log(step);
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
  const onReport = () => modalReport.onOpen;
  const pages = [
    welcomeStep({ previousFunction, nextFunction, onSendReport: onReport }),
    useStepName({
      previousFunction,
      nextFunction,
      step: 2,
      onSendReport: onReport,
    }),
    useWhatsappNumber({
      previousFunction,
      nextFunction,
      step: 3,
      onSendReport: onReport,
    }),
    useStepPlans({
      previousFunction,
      nextFunction,
      step: 4,
      onSendReport: onReport,
    }),
    useStepPaymentMethod({
      previousFunction,
      nextFunction,
      step: 5,
      onSendReport: onReport,
    }),
    useStepPlaceName({
      previousFunction,
      nextFunction,
      step: 6,
      onSendReport: onReport,
    }),
    // useStepAddressPlace({
    //   previousFunction,
    //   nextFunction,
    //   step: 7,
    // edit: edit && index == 7,
    // }),
    // useStepTargetPublic({ previousFunction, nextFunction }),
    // useStepOpenDays({ previousFunction, nextFunction, step: 7 }),
    // useStepSameTime({ previousFunction, nextFunction }),
    useStepServices({
      previousFunction,
      nextFunction,
      step: 7,
      onSendReport: onReport,
    }),
    // useStepSchedule({ previousFunction, nextFunction, step: 8 }),
    useStepSimpleSchedule({
      previousFunction,
      nextFunction,
      step: 0,
      onSendReport: onReport,
    }),
  ];
  return (
    <div className="p-8 w-full h-screen flex justify-between flex-col">
      {pages[index]}
      <ReportModal
        isOpen={modalReport.isOpen}
        userId={data?.user?.id ?? ""}
        onOpenChange={modalReport.onOpenChange}
        onSubmit={(close) => close()}
      />
    </div>
  );
}
