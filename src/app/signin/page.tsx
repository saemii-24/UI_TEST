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
    const fetchUrl = "https://example.com/test";
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

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-[url('https://cdn.pixabay.com/photo/2020/05/06/06/18/blue-5136251_1280.jpg')] bg-cover bg-center">
        <SigninForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default Signin;
