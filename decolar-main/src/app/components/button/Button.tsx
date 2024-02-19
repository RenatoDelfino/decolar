"use client"

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  default:
    "text-white hover:text-purple bg-transparent hover:bg-white transition-all ease-in-out duration-150",
  active: "bg-white text-purple",
  hero: "bg-[#4001c7] hover:bg-[#270570] transition ease-in-out duration-300",
};

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "active" | "hero";
  text: String;
  icon?: React.ReactNode;
  otherIcon?: React.ReactNode;
  otherText?: String;
  teste?: Boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  text,
  icon,
  otherIcon,
  otherText,
  teste,
  className,
  ...props
}) => {
  const [amarelo, setAmarelo] = useState(true);
  
  const _className = twMerge(
    variants[variant],
    `bg-${amarelo ? 'yellow' : 'red'} text-white px-4 py-2 rounded`
  );
  return (
    <>
      <h2
        className={`${
          teste &&
          "text-white absolute text-[10px] px-4 h-4 bg-[#03a691] rounded-sm ml-[460px] mt-[-38px]"
        }`}
      >
        {teste && "Até 30% mais barato"}
      </h2>
      <a  onClick={() => setAmarelo(!amarelo)} className={`${_className}`} {...props}>
        <div className="flex items-center gap-2">
          {icon} <span>{text}</span> {otherIcon} {otherText}
        </div>
      </a>
    </>
  );
};

export default Button;
