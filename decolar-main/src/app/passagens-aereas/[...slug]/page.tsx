/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import TicketCards from "@/app/components/cards/ticket-cards";
import { airportsData } from "@/app/data/aiportsData";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import { IoAlertCircleOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaRegUser } from "react-icons/fa6";
import SplashScreen from "@/app/components/utils/SplashScreen";
import { IoIosArrowUp, IoMdCheckmark } from "react-icons/io";

const TicketPage = ({ params, router }: any) => {
  const [data, setData] = React.useState<any>({});
  const airports = airportsData;
  const [isPrimaryActive, setPrimaryActive] = useState(true);
  const [isSecondaryActive, setSecondaryActive] = useState(false);
  const [isPricesOpen, setPricesOpen] = useState(false);
  let passagensDataString: string = "";
  let ida: any = null;
  let volta: any = null;

  if (typeof window !== "undefined" && localStorage.getItem) {
    passagensDataString = localStorage.getItem("passagensData") || "";

    if (passagensDataString) {
      // Convertendo os dados de string para objeto JavaScript
      const passagensData = JSON.parse(passagensDataString);

      // Atribuindo os valores de ida e volta
      ida = passagensData.ida;
      volta = passagensData.volta;
    }
  }

  const dataOrigem = airports.find(
    (airport) => airport.sigla_cidade === params.slug[0]
  )?.nome;

  const dataDestino = airports.find(
    (airport) => airport.sigla_cidade === params.slug[1]
  )?.nome;

  const ticketOrigem = airports.find(
    (airport) => airport.sigla_cidade === params.slug[0]
  )?.cidade;

  const ticketDestino = airports.find(
    (airport) => airport.sigla_cidade === params.slug[1]
  )?.cidade;

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("Params:", params);
  
        if (params.slug && params.slug.length === 2 && params.slug[0] && params.slug[1]) {
          const resp = await fetch(
            `/api/passagens-aereas/${params.slug[0]}/${params.slug[1]}/`
          );
          const data = await resp.json();
          setData(data);
          console.log("Data:", data);
        } else {
          console.error("Params inválidos:", params.slug);
        
          router.push('/not-found');
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
  
    getData(); 
  
  }, []); 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>
        {isLoading ? (
          <SplashScreen />
        ) : (
          <div>
            <div className="container mx-auto flex items-center justify-center xl:justify-between px-10">
              <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                <div className="flex items-center gap-4 xl:gap-7 self-start mb-0.5">
                  <button className="flex flex-col gap-3 items-center group mt-1">
                    <Image
                      width={19}
                      height={0}
                      alt="bed-icon"
                      src={"/bed.svg"}
                    />
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
                    <div className="text-xs xl:text-sm text-[#666]">
                      Pacotes
                    </div>
                  </button>
                  <button className="flex flex-col gap-3 items-center group mt-1">
                    <Image
                      width={16}
                      height={0}
                      alt="fireicon-icon"
                      src={"/fireicon.svg"}
                    />
                    <div className="text-xs xl:text-sm text-[#666]">
                      Ofertas
                    </div>
                  </button>
                  <button className="flex flex-col gap-3 items-center group mt-1">
                    <Image
                      width={19}
                      height={0}
                      alt="houseicon-icon"
                      src={"/houseicon.svg"}
                    />
                    <div className="text-xs xl:text-sm text-[#666]">
                      Aluguéis
                    </div>
                  </button>
                  <button className="flex flex-col gap-3 items-center group mt-2">
                    <Image
                      width={19}
                      height={0}
                      alt="ticketicon-icon"
                      src={"/ticketicon.svg"}
                    />
                    <div className="text-xs xl:text-sm text-[#666]">
                      Passeios
                    </div>
                  </button>
                  <button className="flex flex-col gap-3 items-center group mt-1.5">
                    <Image
                      width={19}
                      height={0}
                      alt="staricon-icon"
                      src={"/staricon.svg"}
                    />
                    <div className="text-xs xl:text-sm text-[#666]">
                      Escapadas
                    </div>
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
                    <div className="text-xs xl:text-sm text-[#666]">
                      Seguros
                    </div>
                  </button>
                  <button className="flex flex-col gap-3 items-center group mt-2.5">
                    <Image
                      width={19}
                      height={0}
                      alt="vanicon-icon"
                      src={"/vanicon.svg"}
                    />
                    <div className="text-xs xl:text-sm text-[#666]">
                      Transfers
                    </div>
                  </button>
                </div>
              </Swiper>
              <button className="hidden xl:flex items-center gap-4 px-4 py-2 border border-[#666] rounded-full group h-fit">
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
            </div>
            <div className="bg-[#eeeeee]">
              <div className="block xl:hidden w-full h-20 bg-blue p-4">
                <div className="container mx-auto px-10 flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <LuMapPin className="text-xl text-[#a99ac5]" />
                      <div className="text-white text-xs font-medium">
                        {params.slug[0]} | {params.slug[1]}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <LuCalendarDays className="text-xl text-[#a99ac5]" />
                        <div className="text-white text-xs">
                          {ida} | {volta}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaRegUser className="text-[#a99ac5]" />
                        <div className="text-white text-xs font-medium">1</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-2 rounded-full bg-[#f84f45]">
                    <GoSearch className="text-white text-lg" />
                  </div>
                </div>
              </div>
              <div className="container mx-auto px-10 pt-10">
                <div className="flex flex-col xl:flex-row items-start gap-10">
                  <div className="flex flex-col gap-5">
                    <div className="hidden xl:flex flex-col items-center lg:items-start gap-6 bg-blue px-4 py-6 rounded-lg w-fit">
                      <h2 className="text-xl text-white font-medium">
                        Passagens aéreas
                      </h2>
                      <div className="flex items-center gap-4 cursor-pointer">
                        <div
                          className="flex items-center gap-3"
                          onClick={() => {
                            setPrimaryActive(true);
                            setSecondaryActive(false);
                          }}
                        >
                          <div className="flex items-center justify-center size-4 bg-white rounded-full">
                            {isPrimaryActive && (
                              <div
                                className={`size-[10px] bg-purple rounded-full`}
                              ></div>
                            )}
                          </div>
                          <button className="text-sm text-white">
                            Ida e Volta
                          </button>
                        </div>
                        <div
                          className="flex items-center gap-3"
                          onClick={() => {
                            setSecondaryActive(true);
                            setPrimaryActive(false);
                          }}
                        >
                          <div className="flex items-center justify-center size-4 bg-white rounded-full">
                            {isSecondaryActive && (
                              <div className="size-[10px] bg-purple rounded-full"></div>
                            )}
                          </div>
                          <button className="text-sm text-white">Só ida</button>
                        </div>
                      </div>
                      <div className="divide-y-2 divide-[#cccccc]">
                        <div className="h-[60px] px-5 bg-white rounded-t-lg group focus-within:border-pink focus-within:border-2 border-l border-l-[#cccccc]">
                          <div className="absolute ml-[26px] mt-[10px]">
                            <div className="text-[10px] text-[#888888] font-bold uppercase tracking-widest">
                              destino
                            </div>
                          </div>
                          <main className="flex items-center h-full pt-3">
                            <div className="flex items-center gap-3">
                              <div className="text-[#343a3d]">
                                <LuMapPin />
                              </div>
                              <input
                                className="truncate w-full placeholder:italic placeholder:font-normal focus:outline-none selection-bg-[#ade1f5] selection-text-white text-[13px] font-bold font-montserrat"
                                placeholder="Insira sua cidade de destino"
                                type="text"
                                name="destino"
                                id="destino"
                                maxLength={26}
                                autoComplete="off"
                                value={ticketOrigem}
                                disabled
                              />
                            </div>
                          </main>
                        </div>
                        <div className="flex items-center justify-center absolute rotate-90 ml-[180px] mt-[-0.8rem] size-7 bg-white border border-black/20 rounded-sm">
                          <LiaExchangeAltSolid className="#343a3d" />
                        </div>
                        <div className="h-[60px] w-fit px-5 bg-white rounded-b-lg group focus-within:border-pink focus-within:border-2 border-l border-l-[#cccccc]">
                          <div className="absolute ml-[26px] mt-[10px]">
                            <div className="text-[10px] text-[#888888] font-bold uppercase tracking-widest">
                              destino
                            </div>
                          </div>
                          {/* input 2 */}
                          <main className="flex items-center h-full pt-3">
                            <div className="flex items-center gap-3">
                              <div className="text-[#343a3d]">
                                <LuMapPin />
                              </div>
                              <input
                                className="truncate w-full placeholder:italic placeholder:font-normal focus:outline-none selection-bg-[#ade1f5] selection-text-white text-[13px] font-bold font-montserrat"
                                placeholder="Insira sua cidade de destino"
                                type="text"
                                name="destino"
                                id="destino"
                                maxLength={26}
                                autoComplete="off"
                                value={ticketDestino}
                                disabled
                              />
                            </div>
                          </main>
                        </div>
                      </div>
                      <div className="h-[60px] w-fit px-5 bg-white rounded-lg group focus-within:border-pink focus-within:border-2 border-l border-l-[#cccccc]">
                        <div className="absolute ml-[26px] mt-[10px]">
                          <div className="text-[10px] text-[#888888] font-bold uppercase tracking-widest">
                            mês
                          </div>
                        </div>
                        {/* input 2 */}
                        <main className="flex items-center h-full pt-3">
                          <div className="flex items-center gap-3">
                            <div className="text-[#343a3d]">
                              <LuMapPin />
                            </div>
                            <input
                              className="truncate w-full placeholder:italic placeholder:font-normal focus:outline-none selection-bg-[#ade1f5] selection-text-white text-[13px] font-bold font-montserrat"
                              placeholder="Indisponível no momento"
                              type="text"
                              name="destino"
                              id="destino"
                              maxLength={26}
                              autoComplete="off"
                              disabled
                            />
                          </div>
                        </main>
                      </div>
                      <div className="h-[60px] w-fit px-5 bg-white rounded-lg group focus-within:border-pink focus-within:border-2 border-l border-l-[#cccccc]">
                        <div className="absolute ml-[26px] mt-[10px]">
                          <div className="text-[10px] text-[#888888] font-bold uppercase tracking-widest">
                            passageiros e classe
                          </div>
                        </div>
                        {/* input 2 */}
                        <main className="flex items-center h-full pt-3">
                          <div className="flex items-center gap-3">
                            <div className="text-[#343a3d]">
                              <LuMapPin />
                            </div>
                            <input
                              className="truncate w-full placeholder:italic placeholder:font-normal focus:outline-none selection-bg-[#ade1f5] selection-text-white text-[13px] font-bold font-montserrat"
                              placeholder="Indisponível no momento"
                              type="text"
                              name="destino"
                              id="destino"
                              maxLength={26}
                              autoComplete="off"
                              disabled
                            />
                          </div>
                        </main>
                      </div>
                      <a
                        href="/"
                        className="bg-[#fa503f] h-[48px] flex items-center justify-center rounded-full gap-2 text-white font-semibold w-full"
                      >
                        <GoSearch />
                        Buscar
                      </a>
                    </div>
                    <div className="hidden xl:flex flex-col">
                      <div className="flex flex-col gap-3 py-5 border-t border-gray/25">
                        <div className="flex items-center justify-between">
                          <h3 className="text-gray font-medium">Paradas</h3>
                          <IoIosArrowUp className="text-gray text-lg" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center size-5 bg-[#4300d2] border border-gray/25 rounded-md">
                              <IoMdCheckmark className="text-white text-lg" />
                            </div>
                            <span className="text-sm text-gray">
                              Todas as paradas
                            </span>
                          </div>
                          <div className="text-xs text-gray/60 px-2 py-1 bg-white rounded-md border border-purple">
                            308
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-5 bg-white border border-gray/25 rounded-md" />
                            <span className="text-sm text-gray">Direto</span>
                          </div>
                          <div className="text-xs text-gray/60 px-2 py-1 bg-white rounded-md">
                            288
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-5 bg-white border border-gray/25 rounded-md" />
                            <span className="text-sm text-gray">1 Parada</span>
                          </div>
                          <div className="text-xs text-gray/60 px-2 py-1 bg-white rounded-md">
                            200
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 py-5 border-t border-gray/25">
                        <div className="flex items-center justify-between">
                          <h3 className="text-gray font-medium">Bagagem</h3>
                          <IoIosArrowUp className="text-gray text-lg" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center size-5 bg-[#4300d2] border border-gray/25 rounded-md">
                              <IoMdCheckmark className="text-white text-lg" />
                            </div>
                            <span className="text-sm text-gray">
                              Todas as opções
                            </span>
                          </div>
                          <div className="text-xs text-gray/60 px-2 py-1 bg-white rounded-md border border-purple">
                            452
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-5 bg-white border border-gray/25 rounded-md" />
                            <span className="text-sm text-gray">
                              Bagagem de mão
                            </span>
                          </div>
                          <div className="text-xs text-gray/60 px-2 py-1 bg-white rounded-md">
                            308
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="size-5 bg-white border border-gray/25 rounded-md" />
                            <span className="text-sm text-gray">
                              Bagagem para despachar
                            </span>
                          </div>
                          <div className="text-xs text-gray/60 px-2 py-1 bg-white rounded-md">
                            144
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 py-5 border-t border-gray/25">
                        <div className="flex items-center justify-between">
                          <h3 className="text-gray font-medium">Bagagem</h3>
                          <IoIosArrowUp className="text-gray text-lg rotate-180" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 py-5 border-t border-gray/25">
                        <div className="flex items-center justify-between">
                          <h3 className="text-gray font-medium">Horário</h3>
                          <IoIosArrowUp className="text-gray text-lg rotate-180" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 py-5 border-t border-gray/25">
                        <div className="flex items-center justify-between">
                          <h3 className="text-gray font-medium">Duração</h3>
                          <IoIosArrowUp className="text-gray text-lg rotate-180" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="flex flex-col gap-7">
                      <div className="hidden lg:block bg-white rounded-t-lg border border-gray/25">
                        <div className="hidden lg:flex items-center gap-7 mb-6 border-b border-gray/25">
                          <button
                            onClick={() => {
                              setPricesOpen(false);
                            }}
                            className={`px-6 mx-4 py-4 text-sm font-semibold font-montserrat ${
                              !isPricesOpen
                                ? "text-purple border-b-2 border-purple"
                                : "text-gray hover:text-purple border-none transition-all duration-300"
                            }`}
                          >
                            Preços por companhia aérea
                          </button>
                          <button
                            onClick={() => {
                              setPricesOpen(false);
                            }}
                            className={`px-6 mx-4 py-4 text-sm font-semibold font-montserrat text-gray hover:text-purple border-none transition-all duration-300`}
                          >
                            Preço +/- 3 dias
                          </button>
                          <button
                            className={`bg-white px-6 mx-4 py-4 text-sm font-semibold font-montserrat text-gray hover:text-purple border-none transition-all duration-300`}
                          >
                            Tendências de preços
                          </button>
                        </div>
                        <div
                          className={`${
                            !isPricesOpen
                              ? "hidden lg:flex gap-24 px-4 pb-4"
                              : "hidden"
                          }`}
                        >
                          <div className="hidden lg:flex flex-col gap-[42px]">
                            <h3 className="text-sm text-gray font-semibold">
                              Companhias
                            </h3>
                            <span className="text-sm text-gray font-semibold">
                              Direto
                            </span>
                            <span className="text-sm text-gray font-semibold">
                              Com Paradas
                            </span>
                          </div>
                          <div className="hidden lg:flex flex-col gap-5 items-center">
                            <div className="flex items-center gap-2">
                              <Image
                                src={"/azul.png"}
                                width={24}
                                height={0}
                                alt="azul"
                              />
                              <h3 className="text-gray font-medium">Azul</h3>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <div className="flex items-center justify-center w-[24px] h-[20px] bg-[#03a691] rounded-sm">
                                  <span className="text-[12px] text-white font-medium">
                                    7,8
                                  </span>
                                </div>
                                <h3 className="text-[12px] text-[#03a691]">
                                  Muito bom
                                </h3>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-[#03a691]">
                              R$ 271
                            </span>
                            <span className="text-[13px] text-[#777]">
                              R$ 360
                            </span>
                          </div>
                          <div className="flex flex-col gap-5 items-center">
                            <div className="flex items-center gap-2">
                              <Image
                                src={"/gol.png"}
                                width={24}
                                height={0}
                                alt="gol"
                              />
                              <h3 className="text-gray font-medium">Gol</h3>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <div className="flex items-center justify-center w-[24px] h-[20px] bg-[#03a691] rounded-sm">
                                  <span className="text-[12px] text-white">
                                    7,8
                                  </span>
                                </div>
                                <h3 className="text-[12px] text-[#03a691]">
                                  Muito bom
                                </h3>
                              </div>
                            </div>
                            <span className="text-sm text-gray">R$ 271</span>
                            <span className="text-[13px] text-[#777]">
                              R$ 363
                            </span>
                          </div>
                          <div className="flex flex-col gap-5 items-center">
                            <div className="flex items-center gap-2">
                              <Image
                                src={"/latam.png"}
                                width={12}
                                height={0}
                                alt="latam"
                              />
                              <h3 className="text-gray font-medium">LATAM</h3>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <div className="flex items-center justify-center w-[24px] h-[20px] bg-[#03a691] rounded-sm">
                                  <span className="text-[12px] text-white font-medium">
                                    7,8
                                  </span>
                                </div>
                                <h3 className="text-[12px] text-[#03a691]">
                                  Muito bom
                                </h3>
                              </div>
                            </div>
                            <span className="text-sm text-gray">R$ 273</span>
                            <span className="text-[13px] text-[#777]">
                              R$ 361
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden lg:flex items-center gap-2 lg:gap-4">
                        <div className="bg-white text-[11px] lg:text-[12px] text-purple font-semibold flex flex-col items-center justify-center px-4 py-1.5 lg:px-6 lg:py-2 border border-purple rounded-md">
                          Recomendados <br />
                          <span className="font-normal text-purple">
                            A partir de R$ 271
                          </span>
                        </div>
                        <div className="bg-white text-[11px] lg:text-[12px] text-gray font-semibold flex flex-col items-center justify-center px-4 py-1.5 lg:px-6 lg:py-2 border border-gray/25 rounded-md">
                          Voos baratos <br />
                          <span className="font-normal text-gray">
                            A partir de R$ 271
                          </span>
                        </div>
                        <div className="bg-white text-[11px] lg:text-[12px] text-gray font-semibold flex flex-col items-center justify-center px-4 py-1.5 lg:px-6 lg:py-2 border border-gray/25 rounded-md">
                          Voos rápidos <br />
                          <span className="font-normal text-gray">
                            A partir de R$ 271
                          </span>
                        </div>
                      </div>
                      <div className="bg-white flex items-center gap-5 py-5 p-5 border border-[#aed0fa] w-full rounded-lg">
                        <IoAlertCircleOutline className="text-2xl text-[#5fa6fb]" />
                        <span className="text-gray/80 text-[13px] font-medium">
                          Não perca a oportunidade de economizar com nossos
                          descontos ao pagar via PIX.
                        </span>
                      </div>
                      <TicketCards
                        Azul={true}
                        price="209"
                        adultoPrice="315"
                        impostoPrice="135"
                        directionIda={params.slug[0]}
                        cidadeIda={dataOrigem}
                        directionVolta={params.slug[1]}
                        cidadeVolta={dataDestino}
                        dataIda={ida}
                        dataVolta={volta}
                        isTarget={true}
                      />
                      <TicketCards
                        price="534"
                        adultoPrice="380"
                        impostoPrice="154"
                        directionIda={params.slug[0]}
                        cidadeIda={dataOrigem}
                        directionVolta={params.slug[1]}
                        cidadeVolta={dataDestino}
                        dataIda={ida}
                        dataVolta={volta}
                      />
                      <TicketCards
                        Azul={true}
                        price="477"
                        adultoPrice="415"
                        impostoPrice="62"
                        directionIda={params.slug[0]}
                        cidadeIda={dataOrigem}
                        directionVolta={params.slug[1]}
                        cidadeVolta={dataDestino}
                        dataIda={ida}
                        dataVolta={volta}
                      />
                      <TicketCards
                        Azul={true}
                        price="512"
                        adultoPrice="395"
                        impostoPrice="120"
                        directionIda={params.slug[0]}
                        cidadeIda={dataOrigem}
                        directionVolta={params.slug[1]}
                        cidadeVolta={dataDestino}
                        dataIda={ida}
                        dataVolta={volta}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TicketPage;
