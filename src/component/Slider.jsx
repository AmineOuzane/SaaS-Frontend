import React, { useRef } from "react";
import EmblaCarouselReact from "embla-carousel-react";
import phone from "../../src/images/phone-slider-1.jpg";
import phonepc from "../../src/images/phone-pc-slider.jpg";
import handshake from "../../src/images/hand-shake.jpg";
import "../../src/styles/embla.css"; // Ensure you include the CSS for styling

const Slider = () => {
  const [emblaRef, emblaApi] = EmblaCarouselReact({ loop: true });
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  // Handler for navigation buttons
  const goToPrev = () => emblaApi.scrollPrev();
  const goToNext = () => emblaApi.scrollNext();

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <img src={phone} alt="Slide 1" />
            <h1 className="slide1">Traite vos tache en un seul clic sur WhatsApp !</h1>
          </div>
          <div className="embla__slide">
            <img src={phonepc} alt="Slide 2" />
            <h1 className="slide2">Optimiser for temps avec <br /> WhatsOps</h1>
          </div>
          <div className="embla__slide">
            <img src={handshake} alt="Slide 3" />
            <h1 className="slide3">Cooperer de facon optimale avec votre equipe</h1>
          </div>
        </div>
      </div>

      {/* Prev Button */}
      <button
        className="embla__prev embla__button"
        onClick={goToPrev}
        ref={prevBtnRef}
      >
        &#8592;
      </button>

      {/* Next Button */}
      <button
        className="embla__next embla__button"
        onClick={goToNext}
        ref={nextBtnRef}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Slider;
