"use client";
import { useContext, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

import UserService from "../../../api/services/UserService";
import { useConfirmTypePass, useTypeEmail, useTypePassword } from "./pages";

export default function SignIn() {
  const router = useRouter();

  const { data, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState(0);
  const searchParams = useSearchParams();

  const [submitData, setSubmitData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const changeSubmitData = ({
    email,
    pass,
  }: {
    email?: string;
    pass?: string;
  }) => {
    setSubmitData((prev) => ({
      email: email ?? prev.email,
      password: pass ?? prev.password,
    }));
  };

  const next = () => screen < screens.length - 1 && setScreen((p) => ++p);
  const back = () => screen > 0 && setScreen((p) => --p);
  const updateLoading = () => setLoading((prev) => !prev);

  const callbackUrl =
    searchParams.get("callbackUrl") ||
    (data?.user?.registerStep == 0
      ? "/dashboard"
      : "/register?s=" + data?.user?.registerStep);

  const onGoogleSignIn = async () => {
    await signIn("google", { redirect: true, callbackUrl: callbackUrl });
    // if (user?.ok) {
    //   redirectByStatus();
    // }
  };
  const verify = async () => {
    const { email } = submitData;
    if (email === "") {
    } else {
      var res = await UserService.getByEmailOrPhone(submitData.email);
      const { registerStep, completeAuth } = res.data;
      if (registerStep != 0) {
        return await signIn("credentials", {
          email: email,
          password: "default",
          redirect: true,
          callbackUrl: completeAuth
            ? "/register?s=" + registerStep
            : "/login/password?wtk=false",
        });
      }
      return next();
    }
  };

  const onSubmit = async (event: any) => {
    console.log(submitData);
    const { email, password } = submitData;

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: callbackUrl,
    });
  };

  const screens = [
    useTypeEmail(() => router.back(), verify, onGoogleSignIn, changeSubmitData),
    useTypePassword(back, false, onSubmit, changeSubmitData),
  ];

  return <div className="h-screen p-6">{screens[screen]}</div>;
}
