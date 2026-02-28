import { Button } from "antd";
import rightArrow from "../../assets/svg/arrow_right_line.svg";
import capsule from "../../assets/images/capsule.png";

const TodaysHotOffer = () => {
  return (
    <div className="bg-snow-mist px-4 sm:px-6 lg:px-12 xl:px-16 py-8 flex items-center justify-between gap-2">
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <div className="text-midnight-ink flex flex-col gap-1">
          <h1 className="text-xl font-prompt">Todays Hot Offer</h1>
          <h1 className="font-nunito font-extrabold text-4xl leading-tight">
            Unlock 50% Off on Essential Medicines!
          </h1>
        </div>
        <p className="font-poppins text-charcoal-slate">
          Embrace wellness without breaking the bank! Enjoy a generous 25%
          discount on a wide range of vital medicines at our online pharmacy.
          Your health matters, and so does your budget.
        </p>
        <Button
          size="large"
          className="bg-success-green! text-white! font-medium! font-poppins! px-6! rounded-lg flex items-center gap-2! w-fit"
        >
          Place An Order Now
          <img src={rightArrow} alt="right-line" className="size-6" />
        </Button>
      </div>
      <div className="shrink-0">
        <img src={capsule} alt="capsule" className="w-full max-w-lg xl:max-w-2xl object-contain" />
      </div>
    </div>
  );
};

export default TodaysHotOffer;