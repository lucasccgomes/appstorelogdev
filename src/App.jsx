import Navbar from "./components/navbar/Navbar";
import './index.css';
import './animations/animations.css';
import Carousel from "./components/carousel/Carousel";

export default function App() {
  const carouselItems = [
    {
      imageSrc: 'https://play-lh.googleusercontent.com/oaUl3dP7zeUz4p9Ex6CWL7wPXGL5MtDns516eFKnRPEw-y4xvyejgDoosNlJXgaPtnqW9bECcg=w1296-h2160-rw',
      title: 'Apps para aproveitar com as crianças.',
      year: '2024',
      description: 'Viajar com crianças nem sempre é fácil, sobretudo quando você precisa lidar com itinerários, horários de sonecas e birras. Mas com essas dicas de apps e dispositivos pensados para os pequenos, as aventuras em família podem ser mais tranquilas e até mais enriquecedoras.',
      link: '#',
    },
    {
      imageSrc: 'https://play-lh.googleusercontent.com/Eb0kZoXAdIsl94nSyUZalonRHjEnkGS2fOCDQZjwpFxCeEi3sasgFrRJ0h8gIA098iFkzeC9WsyA=w1296-h2160-rw',
      title: 'A Casa do Dragão',
      year: '2024',
      description: 'A espera acabou: a segunda temporada de A Casa do Dragão está disponível com mais ação do que nunca. O reino se divide entre os Conselhos Verde e Preto, e a guerra civil Targaryen começa. Quem vai assumir o reino e o Trono de Ferro? Ou esse capítulo sombrio vai manchar a família Targaryen para sempre?',
      link: '#',
    },
  ];
  return (
    <div className="App">
      <Navbar />
      <Carousel items={carouselItems} />
    </div>
  )
}