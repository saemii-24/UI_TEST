"use client";
import SigninForm from "@/components/SigninForm";
import React from "react";
import { SubmitHandler } from "react-hook-form";

export interface SigninProps {
  id: string;
  password: string;
}

const Signin = () => {
  const onSubmit: SubmitHandler<SigninProps> = (data) => {
    console.log(data);
  };

  return <SigninForm onSubmit={onSubmit} />;
};

export default Signin;
