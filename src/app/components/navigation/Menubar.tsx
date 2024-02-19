"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaHeadset } from "react-icons/fa6";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { PiSuitcase } from "react-icons/pi";
import NavigationDrawer from "./NavigationDrawer";
import IniciarSessao from "../Section";
import useClickOutside from "@/app/hooks/useClickOutisde";
import Image from "next/image";

const Menubar = () => {
  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const useClickRefPopup = useRef<HTMLDivElement>(null);

  useClickOutside(useClickRefPopup, () => {
    setShowPopup(false);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const nomeSalvo = localStorage.getItem("nome");
      if (nomeSalvo) {
        setNome(nomeSalvo);
      } else {
        setShowPopup(true);
      }
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `https://dbftools.tech/api/tools/search-cpf/${cpf}`
      );
      if (!response.ok) {
        throw new Error("Erro ao consultar o CPF");
      }
      const data = await response.json();
      if (data.nome) {
        setNome(data.nome);
        localStorage.setItem("nome", data.nome);
        setShowPopup(false);
      } else {
        throw new Error("Nome não encontrado para o CPF fornecido");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-1 md:gap-5">
      <div className="flex items-center justify-center gap-2 rounded-bl-[24px] bg-blue px-6 py-6">
        <FaHeadset color="#fff" />
        <a
          href="/"
          className="hidden lg:inline text-white text-sm font-medium font-montserrat"
        >
          Televendas <span className="font-semibold">0800 883 6342</span>
        </a>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <IoIosHelpCircleOutline className="text-xl" color="#333" />
        <a href="/" className="text-sm text-gray font-medium font-montserrat">
          Ajuda
        </a>
      </div>
      <div className="flex items-center gap-2">
        <PiSuitcase className="text-xl" color="#333" />
        <a
          href="/"
          className="hidden lg:inline text-sm text-gray font-medium font-montserrat"
        >
          Minhas Viagens
        </a>
      </div>
      <div className="md:ml-2 flex items-center gap-2">
        <IniciarSessao nome={nome} />{" "}
      </div>
      <div></div>
      <button className="md:ml-4 flex items-center gap-2">
        <div className="relative size-12 sm:size-14 md:size-16">
          <Image fill alt="user-icon" src={"/usericon.svg"} />
        </div>
        <div className="hidden lg:inline-block text-[13px] text-[#333] font-semibold font-montserrat">
          Iniciar Sessão
        </div>
      </button>
      <NavigationDrawer />
    </div>
  );
};

export default Menubar;
