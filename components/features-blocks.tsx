import { AiOutlineWhatsApp } from "react-icons/ai";
import { MdOutlineDevices } from "react-icons/md";
import { BsQrCodeScan } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsCalendarCheck } from "react-icons/bs";

interface Feature {
  title: string;
  description: string;
  icon: any;
}

const exploreFeatures: Feature[] = [
  {
    title: "Agendamento Intuitivo",
    description:
      "Permita que seus clientes agendem compromissos facilmente através da nossa interface amigável.",
    icon: <BsCalendarCheck  size={22}/>, // Substitua com a informação real do ícone, como um nome de classe ou URL.
  },
  {
    title: "Disponibilidade em Tempo Real",
    description:
      "Mantenha sua agenda sempre atualizada, para que os clientes possam agendar no horário que desejarem.",
    icon: (
      <svg
        className="w-16 h-16"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fillRule="evenodd">
          <rect
            className="fill-current text-blue-600"
            width="64"
            height="64"
            rx="32"
          />
          <g strokeWidth="2">
            <path
              className="stroke-current text-blue-300"
              d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
            />
            <path
              className="stroke-current text-white"
              d="M20.571 37.714h5.715L36.57 26.286h8"
            />
            <path
              className="stroke-current text-blue-300"
              strokeLinecap="square"
              d="M41.143 34.286l3.428 3.428-3.428 3.429"
            />
            <path
              className="stroke-current text-white"
              strokeLinecap="square"
              d="M41.143 29.714l3.428-3.428-3.428-3.429"
            />
          </g>
          s
        </g>
      </svg>
    ),
  },
  {
    title: "Lembretes via Whatsapp",
    description:
      "Reduza as faltas e melhore a experiência com lembretes automáticos de agendamento via whatsapp para seus clientes.",
    icon: <AiOutlineWhatsApp size={24} />,
  },
  {
    title: "Compartilhe QR-Code",
    description:
      "Compartilhe facilmente seu qr-code exclusivo para agendamento de compromissos com seus clientes",
    icon: <BsQrCodeScan size={22} />, // Substitua com a informação real do ícone para compartilhamento de códigos QR.
  },
  {
    title: "Multiplataforma",
    description:
      "Obtenha a flexibilidade de acessar e gerenciar seu negócio de qualquer lugar e em qualquer dispositivo.",
    icon: <MdOutlineDevices size={22} />,
  },
  {
    title: "E muito mais...",
    description: "Novos recursos estão chegando...",
    icon: <FiMoreHorizontal size={22} />,
  },
];

// You can access each feature using index like exploreFeatures[0], exploreFeatures[1], and so on.

export default function FeaturesBlocks() {
  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 pt-0 md:py-20">
          {/* Section header */}
          <div
            className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
            data-aos="zoom-y-out"
            data-aos-delay="100"
          >
            {/* <h2 className="h2 mb-4">Explore the solutions</h2> */}
            <h2 className="h2 mb-4">Explore Nossos Recursos</h2>
            {/* <p className="text-xl text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.</p> */}
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {/* 1st item */}

            {exploreFeatures.map((feat, i) => {
              return (
                <div
                  key={i}
                  data-aos="zoom-y-out"
                  data-aos-delay="100"
                  className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl"
                >
                  <div className="fill-current mb-2 bg-blue-600 text-white rounded-full h-14 w-14 flex items-center justify-center">{feat.icon}</div>
                  {/* <svg
                    className="w-16 h-16 p-1 -mt-1 mb-2"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect
                        className="fill-current text-blue-600"
                        width="64"
                        height="64"
                        rx="32"
                      />
                      <g strokeWidth="2">
                        <path
                          className="stroke-current text-blue-300"
                          d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
                        />
                        <path
                          className="stroke-current text-white"
                          d="M20.571 37.714h5.715L36.57 26.286h8"
                        />
                        <path
                          className="stroke-current text-blue-300"
                          strokeLinecap="square"
                          d="M41.143 34.286l3.428 3.428-3.428 3.429"
                        />
                        <path
                          className="stroke-current text-white"
                          strokeLinecap="square"
                          d="M41.143 29.714l3.428-3.428-3.428-3.429"
                        />
                      </g>
                      s
                    </g>
                  </svg> */}
                  <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-gray-600 text-center">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
