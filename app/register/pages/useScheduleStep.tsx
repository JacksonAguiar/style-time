"use client";
import { FiPlus } from "react-icons/fi";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  CheckboxGroup,
  Divider,
} from "@nextui-org/react";
import { daysForLocale, generateHourList } from "@/utils/time";
import React, { useState } from "react";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import ScheduleTime from "../components/ScheduleTime";
import { Page } from "@/components/FormScreen";
import { CustomComponentProps } from "../page";

export default function useStepSchedule(props: CustomComponentProps) {
  const defaultTime = { start: "07:00", end: "12:00" };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupSelected, setGroupSelected] = React.useState<string[]>([]);
  const [schedules, setSchedules] = useState<
    { days: string[]; hours: string[] }[]
  >([]);
  const [hoursComponents, setHoursComponents] = useState([defaultTime]);

  const getValueStart = (index = 0) => hoursComponents[index].start;

  const getValueEnd = (index = 0) => hoursComponents[index].end;

  const transformInShort = (days: string[]) =>
    days.map((day) => day.slice(0, 3));

  const newHour = () =>
    hoursComponents.length < 3 &&
    setHoursComponents((prev) => [...prev, defaultTime]);

  const deleteHour = (index: Number) =>
    setHoursComponents((prev) => prev.filter((_, i) => i !== index));

  const deleteSchedule = (index: Number) =>
    setSchedules((prev) => prev.filter((_, i) => i !== index));

  const onChangeStart = (index = 0, new_value: string) => {
    const updatedHoursComponents = [...hoursComponents];

    const updatedHour = { ...updatedHoursComponents[index] };

    updatedHour.start = new_value;
    updatedHoursComponents[index] = updatedHour;
    setHoursComponents(updatedHoursComponents);

    console.log(hoursComponents);
  };

  const onChangeEnd = (index = 0, new_value: string) => {
    const updatedHoursComponents = [...hoursComponents];
    updatedHoursComponents[index].end = new_value;
    setHoursComponents(updatedHoursComponents);
  };

  const listHours = generateHourList(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const saveSchedule = (onClose: any) => {
    if (groupSelected.length != 0) {
      const data = {
        days: groupSelected,
        hours: hoursComponents.map((h) => h.start + " - " + h.end),
      };
      setSchedules((prev: any) => [...prev, data]);
      setHoursComponents([]);
      setGroupSelected([]);

      onClose();
    }
  };

  const dayAlreadySelected = (day: string) => {
    var result = schedules.map((e) => {
      if (e.days.includes(day)) return true;
      return false;
    });
    return result[0];
  };

  const onSubmit = () => {
    console.log(schedules);
    props.nextFunction()
  };

  return (
    <Page
      Title="Horários"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
      submitTextButton="Concluir"
    >
      <div>
        {schedules.map((el, i) => {
          return (
            <>
              <div key={i}>
                <span className="text-lg font-semibold capitalize">
                  {el.days && transformInShort(el.days).join(", ")}
                </span>
                <p className="text-base">{el.hours.join(", ")}</p>
                <Button
                  className="mt-2"
                  color="danger"
                  size="sm"
                  onClick={() => deleteSchedule(i)}
                >
                  Remover
                </Button>
              </div>
              <Divider className="my-4" />
            </>
          );
        })}

        {hoursComponents.length != 0
          ? ScheduleTime({
              with_trash: false,
              index: 0,
              listHours: listHours,
              defaultTime: defaultTime,
              valueStart: getValueStart(0),
              valueEnd: getValueEnd(0),
              onChangeStart: (v) => onChangeStart(0, v),
              onChangeEnd: (v) => onChangeEnd(0, v),
            })
          : null}

        {hoursComponents.length != 1
          ? hoursComponents.map(
              (el, i) =>
                i != 0 &&
                ScheduleTime({
                  onRemove: () => deleteHour(i),
                  index: i,
                  listHours: listHours,
                  defaultTime: defaultTime,
                  valueStart: getValueStart(i),
                  valueEnd: getValueEnd(i),
                  onChangeStart: (v) => onChangeStart(i, v),
                  onChangeEnd: (v) => onChangeEnd(i, v),
                })
            )
          : null}

        <div className="flex w-full flex-now gap-4 justify-center">
          {schedules.length != 0 && hoursComponents.length == 0 ? (
            <Button
              className="mt-5 bg-transparent text-sky-500"
              startContent={<FiPlus />}
              onClick={newHour}
            >
              Adicionar agenda
            </Button>
          ) : (
            <>
              <Button className="mt-5" color="primary" onClick={newHour}>
                Novo horário
              </Button>
              <Button className="mt-5 " color="success" onPress={onOpen}>
                Salvar
              </Button>
            </>
          )}
        </div>

        <Modal isOpen={isOpen} placement={"bottom"} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Esses horários são para quais dias
                </ModalHeader>
                <ModalBody>
                  <CheckboxGroup
                    className="gap-1"
                    label=""
                    orientation="horizontal"
                    value={groupSelected}
                    onChange={(e) => setGroupSelected(e as string[])}
                  >
                    {daysForLocale("pt-BR").map((day, i) => (
                      <CustomCheckbox
                        isDisabled={dayAlreadySelected(day)}
                        key={i}
                        value={day}
                      >
                        {day}
                      </CustomCheckbox>
                    ))}
                  </CheckboxGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="success" onPress={() => saveSchedule(onClose)}>
                    Feito
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </Page>
  );
}
