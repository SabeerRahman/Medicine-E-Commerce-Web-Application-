import { useProductsListQuery } from "../store/services/products";
import rightArrow from "../assets/svg/green-arrow.svg";
import cartBag from "../assets/svg/cart-bag.svg";
import { Button } from "antd";
import { formatCurrency } from "../pages/users/currency";
import fallbackImg from "../assets/images/fallback.png";
import { Spin } from "antd";
import { Alert } from "antd";
import { Empty } from "antd";
import { useNavigate } from "react-router-dom";

const ProductsSection = ({ title = "", filters }) => {
  const { category, search = "" } = filters || {};
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useProductsListQuery(
    { category },
    { skip: !category }
  );

  const productsData = data?.data?.products || [];
  const categoryKey = title?.toLowerCase() || "";

  const sectionFiltered = productsData.filter(
    (item) => item?.category?.toLowerCase() === categoryKey
  );

  const filteredProducts = sectionFiltered
    .filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 4);

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10">
        <Alert
          title="Failed to load products"
          description={
            error?.data?.message ||
            error?.error ||
            "Something went wrong. Please try again later."
          }
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!filteredProducts.length) {
    return (
      <div className="py-10">
        <Empty description="No products found" />
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-4">
      <div className="font-nunito font-bold flex justify-between items-center gap-2">
        <h1 className="text-[32px] text-midnight-ink">{title} Products</h1>
        <div
          onClick={() => navigate(`/products/category/${categoryKey}`)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-success-green">View All</span>
          <img src={rightArrow} alt="right-arrow" className="size-6" />
        </div>
      </div>

      {/* items-stretch ensures all cards in a row grow to the tallest card's height */}
      <div className="grid lg:grid-cols-4 gap-6 items-stretch">
        {filteredProducts?.map((item) => (
          <div
            key={item?._id}
            className="drop-shadow-[#0000001A] bg-white flex flex-col rounded-xl border border-light-gray cursor-pointer h-full"
            onClick={() => navigate(`/products/${item?._id}`)}
          >
            {/* Image area — fixed height so images are always aligned */}
            <div className="p-4 flex items-center justify-center h-[200px]">
              <img
                src={fallbackImg}
                alt="product-img"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <hr className="border border-light-gray" />

            {/* Content area — flex-1 pushes the button to the bottom */}
            <div className="font-nunito font-bold flex flex-col gap-0.5 p-2 mb-3 flex-1">
              {/* line-clamp-2 caps name at 2 lines; min-h reserves that space for short names */}
              <h1 className="text-midnight-ink text-xl line-clamp-2">
                {item?.name}
              </h1>
              <h1 className="text-dark-gray">{formatCurrency(item?.price)}</h1>
            </div>

            <Button
              size="large"
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-success-green! text-white! font-bold! font-nunito! rounded-none! rounded-b-xl! flex items-center justify-center gap-2!"
            >
              Add to Cart
              <img src={cartBag} alt="cart-bag" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;