"use client";
import SigninForm from "@/components/SigninForm";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

export interface SigninProps {
  id: string;
  password: string;
}

const Signin = () => {
  const fetchData = async () => {
    const fetchUrl = "https://example.com/user";
    const response = await fetch(fetchUrl);
    const data = await response.json();

    return data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchData,
  });

  console.log(data);

  const onSubmit: SubmitHandler<SigninProps> = (data) => {
    console.log(data);
  };

  return <>{/* <SigninForm onSubmit={onSubmit} /> */}</>;
};

export default Signin;
