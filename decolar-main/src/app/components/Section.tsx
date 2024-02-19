import React from "react";
import { FaUser } from "react-icons/fa6";

interface LoginProps {
  nome: string;
}

const IniciarSessao: React.FC<LoginProps> = ({ nome }) => {
  if (!nome) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <FaUser className="text-[#666] text-sm" />
      <p>{nome}</p>
    </div>
  );
};

export default IniciarSessao;
