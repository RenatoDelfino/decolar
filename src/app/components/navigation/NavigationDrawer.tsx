"use client";

import React, { useState, useEffect, useRef } from "react";
import { GrMenu } from "react-icons/gr";
import { FiUser } from "react-icons/fi";
import useClickOutside from "@/app/hooks/useClickOutisde";
import IniciarSessao from "../Section";

const NavigationDrawer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [nome, setNome] = useState<string>("");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const refClick = useRef<HTMLDivElement>(null);
  useClickOutside(refClick, () => {
    setIsMenuOpen(false);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const nomeSalvo = localStorage.getItem("nome");
      if (nomeSalvo) {
        setNome(nomeSalvo);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("nome");
      localStorage.removeItem("cpf");
      window.location.href = "/"; // Redirecionamento após logout
    }
  };

  return (
    <>
      <div
        ref={refClick}
        className={`absolute top-14 right-80 bg-white p-6 rounded-2xl ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center bg-[#767e89] size-14 rounded-full">
            <FiUser className="text-base md:text-2xl" color="#fff" />
          </div>
          <h2 className="text-lg text-gray font-medium">Você está logado</h2>
        </div>
        <div className="mt-6">
          <IniciarSessao nome={nome} />
        </div>
        {/* Botão de Logout */}
        <button
          onClick={handleLogout}
          className="mt-5 bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Sair
        </button>
      </div>
      {/* Icon */}
      <button>
        <GrMenu className="text-2xl" color="#333" />
      </button>
    </>
  );
};

export default NavigationDrawer;
