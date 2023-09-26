import { Page } from "@/components/FormScreen";
import { Tabs, Tab } from "@nextui-org/react";

import { CheckboxGroup } from "@nextui-org/react";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import { ScheduleI } from "../[sc]/steps.component";
import { generateHours, getNextDays } from "@/utils/time";

export default function useStep3({
  previousFunction,
  nextFunction,
  onChange,
  values,
  options,
}: {
  previousFunction: any;
  nextFunction: any;
  onChange: any;
  values: ScheduleI;
  options: any[];
}) {
  const next = getNextDays();

  const hours: any[] = generateHours(options);

  const getHourByDay = (day: string): string[] => {
    const d = hours.find((e) => e.day == day);

    return d ? d.timeSlots : [];
  };

  const generateDateTime = (hour: any, datetime: any) => {
    const newDatetime = new Date(datetime);
    const [hourMinute, amPm] = hour.split(" ");
    let [newHours, newMinutes] = hourMinute.split(":").map(Number);

    if (amPm === "PM" && newHours < 12) {
      newHours += 12;
    }
    newDatetime.setHours(newHours, newMinutes, 0, 0);

    return newDatetime.toISOString();
  };
  const getMonthAndDay = () => {
   
    var mad = next.map((d) => {
      return {
        month: Intl.DateTimeFormat("pt-BR", { month: "short" }).format(d),
        day: String(d.getDate()).padStart(2, "0"),
        datetime: d,
      };
    });
    return mad;
  };

  const handleSelect = (e: any[]) => {
  
    if (e.length < 3) {
      onChange("hours", e);
    }
  };

  return (
    <Page
      Title="Horário"
      onClickBack={previousFunction}
      onSubmit={nextFunction}
    >
      <Tabs
        color="primary"
        aria-label="Options"
        className="bg-transparent w-full"
        classNames={{
          tabList: "bg-transparent",
          tab: "h-[60px]",
        }}
      >
        {getMonthAndDay().map((day) => {
          var longDay = Intl.DateTimeFormat("pt-BR", {
            weekday: "long",
          }).format(day.datetime);
          return (
            <Tab
              key={day.day}
              title={
                <div className="flex flex-col justify-center items-center h-8 leading-none">
                  <span>{day.month}</span>
                  <h2 className="text-3xl font-bold h-min leading-tight">
                    {day.day}
                  </h2>
                </div>
              }
            >
              <p className="text-2xl font-semibold mb-4 mt-2 first-letter:uppercase">
                {longDay}
              </p>

              <CheckboxGroup
                className="gap-2"
                orientation="horizontal"
                label="Selecione até dois horários"
                value={values.hours}
                onChange={(e) => handleSelect(e as [])}
                size="lg"
              >
                {getHourByDay(longDay).map((h, i) => (
                  <CustomCheckbox
                    key={i}
                    value={generateDateTime(h, day.datetime)}
                  >
                    {h}
                  </CustomCheckbox>
                ))}
              </CheckboxGroup>
            </Tab>
          );
        })}
      </Tabs>
    </Page>
  );
}
