import React from "react";

const About = () => {
  return (
    <section className="container mx-auto mb-80 mt-24 px-10">
      <main className="flex flex-col gap-1">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl text-gray font-semibold">
            Agência de viagens
          </h1>
          <h2 className="text-3xl text-gray font-semibold">
            Faça sua jornada com a maior agência de viagens online
          </h2>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray">
              A Decolar quer levar suas viagens a um novo patamar! Somos
              especialistas em turismo e estamos prontos para tornar suas
              experiências únicas e surpreendentes.
            </p>
            <p className="text-sm text-gray">
              Imagine a facilidade de encontrar{" "}
              <a href="/">
                <span className="text-purple hover:text-blue transition font-medium">
                  passagens aéreas
                </span>
              </a>{" "}
              para os destinos mais incríveis do mundo em um só lugar? Como{" "}
              <span className="font-medium">agência de viagem</span>, oferecemos
              uma ampla variedade de opções de voos, garantindo que você possa
              explorar os lugares dos seus sonhos com conforto e conveniência.
            </p>
            <p className="text-sm text-gray">
              Além disso, nossa{" "}
              <span className="font-medium">agência de viagens</span> online
              também oferece uma vasta seleção de{" "}
              <a href="/">
                <span className="text-purple hover:text-blue transition font-medium">
                  hotéis
                </span>
              </a>{" "}
              de qualidade, para que você possa escolher o alojamento perfeito
              para suas necessidades. Seja um luxuoso resort beira-mar, uma
              pitoresca{" "}
              <a href="/">
                <span className="text-purple hover:text-blue transition font-medium">
                  casa de veraneio
                </span>
              </a>{" "}
              ou um charmoso hotel no coração da cidade, temos opções que se
              adequam ao seu estilo e orçamento.
            </p>
            <p className="text-sm text-gray">
              E não paramos por aí! Para tornar sua experiência ainda mais
              completa, oferecemos serviços de{" "}
              <a href="/">
                <span className="text-purple hover:text-blue transition font-medium">
                  aluguel de carros
                </span>
              </a>
              . Com a Decolar, você pode explorar seu destino preferido com
              total liberdade e comodidade, garantindo que você não perca nenhum
              momento maravilhoso que essa viagem tem a oferecer.
            </p>
            <p className="text-sm text-gray">
              Queremos que você descubra os melhores{" "}
              <a href="/">
                <span className="text-purple hover:text-blue transition font-medium">
                  lugares para viajar
                </span>
              </a>{" "}
              e vivenciar momentos extraordinários. Em nossa{" "}
              <span className="font-medium">agência de viagens</span>, você
              encontrará uma equipe apaixonada e experiente, pronta para ajudar
              a planejar o itinerário dos seus sonhos. Quer seja uma praia
              paradisíaca, uma cidade histórica ou uma aventura na natureza,
              temos os{" "}
              <a href="/">
                <span className="text-purple hover:text-blue transition font-medium">
                  pacotes de viagem
                </span>
              </a>{" "}
              perfeitos para você.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl text-gray font-semibold">
              Sua viagem mais fácil do começo ao fim
            </h2>
            <p className="text-sm text-gray">
              Na Decolar, nossa missão como{" "}
              <span className="text-medium">agência de viagem</span> é oferecer
              uma experiência excepcional e personalizada. Sabemos que cada
              viajante é único, e é por isso que nos dedicamos a entender suas
              preferências e encontrar{" "}
              <a href="/">
                <span className="text-purple hover:text-blue transition font-medium">
                  atrações turísticas e passeios
                </span>
              </a>{" "}
              para atender às suas expectativas.
            </p>
            <p className="text-sm text-gray">
              Então, embarque nessa jornada conosco! Permita que a Decolar seja
              sua <span className="text-medium">agência de viagens</span> de
              confiança, levando você a lugares incríveis e transformando suas
              viagens em memórias inesquecíveis. Descubra um mundo de
              possibilidades, aproveite nossas ofertas exclusivas e deixe-nos
              cuidar de todos os detalhes. Sua próxima aventura está apenas a um
              clique de distância!
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default About;
