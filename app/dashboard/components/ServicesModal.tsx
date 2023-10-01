import { IServices } from "@/types";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";

const ServicesModal = ({
  onSubmit,
  isOpen,
  servicesData,
  onOpenChange,
}: {
  onSubmit: (onClose: any) => void;
  isOpen: boolean;
  servicesData: IServices[];
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
              <h2 className="font-bold text-2xl">Seus serviços</h2>
              <Button
                startContent={<FiEdit color="#00C2FF" size={20} />}
                isIconOnly
                className="bg-transparent"
              ></Button>
            </ModalHeader>
            <ModalBody>
              <ul>
                {servicesData.map((e, i) => {
                  return (
                    <li key={i} className="flex items-baseline mb-1">
                      <span>{e.name}</span>
                      <div className="flex-1 border-b-1 border-dotted"></div>
                      <h5>{e.duration}min</h5>
                    </li>
                  );
                })}
              </ul>
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
export default ServicesModal;
