"use client";
import { useState } from "react";

import { useStepAddressPlace } from "../pages";

import { useRouter, useSearchParams } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";
import ReportModal from "@/app/dashboard/components/ReportModal";
import { useSession } from "next-auth/react";
import UseStepAddressPlace from "../pages/useAddressPlace";

export interface CustomComponentProps {
  nextFunction: VoidFunction;
  previousFunction: VoidFunction;
  value?: any;
  step?: number;
  data?: any;
  edit?: boolean;
  onSendReport?: any;
}

export default function Register() {
  const router = useRouter();

  return (
    <div className="p-8 w-full h-screen flex justify-between flex-col">
      {/* useStepAddressPlace({
      previousFunction,
      nextFunction,
      step: 7,
      edit: edit && index == 7,
    }), */}

      <UseStepAddressPlace
        nextFunction={() => location.replace("/dashboard")}
        previousFunction={() => router.back()}
      />
    </div>
  );
}
