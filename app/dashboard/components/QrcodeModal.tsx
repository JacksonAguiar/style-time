import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";

import Image from "next/image";

import { FiDownload } from "react-icons/fi";
const QrcodeModal = ({
  onSubmit,
  isOpen,
  onOpenChange,
}: {
  onSubmit: (onClose: any) => void;
  isOpen: boolean;
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
            <ModalBody>
              <Image
                width={300}
                height={300}
                src={
                  ""
                }
                alt="qr-code"
              />
              <span className="mt-2 mb-4">
                Use o qr-code para facilitar o agendamento de seus clietnes. ;)
              </span>
              <Button
                color="primary"
                startContent={<FiDownload />}
                onPress={() => onSubmit(onClose)}
              >
                Download
              </Button>
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

export default QrcodeModal;
