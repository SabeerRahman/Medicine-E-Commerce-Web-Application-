import Container from "../../components/Container";
import {
  footerContactInfo,
  footerQuickLinks,
  footerSpecialties,
  footerServices,
  footerSocialLinks,
} from "../users/userUtils";

const Footer = () => {
  return (
    <footer className="text-white bg-forest-green">
      <Container>
        <div className="pb-10 pt-18 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">

          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-xl mb-5 font-inter">Contact</h3>
            <ul className="space-y-3">
              {footerContactInfo.map(({ id, label, icon }) => (
                <li key={id} className="flex items-center gap-2 text-sky-veil font-medium font-inter">
                  <img src={icon} alt={id} className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-xl mb-5 font-inter">Quick Links</h3>
            <ul className="space-y-2">
              {footerQuickLinks.map(({ id, label, href }) => (
                <li key={id}>
                  <a
                    href={href}
                    className="text-sky-veil font-medium hover:text-white transition-colors duration-200 font-inter"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-xl mb-5 font-inter">Specialties</h3>
            <ul className="space-y-2">
              {footerSpecialties.map(({ id, label, href }) => (
                <li key={id}>
                  <a
                    href={href}
                    className="text-sky-veil font-medium hover:text-white transition-colors duration-200 font-inter"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-xl mb-5 font-inter">Services</h3>
            <ul className="space-y-2">
              {footerServices.map(({ id, label, href }) => (
                <li key={id}>
                  <a
                    href={href}
                    className="text-sky-veil font-medium hover:text-white transition-colors duration-200 font-inter"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-xl mb-5 font-inter">Social Media</h3>
            <div className="flex flex-wrap gap-6 font-inter">
              {footerSocialLinks.map(({ id, icon, href, label }) => (
                <a
                  key={id}
                  href={href}
                  aria-label={label}
                >
                  <img src={icon} alt={label} className="size-10" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/23" />

        <div className="py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sky-veil font-inter">
          <p>© 2026 HEALTHY. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Terms and Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;