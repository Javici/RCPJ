import { useState, useEffect, useRef } from 'react';
import img1 from './assets/img/jonh4.png';
import img2 from './assets/img/jonh3.png';
import img3 from './assets/img/jonh1.png';
import musica from './assets/audio/temardo.mp3';

const Javi = () => {
  const [clicks, setClicks] = useState(0);
  const [mostrarPrimeraImagen, setMostrarPrimeraImagen] = useState(true);

  // Tipar el ref como HTMLAudioElement
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().catch(() => {
        console.log('Reproducción automática bloqueada hasta la interacción del usuario.');
      });
    }
  }, []);

  const obtenerImagen = () => {
    if (clicks >= 15) return img3;
    return mostrarPrimeraImagen ? img1 : img2;
  };

  const handleClick = () => {
    setClicks(prev => prev + 1);
    if (clicks < 15) setMostrarPrimeraImagen(!mostrarPrimeraImagen);

    // Intentar reproducir audio si estaba bloqueado
    audioRef.current?.play();
  };

  return (
    <div className="flex justify-center h-screen w-screen">
      <div className="flex flex-col items-center text-center mt-10">
        <h1 className="text-2xl font-bold mb-6">Día Mundial de la RCP</h1>

        <img
          src={obtenerImagen()}
          alt="Imagen alternante"
          className="w-180 h-auto md:w-[700px] rounded-2xl shadow-lg mb-6 transition-all duration-500"
        />

        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleClick}
        >
          Realizar RCP
        </button>

        {clicks >= 15 && (
          <p className="mt-4 text-green-600 font-semibold">¡Gracias por salvar a Jonh!</p>
        )}

        {/* Elemento de audio oculto */}
        <audio ref={audioRef} src={musica} />
      </div>
    </div>
  );
};

export default Javi;
