import { IServices } from "@/types";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { cn } from "tailwind-variants";

const ConfirmHourModal = ({
  onSubmit,
  isOpen,
  hour1,
  hour2,
  onOpenChange,
  onSelected,
}: {
  onSubmit: (onClose: any) => void;
  onSelected: (hour: string) => void;
  isOpen: boolean;
  hour1: Date;
  hour2: Date;
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
              <h2 className="font-bold text-2xl">
                Qual horário deseja confirmar?
              </h2>
            </ModalHeader>
            <ModalBody>
              <RadioGroup
                label="Horários"
                onChange={(e) => onSelected(e.target.value)}
                defaultValue={hour1.toISOString()}
                className="flex"
              >
                <CustomRadio
                  description={hour1.toLocaleTimeString([], {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                  value={hour1.toISOString()}
                >
                  {hour1.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CustomRadio>
                <CustomRadio
                  description={hour2.toLocaleTimeString([], {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                  value={hour2.toISOString()}
                >
                  {hour2.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CustomRadio>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button fullWidth color="danger" onPress={() => onClose()}>
                Cancelar
              </Button>
              <Button
                fullWidth
                color="default"
                onPress={() => onSubmit(onClose)}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row max-w-[200px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};
export default ConfirmHourModal;
