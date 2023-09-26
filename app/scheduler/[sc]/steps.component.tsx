"use client";
import { useState } from "react";

import { step1, step2, step4, useStep3, step5 } from "../pages";
import finish from "../pages/finish";
import AppointmentsService from "@/app/services/AppointmentsService";

export interface ScheduleI {
  name?: string;
  phoneNumber?: string;
  hours?: string[];
  services?: string[];
}
const UseSteps = ({
  id,
  schedules,
  services,
  placeName,
}: {
  id: string;
  placeName: string;
  schedules: any[];
  services: any[];
}) => {
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<ScheduleI>({
  
  });

  const onSubmit = async () => {
    var res = await AppointmentsService.create(data, id);
    if (res) {
      nextFunction();
    }
  };
  const nextFunction = () => {
    if (index < pages.length - 1) setIndex((prev) => prev + 1);
    if (index == pages.length) console.log(id);
  };
  const previousFunction = () => {
    if (index > 0) setIndex((prev) => prev - 1);
  };
  const onChangeData = (key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(data);
  };
  const pages = [
    step1({
      previousFunction,
      nextFunction,
      onChange: onChangeData,
      values: data,
    }),
    step2({
      previousFunction,
      nextFunction,
      onChange: onChangeData,
      values: data,
      options: services,
    }),
    useStep3({
      previousFunction,
      nextFunction,
      onChange: onChangeData,
      values: data,
      options: schedules,
    }),
    step4({
      previousFunction,
      nextFunction,
      onChange: onChangeData,
      values: data,
    }),
    step5({
      previousFunction,
      nextFunction: onSubmit,
      onChange: onChangeData,
      values: data,
    }),
    finish(() => {}, placeName),
  ];

  return (
    <div className="p-8 w-full h-screen flex justify-between flex-col">
      {pages[index]}
    </div>
  );
};

export default UseSteps;
