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
  onOpenChange,
}: {
  onSubmit: (onClose: any) => void;
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} placement={"bottom"} onOpenChange={onOpenChange} hideCloseButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between">
              <h2 className="font-bold text-2xl">Seus horários</h2>
              <Button
                startContent={<FiEdit color="#00C2FF" size={20} />}
                isIconOnly
                className="bg-transparent"
              ></Button>
            </ModalHeader>
            <ModalBody>
              <div>
                {[0, 1, 2].map((e, i) => {
                  return (
                    <ScheduleCard
                      key={i}
                      days=""
                      hours={[]}
                      onPauseSchedule={() => {}}
                    />
                  );
                })}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button fullWidth color="default" onPress={() => onSubmit(onClose)}>
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
  hours,
  onPauseSchedule,
}: {
  days: string;
  hours: string[];
  onPauseSchedule: () => void;
}) => {
  return (
    <div className="flex w-full flex-col p-3 border-1.5 border-foreground-300 rounded-xl mb-2">
      <h3 className="font-semibold text-lg">Seg, Ter, Qua, Qui, Sex</h3>
      <div className="flex mt-1 flex-wrap mb-2">
        {[0, 1, 2].map((e, i) => {
          return (
            <span key={i} className="px-1">
              07:00 am - 12:00am
            </span>
          );
        })}
      </div>
      <Button
        startContent={<TbCalendarPause />}
        size="sm"
        color="warning"
        onClick={onPauseSchedule}
      >
        Pausar horários
      </Button>
    </div>
  );
};

export default ScheduleModal;