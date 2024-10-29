import React from "react";

interface SignupProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status: "login" | "logout";
}

const Signup = ({ status = "login" }: SignupProps) => {
  return (
    <button
      type='button'
      className='flex rounded-full bg-white px-3 py-1 font-semibold text-black'
    >
      {status === "login" ? "로그인" : "로그아웃"}
    </button>
  );
};

export default Signup;
