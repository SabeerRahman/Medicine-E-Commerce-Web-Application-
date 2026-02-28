import { featuresInfo } from "./userUtils";
import rightArrow from "../../assets/svg/right-arrow.svg";

const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
      {featuresInfo.map((item, index) => (
        <div
          key={index}
          style={{ backgroundColor: item.bgColor }}
          className={`flex items-center justify-between gap-2 p-4 rounded-lg`}
        >
          <div className="flex items-center gap-2">
            <img src={item.img} alt={item.label} className="size-11.5" />
            <h1 className="font-nunito font-bold xl:text-2xl">{item.label}</h1>
          </div>
          <img src={rightArrow} alt="right-arrow" className="size-6 cursor-pointer" />
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
