import {
  Modal as _Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  UseDisclosureProps,
} from "@chakra-ui/react";
import { Component } from "types/component";

type Props = {
  title: string;
  showCloseBtn?: boolean;
} & UseDisclosureProps &
  Component;

export const Modal: React.FC<Props> = (props) => {
  const {isOpen, onClose, showCloseBtn = true, title, children} = props
  return (
    <_Modal onClose={onClose!} isOpen={isOpen!} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        {showCloseBtn && <ModalCloseButton />}
        <ModalBody pb={6}>{children}</ModalBody>
      </ModalContent>
    </_Modal>
  );
};
