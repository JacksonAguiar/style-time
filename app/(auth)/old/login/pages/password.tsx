import { Page } from "@/components/FormScreen";
import { Button } from "@nextui-org/button";
import { useState } from "react";

import { FiEye, FiEyeOff } from "react-icons/fi";

export default function useTypePassword(
  onBackClick: any,
  nextButton: boolean,
  onSubmit: any,
  changeSubmitData: any
) {
  const [hide, setHide] = useState(true);
  const changeVisibility = () => setHide((p) => !p);
  return (
    <div key={"pass"} className="flex flex-col justify-between h-full">
      <Page
        onClickBack={onBackClick}
        onSubmit={onSubmit}
        Title={nextButton ? "Crie sua senha" : "Senha de segurança"}
        removeFooter={!nextButton}
        submitTextButton={"Continuar"}
        key={"pass-login"}
      >
        <div className="mb-0 h-[55px] flex items-center w-full">
          <input
            className="w-full text-xl outline-transparent font-normal"
            placeholder="*********"
            type={hide ? "password" : "text"}
            name="password"
            onChange={(el) => changeSubmitData({ pass: el.target.value })}
          />

          <a onClick={changeVisibility}>
            {hide ? <FiEye size={20} /> : <FiEyeOff size={20} opacity={0.2} />}
          </a>
        </div>
      </Page>

      {!nextButton && (
        <Button
          size="lg"
          color="primary"
          fullWidth
          type="submit"
          onClick={onSubmit}
        >
          Entrar
        </Button>
      )}
    </div>
  );
}
