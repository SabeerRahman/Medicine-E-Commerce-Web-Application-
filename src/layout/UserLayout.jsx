import { useState } from "react";
import Container from "../components/Container";
import ProductsSection from "../components/ProductsSection";
import Blogs from "../pages/users/Blogs";
import CompanyStats from "../pages/users/CompanyStats";
import FeatureCards from "../pages/users/FeatureCards";
import Footer from "../pages/users/Footer";
import HealthCategoryMenu from "../pages/users/HealthCategoryMenu";
import HeroCarousel from "../pages/users/HeroCarousel";
import SpecialOffersSection from "../pages/users/SpecialOffersSection";
import TodaysHotOffer from "../pages/users/TodaysHotOffer";
import UserNavbar from "../pages/users/UserNavbar";

const UserLayout = () => {
  const [filters, setFilters] = useState({
    category: "all",
    search: "",
  });

  return (
    <div className="space-y-4">
      <div className="border-b border-soft-slate bg-white">
        <Container>
          <UserNavbar filters={filters} setFilters={setFilters} />
        </Container>
      </div>

      <Container>
        <HealthCategoryMenu />
      </Container>

      <HeroCarousel />

      <Container>
        <FeatureCards />
        <ProductsSection title="New" filters={filters} />
        <ProductsSection title="Popular" filters={filters} />
        <SpecialOffersSection />
        <ProductsSection title="Top" filters={filters} />
        <CompanyStats />
        <ProductsSection title="Medical" filters={filters} />
        <ProductsSection title="Upcoming" filters={filters} />
      </Container>

      <TodaysHotOffer />

      <Container>
        <Blogs />
      </Container>

      <Footer />
    </div>
  );
};

export default UserLayout;
