import { Form, Input, Button, Alert } from "antd";
import { LockOutlined, MailOutlined, MedicineBoxOutlined } from "@ant-design/icons";
import { useAdminLoginMutation } from "../../store/services/admin";
import { setCredentials } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminLogin = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const handleSubmit = async (values) => {
    setErrorMsg("");
    try {
      const res = await adminLogin(values).unwrap();
      const token = res?.data?.token;
      const admin = res?.data?.user || {};
      dispatch(setCredentials({ token, admin }));
      navigate("/admin/dashboard");
    } catch (err) {
      setErrorMsg(
        err?.data?.message || err?.error || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-snow-mist via-powder-blue-mist to-ice-blue flex items-center justify-center p-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-success-green/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full bg-seafoam-green/20 blur-3xl" />
        <div className="absolute top-[40%] left-[60%] w-64 h-64 rounded-full bg-ice-blue/60 blur-2xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-light-gray">
          <div className="bg-gradient-to-r from-success-green to-dark-moss-green p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-2xl">
                <MedicineBoxOutlined className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="font-nunito font-black text-2xl text-white">PharmaCare Admin</h1>
            <p className="font-nunito text-white/80 text-sm mt-1">Manage your pharmacy platform</p>
          </div>

          <div className="p-8">
            <h2 className="font-nunito font-bold text-xl text-midnight-ink mb-1">Welcome back</h2>
            <p className="font-nunito text-dim-gray text-sm mb-6">Sign in to access the admin panel</p>

            {errorMsg && (
              <Alert
                title={errorMsg}
                type="error"
                showIcon
                className="mb-5 rounded-xl"
                closable
                onClose={() => setErrorMsg("")}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Form.Item
                name="email"
                label={<span className="font-nunito font-semibold text-midnight-ink text-sm">Email Address</span>}
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-dim-gray mr-1" />}
                  placeholder="admin@example.com"
                  size="large"
                  className="rounded-xl font-nunito"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span className="font-nunito font-semibold text-midnight-ink text-sm">Password</span>}
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-dim-gray mr-1" />}
                  placeholder="Enter your password"
                  size="large"
                  className="rounded-xl font-nunito"
                />
              </Form.Item>

              <Form.Item className="mb-0 mt-6">
                <Button
                  htmlType="submit"
                  loading={isLoading}
                  size="large"
                  className="w-full bg-success-green! text-white! font-bold! font-nunito! rounded-xl! border-none! text-base!"
                  style={{ height: 52 }}
                >
                  {isLoading ? "Signing in..." : "Sign In to Admin"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <p className="text-center font-nunito text-xs text-dim-gray mt-4">
          © 2026 PharmaCare. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;