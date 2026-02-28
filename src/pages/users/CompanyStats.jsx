import { companyStatsInfo } from "./userUtils";

const CompanyStats = () => {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
      {companyStatsInfo.map((item, index) => (
        <div
          key={index}
          style={{ backgroundColor: item.bgColor }}
          className="flex flex-col gap-2 rounded-lg p-4"
        >
          <div className="flex items-center gap-4">
            <div className="size-10 bg-white rounded-lg p-2 flex justify-center">
              <img src={item.img} alt={item.label} className="size-6" />
            </div>
            <h1 className="font-nunito font-bold lg:text-2xl xl:text-[32px]">
              {item.acheivementNo}
            </h1>
          </div>
          <h1 className="font-nunito font-semibold text-2xl text-midnight-ink w-31.25">
            {item.label}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default CompanyStats;
