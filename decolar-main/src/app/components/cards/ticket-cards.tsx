"use client";

import useClickOutside from "@/app/hooks/useClickOutisde";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { IoAirplaneOutline } from "react-icons/io5";
import { FaSuitcaseRolling } from "react-icons/fa";
import { RiSuitcase2Fill } from "react-icons/ri";
import { BsSuitcase2Fill } from "react-icons/bs";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const passagensDataString = localStorage.getItem("passagensData");

let volta: boolean | null = null;

if (passagensDataString) {
  const passagensData = JSON.parse(passagensDataString);

  volta = passagensData.volta;
}

interface PropsCartoesPassagem {
  isActive?: boolean;
  setActive?: ((isActiveBack: boolean) => void) | undefined;
  isActiveBack?: boolean;
  setActiveBack?: ((isActiveBack: boolean) => void) | undefined;
  isTarget?: boolean;
  companyLogo?: string | any;
  companyName?: string;
  directionIda?: string;
  horarioIda?: string;
  directionVolta?: string;
  horarioVolta?: string;
  tempoVoo?: string;
  dataIda?: string;
  dataVolta?: string;
  cidadeIda?: string;
  cidadeVolta?: string;
  price?: string;
  adultoPrice?: string;
  impostoPrice?: string;
  Azul?: boolean;
}

const TicketCardItem: React.FC<PropsCartoesPassagem> = ({
  isActive,
  setActive,
  isActiveBack,
  setActiveBack,
  ...props
}) => {
  return (
    <div className="">
      <div className="flex items-center py-6 justify-between lg:justify-normal px-0.5">
        {/* logo container */}
        <div className="pl-4 lg:pr-[17px] flex items-center gap-2 absolute lg:relative">
          <div
            onClick={() => {
              setActive && setActive(!isActive);
              setActiveBack && setActiveBack(!isActiveBack);
            }}
            className={`flex items-center justify-center size-5 border cursor-pointer ${
              isActive || isActiveBack ? "border-purple" : "border-gray"
            } rounded-full`}
          >
            {(isActive || isActiveBack) && (
              <div className="size-3 bg-purple rounded-full" />
            )}
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Image
              width={24}
              height={0}
              src={props.companyLogo}
              alt="Company Logo"
            />
            <span>{props.companyName}</span>
          </div>
        </div>
        {/* horario ida */}
        <div className="flex flex-col lg:block pr-1 pl-1 ml-10">
          <div className="flex lg:hidden items-center gap-3 mb-4">
            <Image
              width={20}
              height={0}
              src={props.companyLogo}
              alt="Company Logo"
            />
            <span className="text-xs">{props.companyName}</span>
          </div>
          <h2 className="text-xs text-gray uppercase">{props.directionIda}</h2>
          <h2 className="text-sm text-gray font-bold">{props.horarioIda}</h2>
          <div className="block lg:hidden -mx-4">
            <h2 className="pl-4 text-xs text-[#767e89] mt-2">
              {props.tempoVoo}
            </h2>
          </div>
        </div>
        {/* tipo */}
        <div className="lg:ml-[38px] lg:mr-[46px] mx-4">
          <h2 className="text-[13px] text-[#03a691] border-b">Direto</h2>
        </div>
        {/* horario volta */}
        <div className="flex flex-col lg:block pr-1 mt-2">
          <h2 className="text-xs text-gray uppercase">
            {props.directionVolta}
          </h2>
          <h2 className="text-sm text-gray font-bold">{props.horarioVolta}</h2>
          <div className="block lg:hidden -mx-4"></div>
        </div>
        {/* tempo de voo */}
        <div className="hidden lg:block mx-[42px]">
          <h2 className="pl-4 text-[13px] text-[#767e89] font-semibold">
            {props.tempoVoo}
          </h2>
        </div>
        {/* bagagem */}
        <div className="pl-1 flex items-center gap-[1.5px] pr-3.5 lg:mr-2">
          <FaSuitcaseRolling color="#03a691" />
          <RiSuitcase2Fill color="#03a691" />
          <BsSuitcase2Fill color="#ccc" />
        </div>
        <div className="hidden lg:block">
          <IoIosArrowDown className="text-gray text-sm" />
        </div>
      </div>
    </div>
  );
};

