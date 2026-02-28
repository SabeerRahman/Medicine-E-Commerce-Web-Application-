import { specialOffersProductInfo } from "./userUtils";

const SpecialOffersSection = () => {
  const [first, second, third] = specialOffersProductInfo;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 mb-10">
      <div
        style={{ backgroundColor: first.bgColor }}
        className="lg:col-span-2 flex items-center justify-between rounded-xl px-4 pb-4 pt-10"
      >
        <div className="flex flex-col gap-3 max-w-130">
          <span className="bg-success-green px-4 py-1 rounded-md text-white font-medium w-fit">
            {first.offerPercentage}% OFF
          </span>

          <h2 className="lg:text-2xl xl:text-[36px] font-bold font-nunito">{first.label}</h2>
          <p className="text-[32px] font-nunito font-medium">{first.desc}</p>

          <div>
            <p className="line-through text-charcoal-slate font-poppins font-medium">
              ${first.previousPrice}
            </p>
            <div className="flex items-center gap-4 text-midnight-ink">
              <p className="text-[32px] font-extrabold font-nunito">
                ${first.discountedPrice}
              </p>
              <span className="text-base font-normal font-poppins">
                Including Tax
              </span>
            </div>
          </div>
        </div>

        <img
          src={first.img}
          alt={first.label}
          className="lg:w-60 xl:w-75.75 shrink-0 object-contain"
        />
      </div>

      <div className="flex flex-col gap-6">
        {[second, third].map((item, index) => (
          <div
            key={index}
            style={{ backgroundColor: item.bgColor }}
            className="flex items-center gap-2 rounded-xl px-4 pb-4 pt-10"
          >
            <div className="flex flex-col gap-2">
              <span className="bg-success-green px-3 py-1 rounded-md text-white text-sm w-fit">
                {item.offerPercentage}% OFF
              </span>

              <p className="font-medium font-nunito lg:text-xl xl:text-2xl text-midnight-ink whitespace-pre-line">{item.desc}</p>

              <div>
                <p className="line-through font-poppins font-medium text-charcoal-slate">
                  ${item.previousPrice}
                </p>
                <div>
           
            <div className="flex items-center gap-2 text-midnight-ink">
              <p className="text-2xl font-extrabold font-nunito">
                ${item.discountedPrice}
              </p>
              <span className="text-base font-normal font-poppins whitespace-nowrap">
                Including Tax
              </span>
            </div>
          </div>
              </div>
            </div>

            <img src={item.img} alt="product" className="lg:w-28 xl:w-54 shrink-0 object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffersSection;
