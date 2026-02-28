import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProductsListQuery } from "../../store/services/products";
import { formatCurrency } from "../../pages/users/currency";
import fallbackImg from "../../assets/images/fallback.png";
import cartBag from "../../assets/svg/cart-bag.svg";
import { Button, Spin, Alert, Empty, Input } from "antd";
import Container from "../../components/Container";
import UserNavbar from "../../pages/users/UserNavbar";
import Footer from "../../pages/users/Footer";

const { Search } = Input;

const CategoryProductsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error, isFetching } = useProductsListQuery(
    { category },
    { skip: !category }
  );

  const productsData = data?.data?.products || [];

  const filteredProducts = productsData
    .filter((item) => item?.category?.toLowerCase() === category?.toLowerCase())
    .filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    );

  const categoryLabel =
    category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className="min-h-screen bg-snow-mist flex flex-col">
      <div className="border-b border-soft-slate bg-white sticky top-0 z-20">
        <Container>
          <UserNavbar filters={{ category, search }} setFilters={() => {}} />
        </Container>
      </div>

      <Container>
        <div className="py-8 lg:py-12 flex-1">
          <div className="flex items-center gap-2 text-sm font-nunito text-dim-gray mb-6">
            <button
              onClick={() => navigate("/")}
              className="hover:text-success-green transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigate("/")}
              className="hover:text-success-green transition-colors cursor-pointer"
            >
              Products
            </button>
            <span>/</span>
            <span className="text-midnight-ink font-semibold capitalize">
              {categoryLabel}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-nunito font-black text-3xl lg:text-4xl text-midnight-ink">
                {categoryLabel} Products
              </h1>
              <div className="mt-2 h-1 w-12 rounded-full bg-success-green" />
              {!isLoading && !isFetching && (
                <p className="font-nunito text-dim-gray text-sm mt-2">
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""} found
                </p>
              )}
            </div>

            <Search
              placeholder={`Search ${categoryLabel} products...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
              size="large"
              style={{ maxWidth: 320 }}
              className="font-nunito"
            />
          </div>

          {(isLoading || isFetching) && (
            <div className="flex justify-center items-center py-24">
              <Spin size="large" />
            </div>
          )}

          {isError && (
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
          )}

          {!isLoading && !isFetching && !isError && filteredProducts.length === 0 && (
            <div className="py-20">
              <Empty description="No products found" />
            </div>
          )}

          {!isLoading && !isFetching && filteredProducts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <div
                  key={item?._id}
                  className="drop-shadow-[#0000001A] bg-white flex flex-col rounded-xl border border-light-gray cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/products/${item?._id}`)}
                >
                  <div className="p-4 flex items-center justify-center">
                    <img
                      src={fallbackImg}
                      alt="product-img"
                      className="size-52 object-contain"
                    />
                  </div>
                  <hr className="border border-light-gray" />
                  <div className="font-nunito font-bold flex flex-col gap-1 p-3 mb-3">
                    <h1 className="text-midnight-ink text-lg">{item?.name}</h1>
                    <h1 className="text-dark-gray">{formatCurrency(item?.price)}</h1>
                  </div>
                  <Button
                    size="large"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-success-green! text-white! font-bold! font-nunito! rounded-none! rounded-b-xl! flex items-center justify-center gap-2!"
                  >
                    Add to Cart
                    <img src={cartBag} alt="cart" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => navigate(-1)}
            className="mt-10 text-sm font-nunito text-dim-gray hover:text-success-green transition-colors cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default CategoryProductsPage;