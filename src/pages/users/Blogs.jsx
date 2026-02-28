import { blogsInfo } from "./userUtils";
import dateIcon from "../../assets/svg/date.svg";
import { Button } from "antd";

const Blogs = () => {
  return (
    <div>
      <h1 className="font-nunito font-bold text-[40px] text-center text-midnight-ink my-6">
        Our Latest News & Blogs
      </h1>

      <div className="flex gap-4">
        <div className="border border-powder-blue-mist rounded-[14px] flex flex-col w-1/2">
          <img
            src={blogsInfo[0].img}
            alt={blogsInfo[0].title}
            className="w-full object-cover rounded-t-[14px]"
          />
          <div className="flex flex-col gap-2 p-4">
            <div className="flex items-center gap-4">
              <h1 className="bg-arctic-whisper py-1.5 px-3 text-success-green rounded-md text-center">
                {blogsInfo[0].type}
              </h1>
              <h1 className="flex items-center gap-2">
                <img src={dateIcon} alt="date-icon" className="size-4" />
                <span className="font-poppins text-sm text-charcoal-slate">
                  {blogsInfo[0].date}
                </span>
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-nunito font-medium text-[36px] text-midnight-ink">
                {blogsInfo[0].title}
              </h1>
              <p className="text-charcoal-slate font-inter">{blogsInfo[0].desc}</p>
              <Button
                size="large"
                className="bg-success-green! text-white! font-poppins! px-6! py-3! rounded-lg w-fit"
              >
                Read More
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-1/2">
          {blogsInfo.slice(1).map((item) => (
            <div
              key={item.title}
              className="border border-powder-blue-mist rounded-[14px] flex items-center gap-3 overflow-hidden"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-60 h-full object-cover shrink-0"
              />
              <div className="flex flex-col gap-2 py-2 pr-3 justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="bg-arctic-whisper py-1.5 px-3 text-success-green rounded-md text-center">
                    {item.type}
                  </h1>
                  <h1 className="flex items-center gap-2">
                    <img src={dateIcon} alt="date-icon" className="size-4" />
                    <span className="font-poppins text-sm text-charcoal-slate">
                      {item.date}
                    </span>
                  </h1>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="font-nunito font-medium text-xl text-midnight-ink">
                    {item.title}
                  </h1>
                  <p className="text-charcoal-slate font-inter">{item.desc}</p>
                  <Button
                    size="large"
                    className="bg-success-green! text-white! font-poppins! px-4! rounded-lg w-fit"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
