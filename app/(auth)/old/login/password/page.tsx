"use client";

import { FormEvent, useContext, useEffect, useState } from "react";

import { useConfirmTypePass, useTypePassword } from "../pages";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import UserService from "@/app/api/services/UserService";
import { hash, hashSync } from "bcrypt";

export default function SignIn() {
  const { data, update } = useSession();
  const router = useRouter();

  const params = useSearchParams();
  const tk = params.get("wtk") ?? "";

  const [submitData, setSubmitData] = useState<{
    password: string;
    cpassword: string;
  }>({ password: "", cpassword: "" });

  const changeSubmitData = ({
    pass,
    cpass,
  }: {
    pass?: string;
    cpass?: string;
  }) => {
    setSubmitData((prev) => ({
      password: pass ?? prev.password,
      cpassword: cpass ?? prev.cpassword,
    }));
  };

  const [screen, setScreen] = useState(0);

  const next = () => screen < screens.length && setScreen((p) => ++p);
  const back = () => screen > 0 && setScreen((p) => --p);

  const screens = [
    useTypePassword(back, true, next, changeSubmitData),
    useConfirmTypePass(back, onSubmit, changeSubmitData),
  ];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let { password, cpassword } = submitData;
    const id = data?.user?.id ?? "";
    if (password == cpassword) {
      if (tk == "false") {
        await UserService.update(id, {
          password: password,
          completeAuth: true,
        });
        await update({ completeAuth: true });
        router.replace("/register")
        //return router.push("/register");
      } else {
        if (!id) {
          console.log("no id");
        } else {
          var res = await UserService.update(id, {
            password: password,
          });
          // console.log(res);
          // if (tk == "false") {
          //   return router.push("/register");
          // }
          return router.push("/login");
        }
      }
    } else console.log("senhas diferentes");
    console.log(submitData);
  }

  return (
    ///getserverprops
    <div className="h-full p-6">
      {tk == "false" || tk?.length > 10 ? screens[screen] : "invalid"}
    </div>
  );
}
