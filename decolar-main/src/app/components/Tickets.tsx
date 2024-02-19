/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegCircle } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { airportsData } from "@/app/data/aiportsData";
import { MdOutlineLocationCity } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import useClickOutside from "../hooks/useClickOutisde";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { GoSearch } from "react-icons/go";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper } from "swiper/react";
import "swiper/css";

const createUserFormSchema = z.object({
  origem: z.string().nonempty("Por favor, insira uma origem"),
  destino: z.string().nonempty("Por favor, insira um destino"),
});

type createUserFormData = z.infer<typeof createUserFormSchema>;

const Tickets: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema, {}),
  });

  const router = useRouter();

  const [valueOrigin, setValueOrigin] = useState<string>("");
  const [valueDestination, setValueDestination] = useState<string>("");
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isValidationOpen, setIsValidationOpen] = useState(false);
  const [isFirstDataOpen, setIsFirstDataOpen] = useState(false);
  const [isSecondDataOpen, setIsSecondDataOpen] = useState(false);
  const [isPrimaryActive, setPrimaryActive] = useState(true);
  const [isSecondaryActive, setSecondaryActive] = useState(false);

  const useClickInsideFirstDate = useRef<HTMLDivElement>(null);
  const useClickInsideSecondDate = useRef<HTMLDivElement>(null);
  const useClickInsideRef = useRef<HTMLDivElement>(null);

  useClickOutside(useClickInsideSecondDate, () => {
    setIsSecondDataOpen(false);
  });

  useClickOutside(useClickInsideFirstDate, () => {
    setIsFirstDataOpen(false);
  });

  useClickOutside(useClickInsideRef, () => {
    setIsOriginOpen(false);
    setIsDestinationOpen(false);
    setIsValidationOpen(false);
  });

  const onSubmit = () => {
    const isOriginValid = valueOrigin !== "";
    const isDestinationValid = valueDestination !== "";
    const isFirstDateSelected = selectedFirstDate !== undefined;
    const isSecondDateSelected =
      selectedSecondDate !== undefined || selectedSecondDate === null;
    selectedSecondDate && formatDate(selectedSecondDate);

    if (isOriginValid && isDestinationValid) {
     

      if (isOriginValid && isDestinationValid && isFirstDateSelected) {
     
        const firstDateFormat = formatDate(selectedFirstDate);
        const secondDateFormat = selectedSecondDate
          ? formatDate(selectedSecondDate)
          : null; 
        const sigla_origem = airportsData.find(
          (airport) => airport.cidade === valueOrigin
        )?.sigla_cidade;
        const sigla_destino = airportsData.find(
          (airport) => airport.cidade === valueDestination
        )?.sigla_cidade;
        const valueOriginCheck =
          valueOrigin !== valueDestination ? valueOrigin : null;
        const valueDestinationCheck =
          valueDestination !== valueOrigin ? valueDestination : null;

        const dataFormat: any = {
          origem: valueOriginCheck,
          destino: valueDestinationCheck,
          ida: firstDateFormat,
          sigla_origem: sigla_origem,
          sigla_destino: sigla_destino,
        };

        if (typeof window !== "undefined" && isSecondDateSelected) {
         
          if (secondDateFormat) {
            dataFormat.volta = secondDateFormat;
            localStorage.setItem("passagensData", JSON.stringify(dataFormat));
          } else {
            localStorage.setItem(
              "passagensData",
              JSON.stringify({ ...dataFormat, volta: false })
            );
          }
        } else {
          console.error(
            "localStorage is not available or second date is not selected."
          );
        }

        console.log(dataFormat);
        localStorage.setItem("passagensData", JSON.stringify(dataFormat));

        router.push(`/passagens-aereas/${sigla_origem}/${sigla_destino}`);
      } else {
        console.log(
          "Erro: Por favor, preencha os campos de origem, destino e selecione a primeira data."
        );
      }
    }
  };

  const onSearch = (searchTerm: any, setValueFunction: Function) => {
    setValueFunction(searchTerm);
    setIsOriginOpen(true);
    setIsDestinationOpen(true);
  };

  const onSearchOrigin = (searchTerm: any) => {
    onSearch(searchTerm, setValueOrigin);
  };

  const onSearchDestination = (searchTerm: any) => {
    onSearch(searchTerm, setValueDestination);
  };

  const clear = (setValueFunction: (value: string) => void) => {
    setValueFunction("");
    setSelectedFirstDate(undefined);
  };

  const swapValues = () => {
    const temp = valueOrigin;
    setValueOrigin(valueDestination);
    setValueDestination(temp);
  };

  const removeAccents = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "");
  };

  const searchWithoutAccents = (term: string, array: string[]): string[] => {
    const termWithoutAccents = removeAccents(term.toLowerCase());
    return array.filter((item) =>
      removeAccents(item.toLowerCase()).includes(termWithoutAccents)
    );
  };

  const renderAirports = (searchTerm: string, onClickFunction: Function) => {
    const filteredAirports = searchWithoutAccents(
      searchTerm,
      airportsData.map((airport) => airport.cidade)
    );

    return filteredAirports.slice(0, 10).map((cityName) => {
      const searchTermRegex = new RegExp(searchTerm, "gi");
      const parts = cityName.split(searchTermRegex);

      return (
        <div
          className="cursor-pointer pb-[13px] text-[#6e6e6e] hover:text-[#555] transition z-20"
          onClick={() => {
            onClickFunction(cityName);
            setIsOriginOpen(false);
            setIsDestinationOpen(false);
          }}
          key={cityName}
        >
          {parts.map((part, index) => (
            <span key={index}>
              {part}
              {index !== parts.length - 1 && (
                <span className="text-purple capitalize">{searchTerm}</span>
              )}
            </span>
          ))}
        </div>
      );
    });
  };

  const [selectedFirstDate, setSelectedFirstDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedSecondDate, setSelectedSecondDate] = useState<
    Date | undefined
  >(undefined);
  const [maxFirstDate, setMaxFirstDate] = useState<Date | undefined>(undefined);
  const [minSecondDate, setMinSecondDate] = useState<Date | undefined>(
    undefined
  );

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const defaultMonth = new Date(2024, 1);

  const handleFirstDateSelection = (date: Date | undefined) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (
      date &&
      selectedSecondDate &&
      date.getTime() >= selectedSecondDate.getTime()
    ) {
      console.log("A data de ida não pode ser posterior à data de retorno");
    } else if (date && date.getTime() < today.getTime()) {
      console.log("A data de ida não pode ser anterior à data de hoje");
    } else {
      setSelectedFirstDate(date);
    }
  };

  const handleSecondDateSelection = (date: Date | undefined) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (
      selectedFirstDate &&
      date &&
      (date.getTime() < selectedFirstDate.getTime() ||
        date.getTime() < today.getTime())
    ) {
      console.log(
        "A data de retorno não pode ser anterior à data de partida ou à data de hoje"
      );
    } else {
      setSelectedSecondDate(date);
    }
  };

  useEffect(() => {
    if (selectedFirstDate) {
      const minDate = new Date(selectedFirstDate);
      minDate.setDate(minDate.getDate() + 365);
      setMinSecondDate(minDate);
    }
  }, [selectedFirstDate]);

  useEffect(() => {
    if (selectedSecondDate) {
      const maxDate = new Date(selectedSecondDate);

      maxDate.setDate(maxDate.getDate() - 365);

      setMaxFirstDate(maxDate);
    }
  }, [selectedSecondDate]);

  return (
    <>
      <div>
        <nav className="flex items-center justify-center xl:justify-between container mx-auto px-10 mb-0.5">
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <div className="flex items-center gap-4 xl:gap-7 self-start mt-7">
              <button className="flex flex-col gap-3 items-center group mt-1">
                <Image width={19} height={0} alt="bed-icon" src={"/bed.svg"} />
                <div className="text-xs xl:text-sm text-[#666]">
                  Hospedagens
                </div>
              </button>
              <button>
                <div className="flex flex-col gap-1 items-center">
                  <div className="flex items-center justify-center bg-[#270570] size-9 rounded-full">
                    <Image
                      width={22}
                      height={0}
                      alt="plane-icon"
                      src={"/plane.svg"}
                    />
                  </div>
                  <div className="text-xs xl:text-sm text-[#270570] font-semibold border-b-2 border-[#270570] pb-1">
                    Passagens
                  </div>
                </div>
              </button>
              <button className="flex flex-col gap-3 items-center group mt-1">
                <Image
                  width={19}
                  height={0}
                  alt="baggagemnu-icon"
                  src={"/baggagemenu.svg"}
                />
                <div className="text-xs xl:text-sm text-[#666]">Pacotes</div>
              </button>
              <button className="flex flex-col gap-3 items-center group mt-1">
                <Image
                  width={16}
                  height={0}
                  alt="fireicon-icon"
                  src={"/fireicon.svg"}
                />
                <div className="text-xs xl:text-sm text-[#666]">Ofertas</div>
              </button>
              <button className="flex flex-col gap-3 items-center group mt-1">
                <Image
                  width={19}
                  height={0}
                  alt="houseicon-icon"
                  src={"/houseicon.svg"}
                />
                <div className="text-xs xl:text-sm text-[#666]">Aluguéis</div>
              </button>
              <button className="flex flex-col gap-3 items-center group mt-2">
                <Image
                  width={19}
                  height={0}
                  alt="ticketicon-icon"
                  src={"/ticketicon.svg"}
                />
                <div className="text-xs xl:text-sm text-[#666]">Passeios</div>
              </button>
              <button className="flex flex-col gap-3 items-center group mt-1.5">
                <Image
                  width={19}
                  height={0}
                  alt="staricon-icon"
                  src={"/staricon.svg"}
                />
                <div className="text-xs xl:text-sm text-[#666]">Escapadas</div>
              </button>
              <button className="flex flex-col gap-3 items-center group mt-2.5">
                <Image
                  width={19}
                  height={0}
                  alt="caricon-icon"
                  src={"/caricon.svg"}
                />
                <div className="text-xs xl:text-sm text-[#666]">Carros</div>
              </button>
              <button className="flex flex-col gap-3 items-center group mt-1.5">
                <Image
                  width={19}
                  height={0}
                  alt="disneyicon-icon"
                  src={"/disneyicon.svg"}
                />
                <div className="text-xs xl:text-sm text-[#666]">Disney</div>
              </button>
              <button className="flex flex-col gap-3 items-center group mt-1">
                <Image
                  width={19}
                  height={0}
                  alt="healthicon-icon"
                  src={"/healthicon.svg"}
                />
                <div className="text-xs xl:text-sm text-[#666]">Seguros</div>
              </button>
              <button className="flex flex-col gap-3 items-center group mt-2.5">
                <Image
                  width={19}
                  height={0}
                  alt="vanicon-icon"
                  src={"/vanicon.svg"}
                />
                <div className="text-xs xl:text-sm text-[#666]">Transfers</div>
              </button>
            </div>
          </Swiper>
          <button className="hidden xl:flex items-center gap-4 px-4 py-2 border border-[#666] rounded-full group">
            <Image
              width={22}
              height={0}
              alt="card-icon"
              src={"/cardicon.svg"}
            />
            <div className="text-sm text-[#666] group-hover:text-[#4300d2]">
              Cartão Decolar Santander
            </div>
          </button>
        </nav>
        <div className="bg-[#a780ff] px-10">
          <div className="container mx-auto flex items-center justify-center py-4 px-10">
            <div className="bg-blue px-7 xl:px-14 py-8 rounded-lg">
              <div className="flex xl:flex-row flex-col md:flex items-center gap-8 xl:gap-6 mb-3 md:mb-7">
                <h1 className="self-start text-lg text-white font-medium">
                  Passagens aéreas
                </h1>
                <div className="sm:self-center md:self-start flex items-center gap-6 xl:gap-2">
                  <button
                    onClick={() => {
                      setPrimaryActive(true);
                      setSecondaryActive(false);
                      setIsFirstDataOpen(false);
                    }}
                    className={`hidden xl:block text-sm xl:border ${
                      isPrimaryActive
                        ? "xl:bg-white text-white xl:text-purple"
                        : "bg-transparent text-white border-white"
                    } font-semibold rounded-full w-fit text-xs xl:text-sm h-8 px-4 xl:h-[33px] xl:px-5 hover:bg-white hover:text-purple transition ease-out duration-150`}
                  >
                    Ida e Volta
                  </button>
                  <button
                    onClick={() => {
                      setPrimaryActive(true);
                      setSecondaryActive(false);
                    }}
                    className={`md:flex xl:hidden lg:flex hidden items-center gap-2 text-[12px] font-semibold text-white`}
                  >
                    <div
                      className={`flex items-center justify-center border bg-white size-4 rounded-full ${
                        isPrimaryActive && `border-purple`
                      }`}
                    >
                      {isPrimaryActive && (
                        <div className="bg-purple size-2.5 rounded-full"></div>
                      )}
                    </div>
                    Ida e Volta
                  </button>
                  <div className="md:hidden flex items-center justify-between w-full gap-0.5">
                    <button
                      onClick={() => {
                        setPrimaryActive(true);
                        setSecondaryActive(false);
                      }}
                      className={`text-[12px] sm:text-[13px] text-white md:hidden flex px-[19px] sm:px-14 pb-3 ${
                        isPrimaryActive
                          ? "border-b-2 border-white font-semibold"
                          : "border-b border-purple"
                      }`}
                    >
                      Ida e Volta
                    </button>
                    <button
                      onClick={() => {
                        setSecondaryActive(true);
                        setPrimaryActive(false);
                      }}
                      className={`text-[12px] sm:text-[13px] text-white md:hidden flex px-[19px] sm:px-14 pb-3 ${
                        isSecondaryActive
                          ? "border-b-2 border-white font-semibold"
                          : "border-b border-[#4800ce]"
                      }`}
                    >
                      Só ida
                    </button>
                    <button
                      className={`text-[12px] sm:text-[13px] text-white md:hidden flex px-[19px] sm:px-14 pb-3 border-b border-[#4800ce]`}
                    >
                      Multidestino
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setSecondaryActive(true);
                      setPrimaryActive(false);
                      setIsSecondDataOpen(false);
                      setIsFirstDataOpen(false);
                    }}
                    className={`hidden xl:block text-sm xl:border ${
                      isSecondaryActive
                        ? "xl:bg-white text-white xl:text-[#4800ce]"
                        : "bg-transparent text-white border-white"
                    } font-semibold rounded-full w-fit text-xs xl:text-sm h-8 px-4 xl:h-[33px] xl:px-5 hover:bg-white hover:text-purple transition ease-out duration-150`}
                  >
                    Só Ida
                  </button>
                  <button
                    onClick={() => {
                      setSecondaryActive(true);
                      setPrimaryActive(false);
                    }}
                    className={`md:flex xl:hidden lg:flex hidden items-center gap-2 text-[12px] font-semibold text-white`}
                  >
                    <div
                      className={`flex items-center justify-center border bg-white size-4 rounded-full ${
                        isSecondaryActive && `border-purple`
                      }`}
                    >
                      {isSecondaryActive && (
                        <div className="bg-purple size-2.5 rounded-full"></div>
                      )}
                    </div>
                    Só ida
                  </button>
                  <button
                    className="hidden xl:block text-sm xl:border
                bg-transparent text-white border-white
                 font-medium rounded-full w-fit xl:text-sm h-8 px-4 xl:h-[33px] xl:px-5 hover:bg-white hover:text-purple transition ease-out duration-150"
                  >
                    Multidestino
                  </button>
                  <button
                    className={`md:flex xl:hidden lg:flex hidden items-center gap-3 text-[12px] font-semibold text-white`}
                  >
                    <div
                      className={`xl:hidden flex items-center justify-center border bg-white size-4 rounded-full`}
                    ></div>
                    Multidestino
                  </button>
                  <button
                    className={`hidden xl:block border border-white text-white
           font-medium rounded-full w-fit text-xs xl:text-sm h-8 px-4 xl:h-[33px] xl:px-5`}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        width={20}
                        height={0}
                        alt="airplane-icon"
                        src={"/plane.svg"}
                      />
                      Voo +
                      <Image
                        width={20}
                        height={0}
                        alt="bed-icon"
                        src={"/bedicon.svg"}
                      />
                      Hospedagem
                    </div>
                  </button>
                </div>
              </div>
              <form
                className="flex xl:flex-row flex-col items-center gap-5 xl:gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col lg:flex-row items-center">
                    <div className="h-[60px] w-fit px-5 bg-white rounded-t-lg lg:rounded-t-none lg:rounded-tl-lg lg:rounded-bl-lg group lg:focus-within:border-pink lg:focus-within:border-2">
                      <div className="absolute ml-[26px] mt-[10px]">
                        <div className="text-[10px] text-[#888888] font-bold uppercase tracking-widest">
                          origem
                        </div>
                      </div>
                      {/* input 1 */}
                      <main className="flex items-center h-full pt-3">
                        <div className="flex items-center gap-3">
                          <figure className="text-[#343a3d]">
                            <FaRegCircle className="text-xs xl:text-base" />
                          </figure>
                          <input
                            {...register("origem")}
                            className="truncate placeholder:italic placeholder:font-normal focus:outline-none selection:bg-[#ade1f5] selection:text-white w-[230px] xs:w-[400px] sm:w-[450px] md:w-[580px] lg:w-72 xl:w-32 text-xs xl:text-[13px] font-bold font-montserrat"
                            placeholder="Insira sua cidade de origem"
                            type="text"
                            name="origem"
                            id="origem"
                            maxLength={26}
                            value={valueOrigin}
                            onChange={(e) => setValueOrigin(e.target.value)}
                            onFocus={() => clear(setValueOrigin)}
                            onInput={() => setIsOriginOpen(true)}
                            autoComplete="off"
                          />
                          {errors.origem && (
                            <div
                              className={`${
                                isValidationOpen
                                  ? "absolute flex items-center justify-center mb-[65px] ml-[-0.5rem] bg-[#a43424] rounded-[4px] px-3 py-2"
                                  : "hidden"
                              }`}
                            >
                              <span className="text-[#fcf8f7] text-[12px] ">
                                {errors.origem.message}
                              </span>
                            </div>
                          )}
                        </div>
                      </main>
                    </div>
                    <div
                      onClick={swapValues}
                      className="flex items-center justify-center absolute ml-[230px] sm:ml-[430px] md:ml-[555px] lg:ml-[339px] xl:ml-[180px] mt-11 lg:mt-0 size-7 bg-white border border-black/20 rounded-sm"
                    >
                      <LiaExchangeAltSolid
                        className="text-xs xl:text-base rotate-90 lg:rotate-0"
                        color="#343a3d"
                      />
                    </div>
                    <div className="h-[60px] w-fit px-5 bg-white rounded-b-lg lg:rounded-b-none lg:rounded-tr-lg lg:rounded-br-lg group lg:focus-within:border-pink lg:focus-within:border-2 border-l border-l-[#cccccc]">
                      <div className="absolute ml-[26px] mt-[10px]">
                        <div className="text-[10px] text-[#888888] font-bold uppercase tracking-widest">
                          destino
                        </div>
                      </div>
                      {/* input 2 */}
                      <main className="flex items-center h-full pt-3">
                        <div className="flex items-center gap-3">
                          <div className="text-[#343a3d]">
                            <LuMapPin className="text-xs xl:text-base" />
                          </div>
                          <input
                            {...register("destino")}
                            className="truncate placeholder:italic placeholder:font-normal focus:outline-none selection:bg-[#ade1f5] selection:text-white w-[230px] sm:w-[450px] md:w-[580px] z-10 lg:w-72 xl:w-32 text-xs xl:text-[13px] font-bold font-montserrat"
                            placeholder="Insira sua cidade de destino"
                            type="text"
                            name="destino"
                            id="destino"
                            maxLength={26}
                            value={valueDestination}
                            onChange={(e) =>
                              setValueDestination(e.target.value)
                            }
                            onFocus={() => clear(setValueDestination)}
                            onInput={() => setIsDestinationOpen(true)}
                            autoComplete="off"
                          />
                          {errors.destino && (
                            <div
                              className={`${
                                isValidationOpen
                                  ? "absolute flex items-center justify-center mb-[65px] ml-[-0.5rem] bg-[#a43424] rounded-[4px] px-3 py-2"
                                  : "hidden"
                              }`}
                            >
                              <span className="text-[#fcf8f7] text-[12px] ">
                                {errors.destino.message}
                              </span>
                            </div>
                          )}
                        </div>
                      </main>
                    </div>
                  </div>
                </div>
                <div className="md:flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="h-[60px] w-fit px-5 bg-white rounded-lg group focus-within:border-pink focus-within:border-2">
                      <div className="absolute ml-[26px] mt-[10px]">
                        <div className="text-[10px] text-[#888888] font-bold uppercase tracking-widest">
                          ida
                        </div>
                      </div>
                      {/* idaaaaaaaaaaaaaaaaaaaa*/}
                      <main className="flex items-center h-full pt-3">
                        <div className="flex items-center gap-3">
                          <figure className="text-[#343a3d]">
                            <LuCalendarDays className="text-xs xl:text-base" />
                          </figure>
                          <div ref={useClickInsideRef}>
                            <input
                              className="truncate placeholder:italic placeholder:font-normal focus:outline-none selection-bg-[#ade1f5] selection-text-white w-[78px] sm:w-[187px] md:w-[252px] lg:w-[282px] xl:w-20 text-xs xl:text-[13px] font-bold font-montserrat"
                              placeholder="Qualquer data"
                              type="text"
                              readOnly
                              onClick={() => {
                                setIsFirstDataOpen(true);
                                setIsSecondDataOpen(false);
                              }}
                              value={
                                selectedFirstDate &&
                                formatDate(selectedFirstDate)
                              }
                            />
                          </div>
                        </div>
                      </main>
                      <div
                        ref={useClickInsideFirstDate}
                        className={`${
                          isFirstDataOpen ? "absolute" : "hidden"
                        }  md:mb-0 -mt-1.5 md:-ml-8 z-10`}
                      >
                        <Calendar
                          onSelect={(date) => {
                            handleFirstDateSelection(date);
                          }}
                          selected={selectedFirstDate}
                          defaultMonth={defaultMonth}
                          fromMonth={defaultMonth}
                          toDate={new Date(2025, 12, 25)}
                          mode="single"
                          required
                          locale={ptBR}
                        />
                      </div>
                    </div>
                    <div className="h-[60px] w-fit px-5 bg-white rounded-lg group focus-within:border-pink focus-within:border-2">
                      <div className="absolute ml-[26px] mt-[10px]">
                        <div className="text-[10px] text-[#888888] font-bold uppercase tracking-widest">
                          volta
                        </div>
                      </div>
                      {/* voltaaaaaaaaaaaaaaa*/}
                      <main className="flex items-center h-full pt-3">
                        <div className="flex items-center gap-3">
                          <figure className="text-[#343a3d]">
                            <LuCalendarDays className="text-xs xl:text-base" />
                          </figure>
                          <div ref={useClickInsideRef}>
                            <input
                              className="truncate placeholder:italic placeholder:font-normal focus:outline-none selection-bg-[#ade1f5] selection-text-white w-[78px] sm:w-[187px] md:w-[252px] lg:w-[282px] xl:w-20 text-xs xl:text-[13px] font-bold font-montserrat"
                              placeholder="Qualquer data"
                              type="text"
                              readOnly
                              onClick={() => {
                                {
                                  !isSecondaryActive &&
                                    setIsSecondDataOpen(true);
                                }
                                setIsFirstDataOpen(false);
                              }}
                              value={
                                !isSecondaryActive
                                  ? selectedSecondDate &&
                                    formatDate(selectedSecondDate)
                                  : ""
                              }
                            />
                          </div>
                        </div>
                      </main>
                      <div
                        ref={useClickInsideSecondDate}
                        className={`${
                          isSecondDataOpen ? "absolute" : "hidden"
                        } -ml-52 -mt-1.5 md:mb-0 md:-ml-8 z-10`}
                      >
                        <Calendar
                          onSelect={(date) => {
                            handleSecondDateSelection(date);
                          }}
                          selected={selectedSecondDate}
                          defaultMonth={defaultMonth}
                          fromMonth={defaultMonth}
                          toDate={minSecondDate}
                          mode="single"
                          required
                          locale={ptBR}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="sm:self-center md:self-end ml-1"
                  ref={useClickInsideRef}
                >
                  <button
                    className="bg-[#fa503f] text-xs sm:text-sm lg:w-28 h-9 w-[298px] sm:w-[512px] md:w-32 sm:h-12 flex items-center justify-center rounded-full gap-2 text-white font-medium sm:font-semibold sm:mt-3 xl:mt-0"
                    onClick={() => setIsValidationOpen(true)}
                    type="submit"
                  >
                    <GoSearch className="text-sm sm:text-base" />
                    Buscar
                  </button>
                </div>
              </form>
              <article
                ref={useClickInsideRef}
                className={`${
                  valueOrigin &&
                  isOriginOpen &&
                  `bg-white w-fit px-10 py-3 shadow-md z-50 absolute -ml-14 -mt-[190px] md:-mt-52 lg:-mt-[155px] xl:mt-1`
                }`}
              >
                {valueOrigin && valueOrigin.length >= 3 && isOriginOpen && (
                  <>
                    {renderAirports(valueOrigin, onSearchOrigin).length > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <MdOutlineLocationCity className="text-lg text-[#777]" />
                        <h2 className="text-xs font-bold uppercase text-[#666] tracking-widest">
                          cidades
                        </h2>
                      </div>
                    )}
                    {renderAirports(valueOrigin, onSearchOrigin)}
                  </>
                )}

                {valueOrigin &&
                  valueOrigin.length >= 3 &&
                  isOriginOpen &&
                  renderAirports(valueOrigin, onSearchOrigin).length === 0 && (
                    <div className="block text-gray font-semibold">
                      <div className="flex items-center gap-2">
                        <IoSearchSharp className="text-gray text-xl" />
                        Não foram encontrados resultados que contenham{" "}
                        <span className="font-black">{valueOrigin}</span>
                      </div>
                    </div>
                  )}

                {valueOrigin && valueOrigin.length < 3 && isOriginOpen && (
                  <div className="block text-gray font-semibold">
                    Digite ao menos 3 letras e aguarde os resultados
                  </div>
                )}
              </article>
              <article
                ref={useClickInsideRef}
                className={`${
                  valueDestination &&
                  isDestinationOpen &&
                  `bg-white w-fit px-10 py-3 shadow-md z-50 -ml-14 -mt-[140px] sm:-mt-[150px] lg:ml-[355px] xl:mt-1 xl:ml-[200px] absolute`
                }`}
              >
                {valueDestination &&
                  valueDestination.length >= 3 &&
                  isDestinationOpen && (
                    <>
                      {renderAirports(valueDestination, onSearchDestination)
                        .length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          <MdOutlineLocationCity className="text-lg text-[#777]" />
                          <h2 className="text-xs font-bold uppercase text-[#666] tracking-widest">
                            cidades
                          </h2>
                        </div>
                      )}
                      {renderAirports(valueDestination, onSearchDestination)}
                    </>
                  )}

                {valueDestination &&
                  valueDestination.length >= 3 &&
                  isDestinationOpen &&
                  renderAirports(valueDestination, onSearchDestination)
                    .length === 0 && (
                    <div className="block text-gray font-semibold">
                      <div className="flex items-center gap-2">
                        <IoSearchSharp className="text-gray text-xl" />
                        Não foram encontrados resultados que contenham{" "}
                        <span className="font-black">{valueDestination}</span>
                      </div>
                    </div>
                  )}

                {valueDestination &&
                  valueDestination.length < 3 &&
                  isDestinationOpen && (
                    <div className="block text-gray font-semibold">
                      Digite ao menos 3 letras e aguarde os resultados
                    </div>
                  )}
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tickets;
