import { Modal, Form, Input, InputNumber, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { categoryOptions } from "../pages/users/userUtils";

const ProductFormModal = ({ open, onClose, onSubmit, initialValues, isLoading, mode }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          name: initialValues.name,
          price: initialValues.price,
          category: initialValues.category?.toLowerCase(),
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("category", values.category);
    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }
    onSubmit(formData);
  };

  const uploadProps = {
    fileList,
    onChange: ({ fileList: newList }) => setFileList(newList.slice(-1)),
    beforeUpload: () => false,
    accept: "image/*",
    listType: "picture",
    maxCount: 1,

  };

const handleClose = () => {
  form.resetFields();
  setFileList([]);
  onClose();
};
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title={
        <div className="flex items-center gap-3 pb-4 border-b border-light-gray">
          <div className="w-8 h-8 rounded-lg bg-mint-frost flex items-center justify-center">
            <span className="text-success-green font-bold text-base">
              {mode === "edit" ? "✏️" : "＋"}
            </span>
          </div>
          <div>
            <h2 className="font-nunito font-black text-lg text-midnight-ink">
              {mode === "edit" ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="font-nunito text-xs text-dim-gray">
              {mode === "edit" ? "Update the product details below" : "Fill in the product details below"}
            </p>
          </div>
        </div>
      }
      width={520}
      className="admin-product-modal"
      styles={{ body: { paddingTop: 8 } }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        requiredMark={false}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label={<span className="font-nunito font-semibold text-midnight-ink text-sm">Product Name</span>}
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input
            placeholder="e.g. Vitamin C 1000mg"
            size="large"
            className="rounded-xl font-nunito"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="price"
            label={<span className="font-nunito font-semibold text-midnight-ink text-sm">Price (₹)</span>}
            rules={[
              { required: true, message: "Please enter price" },
              { type: "number", min: 0, message: "Price must be positive" },
            ]}
          >
            <InputNumber
              placeholder="299"
              size="large"
              className="w-full rounded-xl font-nunito"
              prefix="₹"
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label={<span className="font-nunito font-semibold text-midnight-ink text-sm">Category</span>}
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select category"
              size="large"
              className="rounded-xl font-nunito"
              options={categoryOptions}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="image"
          label={
            <span className="font-nunito font-semibold text-midnight-ink text-sm">
              Product Image {mode === "edit" && <span className="text-dim-gray font-normal">(optional)</span>}
            </span>
          }
        >
          <Upload {...uploadProps}>
            <Button
              icon={<UploadOutlined />}
              size="large"
              className="w-full rounded-xl font-nunito font-semibold"
            >
              {fileList.length > 0 ? "Change Image" : "Upload Image"}
            </Button>
          </Upload>
        </Form.Item>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={onClose}
            size="large"
            className="flex-1 rounded-xl font-nunito font-bold"
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            size="large"
            loading={isLoading}
            className="flex-1 bg-success-green! text-white! font-bold! font-nunito! rounded-xl! border-none!"
          >
            {mode === "edit" ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;