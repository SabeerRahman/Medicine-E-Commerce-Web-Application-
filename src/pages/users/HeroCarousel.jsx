import { Carousel, Button } from "antd";
import doctorImg from "../../assets/images/doctor.png";
import bag from "../../assets/svg/green-bag.svg";

const HeroCarousel = () => {
  const slides = [1, 2, 3, 4];

  return (
    <div className="mb-8">
      <Carousel
        autoplay
        accessibility={false}
        focusOnSelect={false}
      >
        {slides.map((_, index) => (
          <div key={index}>
            <div className="bg-dark-moss-green">
              <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-3 flex flex-col lg:flex-row items-center justify-between">
                <div className="max-w-xl space-y-6">
                  <h1 className="text-white text-4xl xl:text-6xl font-nunito font-bold leading-tight">
                    <span className="block whitespace-nowrap">
                      Your Prescription for
                    </span>
                    <span className="block">Affordable Health</span>
                    <span className="block">Solutions!</span>
                  </h1>

                  <p className="text-light-sky-blue font-poppins">
                    Elevate your health journey with exclusive discounts and
                    unparalleled convenience. Your path to well-being starts
                    here, where every purchase is a prescription for savings.
                  </p>

                  <Button
                    size="large"
                    className="bg-white! text-success-green! hover:bg-gray-100! font-semibold! font-nunito! px-3.5! py-2.5! rounded-lg flex items-center gap-2!"
                  >
                    Start Shopping
                    <img src={bag} alt="Bag" />
                  </Button>
                </div>

                <div className="-my-3">
                  <img
                    src={doctorImg}
                    alt="Doctor"
                    className="w-full max-w-xs lg:max-w-sm xl:max-w-lg object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
