import { Input, Select, Space } from "antd";
import logo from "../../assets/images/logo.png";
import heartSymbol from "../../assets/svg/heart.svg";
import bagSymbol from "../../assets/svg/bag.svg";
import searchSymbol from "../../assets/svg/search.svg";
import userImg from "../../assets/images/user.png";
import downArrow from "../../assets/svg/down-arrow.svg";
import { categoryOptions } from "./userUtils";

const UserNavbar = ({ filters, setFilters }) => {
  return (
    <div className="pt-6 pb-4">
      <div className="flex items-center justify-between gap-8">
        <div>
          <img src={logo} alt="logo" className="h-11.5 w-39 object-contain" />
        </div>

        <Space.Compact className="lg:w-160! xl:w-240!">
          <Select
            defaultValue="all"
            className="h-15 w-40 text-dim-gray! font-medium! text-[15px]! font-inter!"
            value={filters.category}
            options={categoryOptions}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                category: value,
              }))
            }
          />

          <Input
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
            placeholder="Search medicine, medical products"
            className="h-15 flex-1"
            classNames={{
              input:
                "font-inter text-sm text-dim-gray placeholder:text-dim-gray",
            }}
          />

          <div className="h-15 w-14 bg-success-green flex items-center justify-center rounded-r-lg cursor-pointer">
            <img src={searchSymbol} alt="search" className="size-5" />
          </div>
        </Space.Compact>

        <div className="flex items-center gap-6">
          <img
            src={heartSymbol}
            alt="heart"
            className="size-6 cursor-pointer"
          />
          <img src={bagSymbol} alt="bag" className="size-6 cursor-pointer" />
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={userImg} alt="user" className="size-10" />
            <img src={downArrow} alt="arrow" className="size-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
