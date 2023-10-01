import { ISchedules } from "@/types";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { TbCalendarPause } from "react-icons/tb";

const ScheduleModal = ({
  onSubmit,
  isOpen,
  schedulesData,
  onOpenChange,
}: {
  onSubmit: (onClose: any) => void;
  isOpen: boolean;
  schedulesData: ISchedules[];
  onOpenChange: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      placement={"bottom"}
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between items-center">
              <h2 className="font-bold text-2xl">Seus horários</h2>
              <Button
                startContent={<FiEdit color="#00C2FF" size={20} />}
                isIconOnly
                className="bg-transparent"
              ></Button>
            </ModalHeader>
            <ModalBody>
              <div>
                {schedulesData.map((e, i) => {
                  return (
                    <ScheduleCard
                      key={i}
                      end_hour={e.start}
                      start_hour={e.end}
                      days={e.days}
                      onPauseSchedule={() => {}}
                    />
                  );
                })}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                fullWidth
                color="default"
                onPress={() => onSubmit(onClose)}
              >
                Fechar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const ScheduleCard = ({
  days,
  start_hour,
  end_hour,
  onPauseSchedule,
}: {
  days: string[];
  start_hour: string;
  end_hour: string;
  onPauseSchedule: () => void;
}) => {
  return (
    <div className="flex w-full flex-col p-3 border-1.5 border-foreground-300 rounded-xl mb-2">
      <h3 className="font-semibold text-lg">{days.join(", ")}</h3>
      <div className="flex mt-1 flex-wrap mb-2">
        <span className="px-1">
          {start_hour} - {end_hour}
        </span>
      </div>
      {/* <Button
        startContent={<TbCalendarPause />}
        size="sm"
        color="warning"
        onClick={onPauseSchedule}
      >
        Pausar agenda
      </Button> */}
    </div>
  );
};

export default ScheduleModal;
