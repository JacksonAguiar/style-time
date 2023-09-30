"use client";

import {
  Chip,
  ScrollShadow,
  Tabs,
  Tab,
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@nextui-org/react";
import { Key, useState } from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { FiInfo, FiX } from "react-icons/fi";
import { LiaDotCircleSolid } from "react-icons/lia";
import { getNextDays } from "@/utils/time";
import { AppointmentI } from "../interface.response";
import AppointmentsService from "@/app/api/services/AppointmentsService";

export default function AppointmentPage({
  appointments,
}: {
  appointments: any[];
}) {
  const days = getNextDays();

  const [data, setData] = useState<AppointmentI[]>(appointments);
  // const [ket, setKey] = useState<string>("");

  const onChangeStatus = async (
    id: string,
    status: "confirmed" | "declined"
  ) => {
    await AppointmentsService.updateStatus(id, status)
      .then((res) => {
        if (res.status == 200) {
          removeFromList(id);
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleDayChange = async (key: Key) => {
    var d = days[Number(key)];

    const year = d.getFullYear().toString();
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = d.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    await AppointmentsService.getByDateAndStatus(formattedDate)
      .then((updatedData) => {
        setData(updatedData.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const removeFromList = (id: string) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };

  return (
    <div className="h-full  flex flex-col overflow-hidden">
      <header className="p-5 flex-shrink-0">
        <div className="flex justify-between">
          <h1 className="font-bold text-4xl mb-2">Solicitações</h1>

          <Popover placement="bottom">
            <PopoverTrigger>
              <Button
                startContent={<FiInfo size={20} />}
                className="bg-transparent"
                isIconOnly
              />
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <div className="px-1 py-2 max-w-[230px]">
                <div className="text-small font-bold">Informações</div>
                <div className="flex items-center mt-2">
                  <div className="w-4 mr-1">
                    <FiX color="red" size={15} />
                  </div>
                  <p className="text-foreground-500">Cancelar agendamento</p>
                </div>
                <div className="flex items-center mt-2">
                  <div className="w-4  mr-1">
                    <LiaDotCircleSolid size={15} color="black" />
                  </div>
                  <p className="text-foreground-500">
                    Indica se há outro agendamento no mesmo horário
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <span className="text-foreground-400 text-base">
          {data.length} agendamentos a serem confirmados
        </span>
      </header>
      <SideTabBar
        days={days}
        appointments={data}
        onChangeStatus={onChangeStatus}
        onChangeSelection={handleDayChange}
      />
    </div>
  );
}

const SideTabBar = ({
  days,
  appointments,
  onChangeStatus,
  onChangeSelection,
}: {
  days: Date[];
  appointments: any[];
  onChangeStatus: (id: string, status: "confirmed" | "declined") => void;
  onChangeSelection: (key: Key) => void;
}) => {
  return (
    <div className="flex h-full">
      <Tabs
        color="primary"
        aria-label="Options"
        className="bg-transparent focus:outline-none"
        classNames={{
          base: "w-fit items-baseline mt-16",
          tabList: "bg-transparent flex flex-col p-0",
          tab: "h-[65px]",
          panel: "w-full p-4 overflow-y-auto mb-20",
          cursor: "rounded-e-2xl ",
        }}
        onSelectionChange={onChangeSelection}
        radius="none"
      >
        {days.map((date, i) => {
          var month = Intl.DateTimeFormat("en-US", {
            month: "short",
          }).format(date);
          var day = Intl.DateTimeFormat("en-US", {
            day: "numeric",
          }).format(date);

          return (
            <Tab
              className="w-full"
              key={i}
              title={
                <div className="flex flex-col mb justify-center items-center h-8 leading-none">
                  <span>{month}</span>
                  <h2 className="text-3xl font-bold h-min leading-tight">
                    {day}
                  </h2>
                </div>
              }
            >
              <ScrollShadow hideScrollBar size={10}>
                <div className="pl-6 overflow-y-auto">
                  {appointments.length == 0 ? (
                    <div>
                      {/* <PiCalendarX className="text-foreground-300" /> */}
                      <h2 className="text-xl font-medium text-foreground-300">
                        Sem solicitações para o dia {day}
                      </h2>
                    </div>
                  ) : (
                    appointments.map((e, i) => {
                      const hour1Date = new Date(e.hours[0]);
                      let compare = Intl.DateTimeFormat("en-US", {
                        day: "numeric",
                      }).format(hour1Date);

                      // if (day == compare)
                      return (
                        <CustomCard
                          key={i}
                          hour={hour1Date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          hour2={
                            e.hours[1]
                              ? new Date(e.hours[1]).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : null
                          }
                          name={e.name}
                          onCancel={() => onChangeStatus(e.id, "declined")}
                          onConfirm={() => onChangeStatus(e.id, "confirmed")}
                          services={e.services}
                        />
                      );
                    })
                  )}
                </div>
              </ScrollShadow>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

const CustomCard = ({
  hour,
  hour2,
  name,
  services,
  onConfirm,
  onCancel,
}: {
  hour: string;
  hour2: string | null;
  name: string;
  services: any[];
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Card className="bg-black border-none p-5 rounded-3xl min-w-[260px] mb-4">
      <CardHeader className="flex justify-between p-0">
        <span className="text-sm font-medium text-white">
          {hour} {hour2 ? "ou " + hour2 : ""}
        </span>
        <Button
          startContent={<FiX color="#E20815" size={20} />}
          isIconOnly
          size="sm"
          className="bg-transparent"
          onClick={onCancel}
        />
      </CardHeader>
      <CardBody className="p-0 mt-5">
        <h2 className="font-bold text-3xl text-white">{name}</h2>
        <div className="flex gap-2 mt-2">
          {services.map((s, i) => {
            return (
              <Chip
                key={i}
                size="sm"
                radius="sm"
                className="bg-default-700 text-white"
              >
                {s}
              </Chip>
            );
          })}
        </div>
      </CardBody>

      <CardFooter className="p-0 mt-6">
        <Button
          onClick={onConfirm}
          className="w-full font-medium text-sm bg-white"
        >
          Confirmar agendamento
        </Button>
      </CardFooter>
    </Card>
  );
};
{
  /* <div className="h-full flex overflow-y-hidden">
        <div className="flex-shrink-0 self-center">
          {days.map((e, i) => {
            let isSelected = day.day == e.day;
            return (
              <div
                key={i}
                className={`flex flex-col items-center px-4 py-1 ${
                  isSelected ? "bg-black rounded-e-2xl [&>*]:text-white" : ""
                }`}
                onClick={() => setDaySelected(e)}
              >
                <h3 className="text-4xl font-bold">{e.day}</h3>
                <span className="font-medium text-[11px]">{e.month}</span>
              </div>
            );
          })}
        </div>
        <ScrollShadow hideScrollBar size={10}>
          <div className="pl-6 overflow-y-auto">
            {appointments.map((e, i) => {
              return (
                <CustomCard
                  key={i}
                  hour="12:00"
                  hour2="14:00"
                  name={e.name}
                  onCancel={() => onChangeStatus(e.id, "cancel")}
                  onConfirm={() => onChangeStatus(e.id, "confirmed")}
                  services={e.services}
                />
              );
            })}
          </div>
        </ScrollShadow>
      </div> */
}
