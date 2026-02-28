import { Alert, Spin } from "antd";
import {
  AppstoreOutlined,
  MedicineBoxOutlined,
  RiseOutlined,
  StarOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useStatsListQuery, useProductCountByCategoryQuery } from "../../store/services/admin";
import { useNavigate } from "react-router-dom";

const categoryConfig = {
  medical: { icon: <MedicineBoxOutlined />, color: "#28A745", bg: "#E8FFE7", label: "Medical" },
  top: { icon: <StarOutlined />, color: "#7A5C00", bg: "#FAEDC9", label: "Top Rated" },
  popular: { icon: <RiseOutlined />, color: "#004085", bg: "#CCE5FF", label: "Popular" },
  new: { icon: <ThunderboltOutlined />, color: "#6A0080", bg: "#F8ECFE", label: "New" },
  upcoming: { icon: <ClockCircleOutlined />, color: "#005f7f", bg: "#F1FAFE", label: "Upcoming" },
};

const StatCard = ({ title, value, icon, color, bg, subtitle, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl border border-light-gray p-6 flex items-center gap-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${onClick ? "cursor-pointer" : ""}`}
  >
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl"
      style={{ backgroundColor: bg, color }}
    >
      {icon}
    </div>
    <div>
      <p className="font-nunito text-xs text-dim-gray uppercase tracking-widest font-bold mb-0.5">
        {title}
      </p>
      <p className="font-nunito font-black text-3xl text-midnight-ink leading-none">{value ?? "—"}</p>
      {subtitle && <p className="font-nunito text-xs text-dim-gray mt-1">{subtitle}</p>}
    </div>
  </div>
);

const CategoryCard = ({ category, count }) => {
  const config = categoryConfig[category?.toLowerCase()] || {
    icon: <AppstoreOutlined />,
    color: "#333",
    bg: "#E8E8E8",
    label: category,
  };

  return (
    <div className="bg-white rounded-2xl border border-light-gray p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-base"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          {config.icon}
        </div>
        <span className="font-nunito font-bold text-midnight-ink capitalize">{config.label}</span>
      </div>
      <div className="text-right">
        <span
          className="font-nunito font-black text-2xl"
          style={{ color: config.color }}
        >
          {count ?? 0}
        </span>
        <p className="font-nunito text-xs text-dim-gray">products</p>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useStatsListQuery();

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useProductCountByCategoryQuery();

  const stats = statsData?.data || {};
  const totalProducts = stats?.totalProducts ?? null;

  const countsArray = categoryData?.data?.counts || [];
  const categoryCount = countsArray.reduce((acc, item) => {
    acc[item.category] = item.count;
    return acc;
  }, {});

  const isLoading = statsLoading || categoryLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Spin size="large" />
          <p className="font-nunito text-dim-gray text-sm animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="bg-gradient-to-r from-success-green to-dark-moss-green rounded-3xl p-7 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full bg-white/5 blur-2xl translate-y-1/2" />
        <div className="relative z-10">
          <p className="font-nunito text-white/70 text-sm uppercase tracking-widest font-bold mb-1">
            Overview
          </p>
          <h1 className="font-nunito font-black text-3xl lg:text-4xl">
            Dashboard
          </h1>
          <p className="font-nunito text-white/80 mt-2 text-sm">
            Here's what's happening with your pharmacy store today.
          </p>
        </div>
      </div>

      {(statsError || categoryError) && (
        <Alert
          message="Some data failed to load. Showing available information."
          type="warning"
          showIcon
          className="rounded-xl"
        />
      )}

      <div>
        <h2 className="font-nunito font-bold text-base text-dim-gray uppercase tracking-widest mb-4">
          Store Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon={<AppstoreOutlined />}
            color="#28A745"
            bg="#E8FFE7"
            subtitle="Across all categories"
            onClick={() => navigate("/admin/products")}
          />
          <StatCard
            title="Categories"
            value={Object.keys(categoryCount).length || 5}
            icon={<MedicineBoxOutlined />}
            color="#004085"
            bg="#CCE5FF"
            subtitle="Active product categories"
          />
          <StatCard
            title="Latest Activity"
            value="Live"
            icon={<RiseOutlined />}
            color="#7A5C00"
            bg="#FAEDC9"
            subtitle="All systems operational"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-nunito font-bold text-base text-dim-gray uppercase tracking-widest">
            Products by Category
          </h2>
          <button
            onClick={() => navigate("/admin/products")}
            className="font-nunito text-sm font-bold text-success-green hover:opacity-70 transition-opacity cursor-pointer"
          >
            Manage Products →
          </button>
        </div>

        {categoryLoading ? (
          <div className="flex justify-center py-10">
            <Spin />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {Object.keys(categoryConfig).map((cat) => (
              <CategoryCard
                key={cat}
                category={cat}
                count={categoryCount[cat] ?? 0}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="font-nunito font-bold text-base text-dim-gray uppercase tracking-widest mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="bg-white rounded-2xl border border-light-gray p-5 flex items-center gap-4 hover:border-success-green hover:shadow-md transition-all duration-200 text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-mint-frost flex items-center justify-center text-success-green text-xl">
              <AppstoreOutlined />
            </div>
            <div>
              <p className="font-nunito font-bold text-midnight-ink">View All Products</p>
              <p className="font-nunito text-xs text-dim-gray mt-0.5">Browse and manage your product catalogue</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/admin/products?action=create")}
            className="bg-white rounded-2xl border border-light-gray p-5 flex items-center gap-4 hover:border-success-green hover:shadow-md transition-all duration-200 text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-mint-frost flex items-center justify-center text-success-green text-xl">
              <ThunderboltOutlined />
            </div>
            <div>
              <p className="font-nunito font-bold text-midnight-ink">Add New Product</p>
              <p className="font-nunito text-xs text-dim-gray mt-0.5">Create a new listing in your store</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;