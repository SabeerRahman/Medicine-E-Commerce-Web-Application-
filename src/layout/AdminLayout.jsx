import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown, Badge, Spin } from "antd";
import {
  DashboardOutlined,
  MedicineBoxOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useAdminLogoutMutation, useAdminMeQuery } from "../store/services/admin";

const { Sider, Content, Header } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [adminLogout] = useAdminLogoutMutation();
  const { data: meData, isLoading: meLoading } = useAdminMeQuery();

  const admin = meData?.data?.user || {};

  const handleLogout = async () => {
    try {
      await adminLogout().unwrap();
    } catch (_) {}
    dispatch(logout());
    navigate("/admin/login");
  };

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/products",
      icon: <AppstoreOutlined />,
      label: "Products",
    },
  ];

  const dropdownItems = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: <span className="font-nunito">My Profile</span>,
      },
      { type: "divider" },
     {
  key: "logout",
  icon: <LogoutOutlined />,
  label: <span className="font-nunito">Logout</span>,
  danger: true,
  onClick: handleLogout,
}
    ],
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        width={240}
        style={{
          background: "linear-gradient(180deg, #020A13 0%, #0d1f0d 50%, #1a3a1a 100%)",
          boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
          position: "sticky",   
          top: 0,               
          height: "100vh",      
          overflow: "hidden",   
        }}
        className="relative"
      >
        <div
          className="flex items-center gap-3 px-5 py-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-success-green flex-shrink-0">
            <MedicineBoxOutlined className="text-white text-lg" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-nunito font-black text-white text-base leading-tight">PharmaCare</p>
              <p className="font-nunito text-[10px] text-white/40 uppercase tracking-widest">Admin Panel</p>
            </div>
          )}
        </div>

        {!collapsed && (
          <div
            className="px-5 py-4 border-b"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <p className="font-nunito text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">
              Navigation
            </p>
          </div>
        )}

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ background: "transparent", border: "none" }}
          className="mt-2 admin-sidebar-menu"
          theme="dark"
        />

        <div
          className="absolute bottom-0 left-0 right-0 p-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer"
          >
            <LogoutOutlined style={{ color: "#ef4444", fontSize: "16px" }} />
            {!collapsed && (
              <span className="font-nunito font-semibold text-red-500 text-sm">
                Logout
              </span>
            )}
          </button>
        </div>
      </Sider>

      <Layout style={{ overflow: "auto" }}> 
        <Header
          className="flex items-center justify-between px-6 border-b border-light-gray"
          style={{
            background: "#ffffff",
            height: 64,
            lineHeight: "64px",
            position: "sticky",  
            top: 0,             
            zIndex: 100,         
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-powder-blue-mist transition-colors cursor-pointer"
            >
              {collapsed ? (
                <MenuUnfoldOutlined className="text-midnight-ink text-base" />
              ) : (
                <MenuFoldOutlined className="text-midnight-ink text-base" />
              )}
            </button>
            <div>
              <h1 className="font-nunito font-black text-lg text-midnight-ink leading-none">
                {location.pathname === "/admin/dashboard" ? "Dashboard" : "Product Management"}
              </h1>
              <p className="font-nunito text-xs text-dim-gray">
                {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge count={0} showZero={false}>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-powder-blue-mist transition-colors cursor-pointer">
                <BellOutlined className="text-midnight-ink text-base" />
              </button>
            </Badge>

            <Dropdown menu={dropdownItems} placement="bottomRight" trigger={["click"]}>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-powder-blue-mist px-3 py-1.5 rounded-xl transition-colors">
                {meLoading ? (
                  <Spin size="small" />
                ) : (
                  <Avatar
                    style={{ backgroundColor: "#28A745" }}
                    icon={<UserOutlined />}
                    size={32}
                  />
                )}
                <div>
                  <p className="font-nunito font-bold text-sm text-midnight-ink leading-none">
                    {admin?.name || "Admin"}
                  </p>
                  <p className="font-nunito text-xs text-dim-gray">{admin?.email || ""}</p>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content
          className="bg-snow-mist overflow-auto"
          style={{ minHeight: "calc(100vh - 64px)" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;