"use client";
import { FiCalendar, FiPlus } from "react-icons/fi";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  CheckboxGroup,
} from "@nextui-org/react";
import { daysForLocale, generateHourList } from "@/utils/time";
import React, { useEffect, useState } from "react";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import { Page } from "@/components/FormScreen";
import { CustomComponentProps } from "../page";

export default function useStepSimpleSchedule(props: CustomComponentProps) {
  const { data, update } = useSession();

  const defaultTime = { start: "", end: "" };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupSelected, setGroupSelected] = React.useState<string[]>([]);
  const [schedules, setSchedules] = useState<
    { id?: string; days: string[]; start: string; end: string }[]
  >([]);
  const [hoursComponents, setHoursComponents] = useState(defaultTime);

  const transformInShort = (days: string[]) =>
    days.map((day) => day.slice(0, 3)).join(", ");

  const deleteSchedule = async (index: Number, id?: string) => {
    var success = true;
    if (props.edit) {
      const res = await ScheduleService.delete(id ?? "");
      if (!res) success = false;
    }
    if (success) {
      setSchedules((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const onChangeStart = (new_value: string) => {
    setHoursComponents((prev) => ({ start: new_value, end: prev.end }));
  };

  const onChangeEnd = (new_value: string) => {
    setHoursComponents((prev) => ({ start: prev.start, end: new_value }));
  };

  useEffect(() => {
    if (props.edit)
      ScheduleService.getAll(data?.user?.companieId ?? "").then((data) => {
        if (data) setSchedules(data);
      });

    return () => console.log("Cleanup..");
  }, [props.edit, data?.user?.companieId]);

  const saveSchedule = async (onClose: any) => {
    if (
      hoursComponents.start != "" &&
      hoursComponents.end != "" &&
      schedules.length < 3
    ) {
      const { start, end } = hoursComponents;
      const schedule = {
        days: groupSelected,
        start: start,
        end: end,
      };

      var success = true;
      if (props.edit) {
        const { companieId } = data?.user ?? {};

        var res = await ScheduleService.create([schedule], companieId ?? "");
        if (!res) {
          success = false;
        }
      }

      if (success) {
        setSchedules((prev: any) => [...prev, schedule]);
        setHoursComponents(defaultTime);
        setGroupSelected([]);
        onClose();
      }
    }
  };

  const dayAlreadySelected = (day: string) => {
    var allSelected = schedules.map((e) => e.days);
    const flattenedArray = allSelected.flat();

    return flattenedArray.includes(day);
  };

  const onSubmit = async () => {
    const { id, companieId } = data?.user ?? {};

    var res = await ScheduleService.create(schedules, companieId ?? "");
    if (res) {
      await UserService.update(id ?? "", {
        registerStep: props.step,
      });
      update({ resgisterStep: props.step });
      props.nextFunction();
    }
  };

  return (
    <Page
      Title="Horários"
      onClickBack={props.previousFunction}
      onSubmit={onSubmit}
      removeFooter={schedules.length == 0 || props.edit}
      chipEmail={data?.user?.email}
      onChangeMenuHeader={props.onSendReport}
      submitTextButton={"Concluir"}
    >
      <div>
        <div>
          <p className="mb-4">Adicione dias e horarios de funcionamento</p>
          <div className="mb-8">
            {schedules.map((e, i) => (
              <CardSchedule
                key={i}
                days={transformInShort(e.days)}
                hour={e.start + " - " + e.end}
                onDelete={() => deleteSchedule(i, e.id)}
              />
            ))}
          </div>
          <CheckboxGroup
            className="flex gap-3 capitalize"
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
                size="lg"
              >
                {day}
              </CustomCheckbox>
            ))}
          </CheckboxGroup>

          {groupSelected.length != 0 && (
            <Button
              color="default"
              className="flex mx-auto  mt-6"
              startContent={<FiPlus />}
              onClick={onOpen}
            >
              Adicionar horário
            </Button>
          )}
        </div>

        <Modal
          isOpen={isOpen}
          placement={"bottom"}
          onOpenChange={onOpenChange}
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 uppercase text-center">
                  {groupSelected.join(", ")}
                </ModalHeader>
                <ModalBody>
                  <ScheduleTime
                    onChangeStart={(value) => onChangeStart(value)}
                    onChangeEnd={(value) => onChangeEnd(value)}
                    listHours={generateHourList(
                      Intl.DateTimeFormat().resolvedOptions().timeZone
                    )}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose}>
                    Cancelar
                  </Button>
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

import { Select, SelectItem } from "@nextui-org/react";
import { FiTrash2 } from "react-icons/fi";
import { useSession } from "next-auth/react";
import UserService from "@/app/api/services/UserService";
import ScheduleService from "@/app/api/services/ScheduleService";

const CardSchedule = ({
  days,
  hour,
  onDelete,
}: {
  days: string;
  hour: string;
  onDelete: () => void;
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex">
        <FiCalendar size={45} />
        <div className="ml-2">
          <h3 className="font-semibold text-base uppercase">{days}</h3>
          <span className="font-normal text-xs">{hour}</span>
        </div>
      </div>
      <Button
        variant="flat"
        size="sm"
        isIconOnly
        color="danger"
        onClick={onDelete}
        startContent={<FiTrash2 />}
      />
    </div>
  );
};

const ScheduleTime = ({
  valueStart = "",
  onChangeStart = (value: string) => {},
  valueEnd = "",
  onChangeEnd = (value: string) => {},
  listHours = [""],
}) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center mb-3 pt-2">
      <Select
        labelPlacement={"outside-left"}
        label="Abre às"
        placeholder="Horário"
        className="max-w-xs items-center"
        color="primary"
        classNames={{
          label: "w-full text-xl font-semibold text-center",
          value: "text-xl font-semibold",
        }}
        onChange={(el) => onChangeStart(el.target.value)}
        value={valueStart}
        // defaultSelectedKeys={[defaultTime.start]}
      >
        {listHours.map((hour, i) => (
          <SelectItem key={hour} value={hour}>
            {hour}
          </SelectItem>
        ))}
      </Select>
      <Select
        labelPlacement={"outside-left"}
        label="Fechar às"
        color="primary"
        classNames={{
          label: "w-full text-xl font-semibold text-center",
          value: "text-xl font-semibold",
        }}
        placeholder="Horário"
        className="max-w-xs items-center"
        onChange={(el) => onChangeEnd(el.target.value)}
        value={valueEnd}
      >
        {listHours.map((hour, i) => (
          <SelectItem key={hour} value={hour}>
            {hour}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