const TicketCards: React.FC<PropsCartoesPassagem> = ({ ...props }) => {
  const [isFavorite, setFavorite] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeIndexBack, setActiveIndexBack] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const useClickRefPopup = useRef<HTMLDivElement>(null);

  const handleNextButtonClick = () => {
    if (!props.isTarget) {
      setShowPopup(true);
    }
  };

  useClickOutside(useClickRefPopup, () => {
    setShowPopup(false);
  });

  // if (props && props.falsePrice) {
  //   const discount = props.falsePrice * 0.55; // 55% of the original price
  //   const adjustedPrice = Math.round(props.falsePrice - discount);
  // }
  const handleSetActive = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  const handleSetActiveBack = (index: number) => {
    setActiveIndexBack(index === activeIndexBack ? null : index);
  };
  return (
    <>
      <section>
        <div className="flex flex-col xl:flex-row justify-between bg-white rounded-lg border border-gray/25 mb-5">
          {/* columns container */}
          <div>
            <div className="flex mx-3 mt-3 mb-5">
              {/* direction container */}
              <div className="flex justify-between w-full lg:w-fit items-center lg:items-baseline lg:justify-normal lg:flex-col pl-3 lg:pr-[67px]">
                <div className="flex items-center gap-2">
                  <IoAirplaneOutline color="#444" />
                  <h2 className="text-sm text-gray font-bold uppercase">ida</h2>
                </div>
                <h3 className="text-xs text-[#777] font-medium normal-case font-montserrat">
                  {props.dataIda}
                </h3>
              </div>
              {/* origin container */}
              <div className="flex flex-col">
                <div className="hidden lg:block pl-2 pr-24">
                  <h2 className="text-sm text-gray font-bold uppercase">
                    {props.directionIda}{" "}
                    <span className="text-xs text-[#777] font-medium normal-case block font-montserrat">
                      {props.cidadeIda}
                    </span>
                  </h2>
                </div>
              </div>
              {/* destination container */}
              <div className="flex flex-col">
                <div className="hidden lg:block pl-2 pr-24">
                  <h2 className="text-sm text-gray font-bold uppercase">
                    {props.directionVolta}{" "}
                    <span className="text-xs text-[#777] font-medium normal-case block font-montserrat">
                      {props.cidadeVolta}
                    </span>
                  </h2>
                </div>
              </div>
              {/* baggage container */}
              <div className="self-end">
                <div className="hidden lg:block pl-2 pr-24">
                  <span className="text-xs text-[#777] font-medium normal-case block font-montserrat">
                    Bagagem
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col mb-5 ${
                volta && "border-b border-[#ccc]"
              }`}
            >
              <TicketCardItem
                companyLogo={`${props.Azul ? "/azul.png" : "/gol.png"}`}
                companyName={`${props.Azul ? "Azul" : "Gol"}`}
                horarioIda="06:15"
                horarioVolta="09:45"
                tempoVoo="1h 20m"
                isActive={activeIndex === 0}
                setActive={() => handleSetActive(0)}
              />
              <TicketCardItem
                companyLogo={`${props.Azul ? "/azul.png" : "/gol.png"}`}
                companyName={`${props.Azul ? "Azul" : "Gol"}`}
                horarioIda="09:40"
                horarioVolta="11:00"
                tempoVoo="1h 15m"
                isActive={activeIndex === 1}
                setActive={() => handleSetActive(1)}
              />
              <TicketCardItem
                companyLogo={`${props.Azul ? "/azul.png" : "/gol.png"}`}
                companyName={`${props.Azul ? "Azul" : "Gol"}`}
                horarioIda="10:30"
                horarioVolta="20:00"
                tempoVoo="1h 15m"
                isActive={activeIndex === 2}
                setActive={() => handleSetActive(2)}
              />
              <TicketCardItem
                companyLogo={`${props.Azul ? "/azul.png" : "/gol.png"}`}
                companyName={`${props.Azul ? "Azul" : "Gol"}`}
                horarioIda="14:00"
                horarioVolta="11:00"
                tempoVoo="1h 10m"
                isActive={activeIndex === 3}
                setActive={() => handleSetActive(3)}
              />
            </div>

            {volta && (
              <div>
                <div className="flex mx-3 mt-3 mb-5">
                  {/* direction container */}
                  <div className="flex justify-between w-full lg:w-fit items-center lg:items-baseline lg:justify-normal lg:flex-col pl-2 lg:pr-[67px]">
                    <div className="flex items-center gap-2">
                      <IoAirplaneOutline className="rotate-180" color="#444" />
                      <h2 className="text-sm text-gray font-bold uppercase">
                        volta
                      </h2>
                    </div>
                    <h3 className="text-xs text-[#777] font-medium normal-case font-montserrat">
                      {props.dataVolta}
                    </h3>
                  </div>
                  {/* origin container */}
                  <div className="flex flex-col">
                    <div className="hidden lg:block pl-2 pr-24">
                      <h2 className="text-sm text-gray font-bold uppercase">
                        {props.directionVolta}{" "}
                        <span className="text-xs text-[#777] font-medium normal-case block font-montserrat">
                          {props.cidadeVolta}
                        </span>
                      </h2>
                    </div>
                  </div>
                  {/* destination container */}
                  <div className="flex flex-col">
                    <div className="hidden lg:block pl-2 pr-24">
                      <h2 className="text-sm text-gray font-bold uppercase">
                        {props.directionIda}{" "}
                        <span className="text-xs text-[#777] font-medium normal-case block font-montserrat">
                          {props.cidadeIda}
                        </span>
                      </h2>
                    </div>
                  </div>
                  {/* baggage container */}
                  <div className="hidden lg:block self-end">
                    <div className="pl-2 pr-24">
                      <span className="text-xs text-[#777] font-medium normal-case block font-montserrat">
                        Bagagem
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mb-5 pt-6">
                  <TicketCardItem
                    companyLogo={`${props.Azul ? "/azul.png" : "/gol.png"}`}
                    companyName={`${props.Azul ? "Azul" : "Gol"}`}
                    horarioIda="05:30"
                    horarioVolta="07:15"
                    tempoVoo="1h 15m"
                    isActiveBack={activeIndexBack === 0}
                    setActiveBack={() => handleSetActiveBack(0)}
                  />
                  <TicketCardItem
                    companyLogo={`${props.Azul ? "/azul.png" : "/gol.png"}`}
                    companyName={`${props.Azul ? "Azul" : "Gol"}`}
                    horarioIda="07:00"
                    horarioVolta="08:15"
                    tempoVoo="1h 15m"
                    isActiveBack={activeIndexBack === 1}
                    setActiveBack={() => handleSetActiveBack(1)}
                  />
                  <TicketCardItem
                    companyLogo={`${props.Azul ? "/azul.png" : "/gol.png"}`}
                    companyName={`${props.Azul ? "Azul" : "Gol"}`}
                    horarioIda="08:00"
                    horarioVolta="09:20"
                    tempoVoo="1h 20m"
                    isActiveBack={activeIndexBack === 2}
                    setActiveBack={() => handleSetActiveBack(2)}
                  />
                  <TicketCardItem
                    companyLogo={`${props.Azul ? "/azul.png" : "/gol.png"}`}
                    companyName={`${props.Azul ? "Azul" : "Gol"}`}
                    horarioIda="06:05"
                    horarioVolta="07:15"
                    tempoVoo="1h 10m"
                    isActiveBack={activeIndexBack === 3}
                    setActiveBack={() => handleSetActiveBack(3)}
                  />
                  <TicketCardItem
                    companyLogo={`${props.Azul ? "/azul.png" : "/gol.png"}`}
                    companyName={`${props.Azul ? "Azul" : "Gol"}`}
                    horarioIda="09:00"
                    horarioVolta="16:00"
                    tempoVoo="1h 15m"
                    isActiveBack={activeIndexBack === 4}
                    setActiveBack={() => handleSetActiveBack(4)}
                  />
                  <TicketCardItem
                    companyLogo={`${props.Azul ? "/azul.png" : "/gol.png"}`}
                    companyName={`${props.Azul ? "Azul" : "Gol"}`}
                    horarioIda="07:00"
                    horarioVolta="13:00"
                    tempoVoo="1h 20m"
                    isActiveBack={activeIndexBack === 5}
                    setActiveBack={() => handleSetActiveBack(5)}
                  />
                </div>
              </div>
            )}
          </div>
          {/* price container */}
          <div className="border-l border-gray/25 flex flex-row justify-between lg:justify-normal xl:flex-col gap-[6px] py-3">
            <div className="flex flex-col lg:block px-3">
              <h2 className="text-[13px] text-gray lg:font-medium">
                Preço total final{" "}
                <div className="font-normal text-sm lg:self-end lg:text-right">
                  R$ <span className="text-2xl font-medium">{props.price}</span>
                </div>
              </h2>
              <div>
                <p className="lg:hidden text-[11px] text-purple font-medium">
                  O que este preço inclui?
                </p>
              </div>
            </div>
            <div className="hidden xl:flex justify-between w-full px-3">
              <h2 className="text-[12px] text-[#555] font-medium">1 Adulto</h2>
              <h2 className="text-[12px] text-[#555] font-medium">
                R$ {props.adultoPrice}
              </h2>
            </div>
            <div className="hidden xl:flex justify-between w-full px-3">
              <h2 className="text-[12px] text-[#555] font-medium">
                Impostos, taxas e <br /> encargos
              </h2>
              <h2 className="text-[12px] text-[#555] font-medium">
                R$ {props.impostoPrice}
              </h2>
            </div>
            {props.isTarget && (
              <div className="hidden xl:flex justify-between w-full px-3">
                <h2 className="text-[12px] text-[#555] font-medium">
                  Desconto aplicado
                </h2>
                <h2 className="text-[12px] text-[#555] font-medium">
                  - R$ 196
                </h2>
              </div>
            )}
            <div className="flex items-center gap-3 my-4 cursor-pointer px-3">
              <div
                onClick={() => {
                  setFavorite(!isFavorite);
                }}
                className="flex items-center justify-center hover:bg-black/20 transition duration-300 ease-in-out size-8 border border-purple rounded-full"
              >
                <button>
                  {!isFavorite ? (
                    <IoMdHeartEmpty className="text-purple" />
                  ) : (
                    <IoMdHeart className="text-purple" />
                  )}
                </button>
              </div>
              <button
                onClick={() => {
                  !props.isTarget && setShowPopup(true);
                }}
                className="bg-[#4300d2] hover:bg-[#3000d2] transition duration-300 ease-in-out px-8 py-2 text-bold text-white rounded-full"
              >
                Comprar
              </button>
            </div>
            <div className="hidden xl:block py-2 border-y border-gray/25 px-3">
              <h2 className="text-xs text-gray">
                <span className="text-red-400 font-bold">
                  Passaporte Decolar
                </span>{" "}
                <br />
                Você acumularia <span className="font-bold">90 pontos</span>
              </h2>
            </div>
            {props.isTarget && (
              <h2 className="px-3 hidden xl:inline text-[11px] text-[#888] font-medium uppercase">
                * 55% de desconto no pix
              </h2>
            )}
          </div>
        </div>
        {showPopup && !props.isTarget && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              ref={useClickRefPopup}
              className="flex flex-col justify-center gap-5 bg-white px-7 py-10 rounded-3xl"
            >
              <h3 className="text-sm font-medium text-[#7e7e89] text-center">
                Pagando com PIX, o novo valor é{" "}
                <span className="font-semibold">R$219</span>
              </h3>
              <h2 className="text-2xl font-semibold text-gray text-center">
                Promoção relâmpago:{" "}
                <span className="text-green-400">55%OFF</span>
              </h2>
              <p className="text-sm font-medium text-[#7e7e89] text-center">
                Promoção válida apenas para <br /> pagamentos via PIX
              </p>
              <div className="flex flex-col gap-5">
                <h3 className="text-lg text-gray font-semibold text-right">
                  Preço por passagem
                </h3>
                <div className="flex items-center justify-between">
                  <h3>Valor total</h3>
                  <h3 className="text-2xl font-semibold text-gray/50 line-through">
                    R$ {props.price},00
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <h3>Valor promocional</h3>
                  <h3 className="text-2xl font-semibold text-green-400">
                    R$ 219,00
                  </h3>
                </div>
              </div>
              <h3 className="text-sm text-gray text-center">
                Preço final R$ 219,00
              </h3>
              <div className="flex items-center justify-between self-center">
                <Link href="/">
                  <button className="bg-purple px-9 py-2 rounded-full text-white font-medium">
                    Comprar
                  </button>
                </Link>
              </div>
              <Image
                className="self-center"
                width={80}
                height={0}
                alt="pix"
                src={"/pixx.png"}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default TicketCards;
