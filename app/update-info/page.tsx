"use client";

import UseStepSimpleSchedule from "../(auth)/register/pages/useStepSimpleSchedule";
import UseServicesStep from "../(auth)/register/pages/useServicesStep";
import { useSession } from "next-auth/react";
import ScheduleService from "../api/services/ScheduleService";
import { useEffect, useState } from "react";
import CompanieService from "../api/services/CompanyService";

export default function UpdateInfo(req: any) {
  const screen = req.searchParams.screen;

  const nextFunc = () => location.replace("/dashboard");

  // const servicesS = useServicesStep({
  //   nextFunction: nextFunc,
  //   previousFunction: nextFunc,
  //   edit: true,
  // });

  // const scheduleS = useStepSimpleSchedule({
  //   nextFunction: nextFunc,
  //   previousFunction: nextFunc,
  //   edit: true,
  // });

  return (
    <div className="p-8 w-full h-screen flex justify-between flex-col">
      {/* {screen == "services" ? servicesS : scheduleS} */}
      {screen == "services" ? (
      <UseServicesStep
        nextFunction={nextFunc}
        previousFunction={nextFunc}
        edit={true}
      />
      ) : (
        <UseStepSimpleSchedule
          nextFunction={nextFunc}
          previousFunction={nextFunc}
          edit={true}
        />
      )}
    </div>
  );
}
