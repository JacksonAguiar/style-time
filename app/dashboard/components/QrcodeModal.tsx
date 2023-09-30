import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";

import Image from "next/image";

import { useQRCode } from "next-qrcode";
import { FiDownload } from "react-icons/fi";
const QrcodeModal = ({
  onSubmit,
  isOpen,
  code,
  onOpenChange,
}: {
  onSubmit: (onClose: any) => void;
  isOpen: boolean;
  code: string;
  onOpenChange: () => void;
}) => {
  const { SVG } = useQRCode();
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
              <div className="flex justify-center">

              <SVG
                text={"https://github.com/bunlong/next-qrcode"}
                options={{
                  width: 300,
                  // color: {
                    //   dark: "#010599FF",
                    //   light: "#FFBF60FF",
                    // },
                  }}
                  />
                  </div>
              <span className="mb-4">
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

export default QrcodeModal;
