import { Button } from "@nextui-org/button";
import {
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  ScrollShadow,
} from "@nextui-org/react";
import { FiInfo } from "react-icons/fi";

export default function HomePage() {
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
          code: "kdf344",
          customer_name: "Jackson Aguiar",
        },
        {
          services: [
            {
              name: "Barboterapia",
              time: "55",
            },
          ],
          code: "k1f144",
          customer_name: "Fulano teste 2",
        },
      ],
    },
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
          code: "kdf344",
          customer_name: "Jackson Aguiar",
        },
        {
          services: [
            {
              name: "Barboterapia",
              time: "55",
            },
          ],
          code: "k1f144",
          customer_name: "Fulano teste 2",
        },
      ],
    },
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
          code: "kdf344",
          customer_name: "Jackson Aguiar",
        },
        {
          services: [
            {
              name: "Barboterapia",
              time: "55",
            },
          ],
          code: "k1f144",
          customer_name: "Fulano teste 2",
        },
      ],
    },
  
  ];
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="p-5 flex-shrink-0">
        <h1 className="text-6xl w-min">Baillan Barbearia</h1>
        <div className="flex flex-col items-center bg-black w-min text-white py-2 px-3 rounded-b-2xl absolute top-0 right-3 drop-shadow-md">
          <span className="text-6xl font-extrabold">24</span>
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
      <ScrollShadow hideScrollBar>
        <div className="pl-12 pr-6 py-4 overflow-y-auto">
          <ol className="relative border-l-2 border-gray-200 dark:border-gray-700 border-dashed">
            {schedules.map((sch, i) => {
              let isCurrent = sch.time=="12:00";
              return (
                <li key={i} className="mb-10 ml-11">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-white  rounded-full -left-3 ring-8 ring-white">
                    <h1
                      className={`font-extrabold text-2xl  ${
                        isCurrent ? "text-black" : "text-foreground-300"
                      }`}
                    >
                      {sch.time}
                    </h1>
                  </span>
                  {sch.appointments.map((aptms, i) => {
                    return (
                      <CardComponent
                        key={i}
                        code={aptms.code}
                        customer_name={aptms.customer_name}
                        hour={sch.time}
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
  services: { name: string; time: string }[];
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
              {s.name}
            </Chip>
          );
        })}
      </div>
    </div>
  );
};
