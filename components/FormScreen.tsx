import {
  Chip,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";

export function Header({
  onClick,
  withChip = false,
  email = "",
  onChangeMenu,
}: {
  onClick: () => void;
  onChangeMenu?: (keys: any) => void;
  withChip?: boolean;
  email?: string;
}) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        className="tap-highlight-transparent"
        type="button"
        onClick={onClick}
      >
        <FiArrowLeft />
      </button>
      {withChip && (
        <Dropdown>
          <DropdownTrigger>
            <Chip
              variant="solid"
              color="primary"
              avatar={
                <Avatar
                  name={email}
                  size="sm"
                  getInitials={(name) => name.charAt(0).toUpperCase()}
                />
              }
            >
              {email}
            </Chip>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            onSelectionChange={onChangeMenu}
          >
            <DropdownItem key="report">Reportar um problema</DropdownItem>
            <DropdownItem key="change" onClick={() => signOut()}>
              Alterar email
            </DropdownItem>
            <DropdownItem
              color="danger"
              key="signout"
              onClick={() => signOut()}
              startContent={<PiSignOut />}
            >
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
}

export function Footer({
  onClick,
  buttonText,
  withoutIcon = false,
}: {
  onClick: () => void;
  buttonText?: string | null;
  withoutIcon?: boolean;
}) {
  return (
    <footer className="flex justify-end">
      <Button
        size="md"
        onClick={onClick}
        isIconOnly={buttonText == null}
        className="tap-highlight-transparent"
        endContent={!withoutIcon && <FiChevronRight />}
        color="default"
        type="submit"
      >
        {buttonText != null ? buttonText : ""}
      </Button>
    </footer>
  );
}

export function Page({
  Title,
  onClickBack,
  onSubmit,
  children,
  submitTextButton = null,
  withoutIcon = false,
  removeFooter = false,
  removeHeader = false,
  chipEmail = null,
  onChangeMenuHeader,
}: {
  Title: string;
  withoutIcon?: boolean;
  removeFooter?: boolean;
  removeHeader?: boolean;
  submitTextButton?: string | null;
  onClickBack: () => void;
  onSubmit: () => void;
  onChangeMenuHeader?: (k: any) => void;
  children: React.ReactNode;
  chipEmail?: string | null;
}) {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="h-full">
        {!removeHeader && (
          <Header
            onClick={onClickBack}
            withChip={chipEmail != null}
            email={chipEmail ?? ""}
            onChangeMenu={onChangeMenuHeader}
          />
        )}
        <h1 className="font-bold text-5xl mb-5">{Title}</h1>
        {children}
      </div>
      {!removeFooter && (
        <Footer
          onClick={() => onSubmit()}
          buttonText={submitTextButton}
          withoutIcon={withoutIcon}
        />
      )}
    </div>
  );
}
