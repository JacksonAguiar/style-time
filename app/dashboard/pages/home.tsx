"use client";

import { generateTimeSlots } from "@/utils/time";
import { Button } from "@nextui-org/button";
import {
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  ScrollShadow,
} from "@nextui-org/react";
import { FiInfo } from "react-icons/fi";
import { AppointmentI } from "../interface.response";

export default function HomePage({
  placeName,
  appointments,
  schedule,
}: {
  placeName: string;
  appointments: AppointmentI[];
  schedule: any;
}) {
  const formattedHour = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    hour12: false
  });

  const getCurrentTimeInterval = () => {
    var index: number | null = null;
    return generateTimeSlots(schedule.start, schedule.end).filter((time, i) => {
      let isCurrent = formattedHour.split(" ")[0] == time.split(":")[0];

      if (isCurrent || index != null) {
        index = i;
        return time;
      }
    });
  };

  const interval: string[] = schedule ? getCurrentTimeInterval() : [];

  const confirmedHour = (datetime: string): string =>
    new Date(datetime).toLocaleTimeString([], {
      hour: "2-digit",
      hour12: false,
    });
  function convertTo24HourClock(time: string) {
    // Create a Date object to parse the input time
    const date = new Date(`2023-09-29T${time}`);

    // Extract hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours and minutes with leading zeros
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    // Combine hours and minutes in the "HH:mm" format
    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    return formattedTime;
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="p-5 flex-shrink-0">
        <h1 className="text-6xl w-min">{placeName}</h1>
        <div className="flex flex-col items-center bg-black w-min text-white py-2 px-3 rounded-b-2xl absolute top-0 right-3 drop-shadow-md">
          <span className="text-6xl font-extrabold">{appointments.length}</span>
          <span className="text-[9px]">Agendamentos</span>
        </div>
      </header>
      <div className="flex justify-between px-5 mt-1 flex-shrink-0">
        <h3 className="font-bold text-2xl">Hoje</h3>

        <Popover placement="top" color={"primary"}>
          <PopoverTrigger>
            <Button
              startContent={<FiInfo className="text-xl" />}
              isIconOnly
              className="bg-transparent"
            />
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">Popover Content</div>
              <div className="text-tiny">This is the popover content</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {interval.length == 0 ? (
        <h1 className="p-5 text-foreground-300">Sem agendamentos</h1>
      ) : (
        <ScrollShadow hideScrollBar>
          <div className="pl-12 pr-6 py-4 overflow-y-auto">
            <ol className="relative border-l-2 border-gray-200 border-dashed">
              {interval.map((time, i) => {
                let isCurrent =
                  formattedHour.split(" ")[0] == time.split(":")[0];
                console.log(formattedHour.split(" ")[0]);
                console.log(time.split(":")[0]);
                return (
                  <li key={i} className="mb-10 ml-14 min-h-unit-3 ">
                    <span className="absolute flex items-center justify-center h-6 bg-white  rounded-full -left-8 ring-8 ring-white">
                      <h1
                        className={`font-bold text-2xl capitalize ${
                          isCurrent ? "text-black" : "text-foreground-300"
                        }`}
                      >
                        {time.split(" ")[0]}
                        <b className="font-semibold text-sm ">
                          {" "}
                          {time.split(" ")[1]}
                        </b>
                      </h1>
                    </span>
                    {appointments.map((aptms, i) => {
                      const hour = confirmedHour(aptms.confirmedHour!);

                      if (hour.split(" ")[0] == time.split(":")[0])
                        return (
                          <CardComponent
                            key={i}
                            code={""}
                            customer_name={aptms.name}
                            hour={hour}
                            services={aptms.services}
                          />
                        );
                    })}
                  </li>
                );
              })}
            </ol>
          </div>
        </ScrollShadow>
      )}
    </div>
  );
}

const CardComponent = ({
  hour,
  services,
  code,
  customer_name,
}: {
  hour: string;
  services: any[];
  code: string;
  customer_name: string;
}) => {
  return (
    <div className="mb-2 items-center justify-between p-3 bg-white border border-gray-200 rounded-[15px] shadow-sm sm:flex">
      <header className="flex justify-between">
        <span className="font-normal text-[11px] text-foreground-400">
          {hour}
        </span>
        <h4 className="font-semibold text-[11px]">#{code}</h4>
      </header>
      <h3 className="font-bold text-base mt-1">{customer_name}</h3>
      <div className="flex gap-2 mt-2">
        {services.map((s, i) => {
          return (
            <Chip key={i} size="sm">
              {s}
            </Chip>
          );
        })}
        {/* {services} */}
      </div>
    </div>
  );
};
