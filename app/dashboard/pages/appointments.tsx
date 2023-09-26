"use client";

import { Chip, ScrollShadow } from "@nextui-org/react";
import { useState } from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { FiX } from "react-icons/fi";

export default function AppointmentPage() {
  const schedules = [
    {
      time: "12:00",
      appointments: [
        {
          services: [
            {
              name: "Corte Social",
              time: "60",
            },
            {
              name: "Corte Social",
              time: "60",
            },
          ],
          customer_name: "Jackson Aguiar",
        },
        {
          services: [
            {
              name: "Barboterapia",
              time: "55",
            },
          ],
          customer_name: "Fulano teste 2",
        },
        {
          services: [
            {
              name: "Barboterapia",
              time: "55",
            },
          ],
          customer_name: "Fulano teste 2",
        },
        {
          services: [
            {
              name: "Barboterapia",
              time: "55",
            },
          ],
          customer_name: "Fulano teste 2",
        },
        {
          services: [
            {
              name: "Barboterapia",
              time: "55",
            },
          ],
          customer_name: "Fulano teste 2",
        },
      ],
    },
  ];
  const days = [
    {
      day: "5",
      month: "Oct",
    },
    {
      day: "6",
      month: "Oct",
    },
    {
      day: "7",
      month: "Oct",
    },
    {
      day: "8",
      month: "Oct",
    },
    {
      day: "9",
      month: "Oct",
    },
    {
      day: "10",
      month: "Oct",
    },
  ];

  const [day, setDaySelected] = useState(days[0]);

  return (
    <div className="h-full  flex flex-col overflow-hidden">
      <header className="p-5  flex-shrink-0">
        <h1 className="font-bold text-4xl mb-2">Solicitações</h1>
        <span className="text-foreground-400">
          Confirme os agendamentos, ou pressione o “X” para cancelar
        </span>
      </header>

      <div className="h-full flex overflow-y-hidden">
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
            {schedules[0].appointments.map((e, i) => {
              return (
                <CustomCard
                  key={i}
                  hour="12:00"
                  hour2="14:00"
                  name={e.customer_name}
                  onCancel={() => {
                    console.log("cancel");
                  }}
                  onConfirm={() => {
                    console.log("confirm");
                  }}
                  services={e.services}
                />
              );
            })}
          </div>
        </ScrollShadow>
      </div>
    </div>
  );
}

const CustomCard = ({
  hour,
  hour2,
  name,
  services,
  onConfirm,
  onCancel,
}: {
  hour: string;
  hour2: string;
  name: string;
  services: any[];
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Card className="bg-black border-none p-5 rounded-3xl min-w-[260px] mb-4">
      <CardHeader className="flex justify-between p-0">
        <span className="text-sm font-medium text-white">
          {hour} ou {hour2}
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
                {s.name}
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
