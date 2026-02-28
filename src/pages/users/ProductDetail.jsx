import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import fallbackImg from "../../assets/images/fallback.png";
import { Button, Spin, Alert } from "antd";
import cartBag from "../../assets/svg/cart-bag.svg";
import { useProductByIdQuery } from "../../store/services/products";
import { formatCurrency } from "./currency";
import Container from "../../components/Container";

const CategoryBadge = ({ category }) => {
  const colors = {
    medical: { bg: "#E8FFE7", text: "#304A2F", label: "Medical" },
    top: { bg: "#FAEDC9", text: "#7A5C00", label: "Top Rated" },
    popular: { bg: "#CCE5FF", text: "#004085", label: "Popular" },
    new: { bg: "#F8ECFE", text: "#6A0080", label: "New" },
    upcoming: { bg: "#F1FAFE", text: "#005f7f", label: "Upcoming" },
  };
  const style = colors[category?.toLowerCase()] || {
    bg: "#E8E8E8",
    text: "#333",
    label: category,
  };
  return (
    <span
      style={{ backgroundColor: style.bg, color: style.text }}
      className="text-xs font-nunito font-bold uppercase tracking-widest px-3 py-1 rounded-full"
    >
      {style.label}
    </span>
  );
};

const SkeletonLoader = () => (
  <div className="min-h-screen bg-snow-mist flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Spin size="large" />
      <p className="text-dim-gray font-nunito text-sm animate-pulse">
        Loading product...
      </p>
    </div>
  </div>
);

const isPlaceholderUrl = (url) => {
  if (!url) return true;
  return url.includes("via.placeholder.com") || url.includes("placeholder");
};

const ProductImage = ({ src, alt }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const useFallback = isPlaceholderUrl(src) || imgError;
  const imgSrc = useFallback ? fallbackImg : src;

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[200px]">
      {!imgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Spin size="large" />
        </div>
      )}
      <img
        key={imgSrc} 
        src={imgSrc}
        alt={alt}
        onLoad={() => setImgLoaded(true)}
        onError={() => {
          setImgError(true);
          setImgLoaded(true); 
        }}
        className="max-w-[280px] lg:max-w-[340px] w-full object-contain drop-shadow-xl transition-opacity duration-300"
        style={{
          filter: "drop-shadow(0 20px 40px rgba(40,167,69,0.15))",
          opacity: imgLoaded ? 1 : 0,
        }}
      />
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useProductByIdQuery({ id });
  const product = data?.data?.product || data?.data || null;

  if (isLoading) return <SkeletonLoader />;

  if (isError) {
    return (
      <div className="min-h-screen bg-snow-mist flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <Alert
            title="Failed to load product"
            description={
              error?.data?.message ||
              error?.error ||
              "Something went wrong. Please try again later."
            }
            type="error"
            showIcon
          />
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-success-green font-nunito font-bold underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-snow-mist">
      <div className="border-b border-soft-slate bg-white sticky top-0 z-20">
        <Container>
          <div className="flex items-center gap-2 py-4 text-sm font-nunito text-dim-gray">
            <button
              onClick={() => navigate("/")}
              className="hover:text-success-green transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span
              className="hover:text-success-green transition-colors cursor-pointer"
              onClick={() => navigate("/")}
            >
              Products
            </span>
            <span>/</span>
            <span className="text-midnight-ink font-semibold truncate max-w-[200px]">
              {product?.name}
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-10 lg:py-16">
          <div className="bg-white rounded-3xl border border-light-gray overflow-hidden shadow-sm">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative bg-gradient-to-br from-seafoam-green/30 to-ice-blue/50 flex items-center justify-center min-h-[380px] lg:min-h-[520px] p-10 lg:p-16">
                <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-success-green/5 blur-2xl" />
                <div className="absolute bottom-8 right-8 w-48 h-48 rounded-full bg-seafoam-green/30 blur-3xl" />

                <div className="relative z-10 flex items-center justify-center w-full h-full">
                  <ProductImage src={product?.image?.url} alt={product?.name} />
                </div>

                <div className="absolute top-6 right-6">
                  <CategoryBadge category={product?.category} />
                </div>
              </div>

              <div className="flex flex-col justify-between p-8 lg:p-12">
                <div className="space-y-6">
                  <div>
                    <h1 className="font-nunito font-black text-3xl lg:text-4xl text-midnight-ink leading-tight">
                      {product?.name}
                    </h1>
                    <div className="mt-2 h-1 w-12 rounded-full bg-success-green" />
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-nunito font-black text-4xl text-success-green">
                      {formatCurrency(product?.price)}
                    </span>
                    <span className="font-nunito text-dim-gray text-sm">
                      incl. taxes
                    </span>
                  </div>

                  <hr className="border-light-gray" />

                  <div className="space-y-3">
                    <h2 className="font-nunito font-bold text-sm uppercase tracking-widest text-dim-gray">
                      Product Details
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      <DetailPill label="Category" value={product?.category} />
                      <DetailPill label="Availability" value="In Stock" highlight />
                      <DetailPill
                        label="Added"
                        value={
                          product?.createdAt
                            ? new Date(product.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"
                        }
                      />
                      <DetailPill label="SKU" value={product?._id?.slice(-6).toUpperCase()} />
                    </div>
                  </div>

                  <div className="bg-arctic-whisper rounded-xl p-4">
                    <p className="font-nunito text-dim-gray text-sm leading-relaxed">
                      Trusted quality you can rely on. This product is carefully curated
                      to meet the highest health and wellness standards. Suitable for
                      everyday use.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button
                    size="large"
                    className="flex-1 bg-success-green! text-white! font-bold! font-nunito! rounded-xl! flex items-center justify-center gap-2!"
                    style={{ height: 48 }}
                  >
                    Add to Cart
                    <img src={cartBag} alt="cart" className="w-5 h-5" />
                  </Button>
                  <Button
                    size="large"
                    className="flex-1 border-success-green! text-success-green! font-bold! font-nunito! rounded-xl!"
                    style={{ height: 48 }}
                  >
                    Buy Now
                  </Button>
                </div>

                <button
                  onClick={() => navigate(-1)}
                  className="mt-5 text-sm font-nunito text-dim-gray hover:text-success-green transition-colors text-left cursor-pointer"
                >
                  ← Back to products
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🚚", title: "Free Delivery", sub: "On orders above ₹499" },
              { icon: "✅", title: "100% Genuine", sub: "Certified products only" },
              { icon: "🔄", title: "Easy Returns", sub: "7-day return policy" },
              { icon: "🔒", title: "Secure Payment", sub: "SSL encrypted checkout" },
            ].map((badge) => (
              <div
                key={badge.title}
                className="bg-white rounded-2xl border border-light-gray p-4 flex items-center gap-3"
              >
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="font-nunito font-bold text-sm text-midnight-ink">{badge.title}</p>
                  <p className="font-nunito text-xs text-dim-gray">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

const DetailPill = ({ label, value, highlight = false }) => (
  <div className="bg-powder-blue-mist rounded-xl p-3">
    <p className="font-nunito text-xs text-dim-gray uppercase tracking-wide mb-0.5">
      {label}
    </p>
    <p
      className={`font-nunito font-bold text-sm capitalize ${
        highlight ? "text-success-green" : "text-midnight-ink"
      }`}
    >
      {value || "—"}
    </p>
  </div>
);

export default ProductDetail;