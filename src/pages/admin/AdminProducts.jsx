import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  Modal,
  Alert,
  Empty,
  Avatar,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  useAdminProductsListQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../store/services/admin";
import { formatCurrency } from "../users/currency";
import fallbackImg from "../../assets/images/fallback.png";
import ProductFormModal from "../../components/ProductFormModal";
import { useSearchParams } from "react-router-dom";

const categoryColors = {
  medical: { color: "#304A2F", bg: "#E8FFE7" },
  top: { color: "#7A5C00", bg: "#FAEDC9" },
  popular: { color: "#004085", bg: "#CCE5FF" },
  new: { color: "#6A0080", bg: "#F8ECFE" },
  upcoming: { color: "#005f7f", bg: "#F1FAFE" },
};

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "medical", label: "Medical" },
  { value: "top", label: "Top Rated" },
  { value: "popular", label: "Popular" },
  { value: "new", label: "New" },
  { value: "upcoming", label: "Upcoming" },
];

const AdminProducts = () => {
  const [searchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({ category: "", search: "", sort: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (searchParams.get("action") === "create") {
      setModalMode("create");
      setSelectedProduct(null);
      setModalOpen(true);
    }
  }, [searchParams]);

  const queryParams = {};
  if (filters.category) queryParams.category = filters.category;
  if (filters.sort) queryParams.sort = filters.sort;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useAdminProductsListQuery(queryParams);

  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.data?.products || data?.data || [];

  const filteredProducts = filters.search
    ? products.filter((p) =>
        p?.name?.toLowerCase().includes(filters.search.toLowerCase())
      )
    : products;

  const handleCreate = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    setErrorMsg("");
    try {
      await deleteProduct(id).unwrap();
      setSuccessMsg("Product deleted successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setErrorMsg(err?.data?.message || "Failed to delete product.");
    }
  };

  const handleDeleteConfirm = (record) => {
    Modal.confirm({
      title: <span className="font-nunito font-bold">Delete Product?</span>,
      content: (
        <span className="font-nunito text-sm">
          This will permanently remove "{record?.name}" from your store.
        </span>
      ),
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: { danger: true, className: "font-nunito font-bold" },
      cancelButtonProps: { className: "font-nunito" },
      centered: true, 
      onOk: () => handleDelete(record._id),
    });
  };

  const handleModalSubmit = async (formData) => {
    setErrorMsg("");
    try {
      if (modalMode === "edit") {
        await updateProduct({ id: selectedProduct._id, formData }).unwrap();
        setSuccessMsg("Product updated successfully.");
      } else {
        await createProduct(formData).unwrap();
        setSuccessMsg("Product created successfully.");
      }
      setModalOpen(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setErrorMsg(err?.data?.message || "Operation failed. Please try again.");
    }
  };

  const columns = [
    {
      title: <span className="font-nunito font-bold text-xs uppercase tracking-widest text-dim-gray">Product</span>,
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={record?.image?.url && !record.image.url.includes("placeholder") ? record.image.url : fallbackImg}
            shape="square"
            size={48}
            className="rounded-xl flex-shrink-0"
          />
          <div>
            <p className="font-nunito font-bold text-midnight-ink text-sm leading-tight">{record?.name}</p>
            <p className="font-nunito text-xs text-dim-gray mt-0.5">
              ID: {record?._id?.slice(-6).toUpperCase()}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: <span className="font-nunito font-bold text-xs uppercase tracking-widest text-dim-gray">Category</span>,
      dataIndex: "category",
      key: "category",
      render: (cat) => {
        const config = categoryColors[cat?.toLowerCase()] || { color: "#333", bg: "#E8E8E8" };
        return (
          <Tag
            style={{ backgroundColor: config.bg, color: config.color, borderColor: "transparent" }}
            className="font-nunito font-bold text-xs uppercase tracking-wider rounded-full px-3 py-0.5"
          >
            {cat}
          </Tag>
        );
      },
    },
    {
      title: <span className="font-nunito font-bold text-xs uppercase tracking-widest text-dim-gray">Price</span>,
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="font-nunito font-black text-success-green text-base">
          {formatCurrency(price)}
        </span>
      ),
    },
    {
      title: <span className="font-nunito font-bold text-xs uppercase tracking-widest text-dim-gray">Added</span>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        date ? (
          <span className="font-nunito text-sm text-dim-gray">
            {new Date(date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        ) : "—",
    },
    {
      title: <span className="font-nunito font-bold text-xs uppercase tracking-widest text-dim-gray">Actions</span>,
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div className="flex items-center gap-2 justify-end">
          <Button
            icon={<EditOutlined />}
            size="middle"
            onClick={() => handleEdit(record)}
            className="rounded-xl border-success-green! text-success-green! font-nunito! font-semibold!"
          >
            Edit
          </Button>
          
          <Button
            icon={<DeleteOutlined />}
            size="middle"
            danger
            className="rounded-xl font-nunito! font-semibold!"
            onClick={() => handleDeleteConfirm(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-nunito font-black text-2xl text-midnight-ink">Product Management</h1>
          <p className="font-nunito text-sm text-dim-gray mt-0.5">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <Button
          icon={<PlusOutlined />}
          size="large"
          onClick={handleCreate}
          className="bg-success-green! text-white! font-bold! font-nunito! rounded-xl! border-none!"
        >
          Add Product
        </Button>
      </div>

      {successMsg && (
        <Alert
          title={successMsg}
          type="success"
          showIcon
          closable
          className="rounded-xl"
          onClose={() => setSuccessMsg("")}
        />
      )}
      {errorMsg && (
        <Alert
          title={errorMsg}
          type="error"
          showIcon
          closable
          className="rounded-xl"
          onClose={() => setErrorMsg("")}
        />
      )}

      <div className="bg-white rounded-2xl border border-light-gray p-4 flex flex-wrap gap-3 items-center">
        <Input
          prefix={<SearchOutlined className="text-dim-gray" />}
          placeholder="Search products..."
          size="large"
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          className="flex-1 min-w-[200px] rounded-xl font-nunito"
          allowClear
        />
        <Select
          value={filters.category}
          options={categoryOptions}
          onChange={(val) => setFilters((prev) => ({ ...prev, category: val }))}
          size="large"
          className="w-44 rounded-xl font-nunito"
          placeholder="Category"
        />
        <Select
          value={filters.sort || undefined}
          onChange={(val) => setFilters((prev) => ({ ...prev, sort: val }))}
          size="large"
          className="w-44 rounded-xl font-nunito"
          placeholder="Sort by"
          allowClear
          options={[
            { value: "newest", label: "Newest First" },
            { value: "oldest", label: "Oldest First" },
            { value: "price_asc", label: "Price: Low to High" },
            { value: "price_desc", label: "Price: High to Low" },
          ]}
        />
        <Button
          icon={<ReloadOutlined />}
          size="large"
          onClick={refetch}
          loading={isFetching}
          className="rounded-xl font-nunito font-semibold"
        >
          Refresh
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-light-gray overflow-hidden shadow-sm">
        {isError && (
          <div className="p-6">
            <Alert
              title={error?.data?.message || "Failed to load products."}
              type="error"
              showIcon
              className="rounded-xl"
            />
          </div>
        )}
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="_id"
          loading={isLoading || isFetching}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showTotal: (total) => (
              <span className="font-nunito text-sm text-dim-gray">
                Total {total} products
              </span>
            ),
          }}
          locale={{
            emptyText: (
              <Empty
                description={
                  <span className="font-nunito text-dim-gray">No products found</span>
                }
              />
            ),
          }}
          className="admin-products-table"
          rowClassName="hover:bg-snow-mist transition-colors"
        />
      </div>

      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialValues={modalMode === "edit" ? selectedProduct : null}
        isLoading={creating || updating}
        mode={modalMode}
      />
    </div>
  );
};

export default AdminProducts;