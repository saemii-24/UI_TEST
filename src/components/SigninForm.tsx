import Input from "@/components/Input";
import React from "react";
import { useForm } from "react-hook-form";

interface SigninProps {
  id: string;
  password: string;
}

interface SigninFormProps {
  onSubmit: (data: SigninProps) => void;
}

const SigninForm = ({ onSubmit }: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninProps>();

  return (
    <div>
      <h1>어서오세요</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='id'
          placeholder='아이디를 입력해주세요'
          register={register("id", {
            required: "아이디는 필수 입니다.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "아이디는 올바른 이메일 형식으로 입력해야 합니다.",
            },
          })}
          error={errors.id?.message}
          reset={() => reset({ id: "" })}
          icon={true}
        />
        <Input
          name='password'
          placeholder='비밀번호를 입력해주세요'
          register={register("password", {
            required: "비밀번호는 필수 입니다.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,20}$/,
              message: "비밀번호는 8~20자의 특수문자와 영문자를 포함해야 합니다.",
            },
          })}
          error={errors.password?.message}
          reset={() => reset({ password: "" })}
          icon={true}
        />
        <button type='submit' role='button' data-testid='signin'>
          로그인
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
