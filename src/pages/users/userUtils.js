import priceTag from "../../assets/svg/price-tag.svg";
import delivery from "../../assets/svg/delivery.svg";
import doctor from "../../assets/svg/doctor.svg";
import stethoscope from "../../assets/svg/stethoscope.svg";
import garlicOilImg from "../../assets/images/garlic-oil.png";
import dentalCareImg from "../../assets/images/dental-care.png";
import pasteImg from "../../assets/images/paste.png";
import profileIcon from "../../assets/svg/profile.svg";
import medalIcon from "../../assets/svg/golden-medal.svg";
import customerIcon from "../../assets/svg/users.svg";
import userIcon from "../../assets/svg/customer-rate.svg";
import blog1Img from "../../assets/images/blog1.png";
import blog2Img from "../../assets/images/blog2.png";
import blog3Img from "../../assets/images/blog3.png";
import blog4Img from "../../assets/images/blog4.png";
import locationIcon from "../../assets/svg/location.svg";
import emailIcon from "../../assets/svg/email.svg";
import phoneIcon from "../../assets/svg/phone.svg";
import fbIcon from "../../assets/svg/fb.svg";
import instaIcon from "../../assets/svg/instagram.svg";
import linkedinIcon from "../../assets/svg/linkedin.svg";
import ytubeIcon from "../../assets/svg/ytube.svg";

export const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "medical", label: "Medical" },
  { value: "top", label: "Top" },
  { value: "popular", label: "Popular" },
  { value: "new", label: "New" },
  { value: "upcoming", label: "Upcoming" },
];

export const healthCategories = [
  { id: "pain-relief", label: "Pain Relief"  },
  { id: "cold-flu", label: "Cold and Flu" },
  { id: "diabetes-care", label: "Diabetes Care"  },
  { id: "digestive-health", label: "Digestive Health"},
  { id: "first-aid", label: "First Aid" },
  { id: "skin-care", label: "Skin Care" },
  { id: "child-baby-care", label: "Child and Baby Care" },
  { id: "heart-health", label: "Heart Health" },
  { id: "eye-ear-care", label: "Eye and Ear Care" },
  { id: "respiratory-health", label: "Respiratory Health" }
];

export const featuresInfo = [
  {label: "Get 25% OFF",img: priceTag,bgColor: "var(--color-seafoam-green)",},
  {label: "Free Home Delivery",img: delivery,bgColor: "var(--color-golden-sand)"},
  {label: "Doctor's Appointment",img: doctor,bgColor: "var(--color-lime-green)"},
  {label: "Health Advice",img: stethoscope,bgColor: "var(--color-pale-lavendar)"},
]; 

export const specialOffersProductInfo = [
  {
    label: "BLACK GARLIC OIL",
    desc: "Stronger and Thicker Hair With Black Garlic Oil.",
    img: garlicOilImg,
    imgWidth: 303,
    offerPercentage: "25",
    previousPrice: "37.00",
    discountedPrice:"37.00",
    bgColor: "var(--color-ice-blue)"
  },
  {
   desc: "Dental Care Set for Vivid\nand Bright Smiles",
    img: dentalCareImg,
    imgWidth: 216,
    offerPercentage: "25",
    previousPrice: "33.90",
    discountedPrice:"22.90",
    bgColor: "var(--color-vanilla-cream)"
  },
  {
    desc: "BANANA FLAVOURED\nTOOTHPASTE",
    img: pasteImg,
    imgWidth: 216,
    offerPercentage: "25",
    previousPrice: "37.00",
    discountedPrice:"37.00",
    bgColor: "var(--color-mint-frost)"
  },
]

export const companyStatsInfo = [
  {label: "Orders Completed",img: profileIcon,acheivementNo: "14K+",bgColor: "var(--color-seafoam-green)",},
  {label: "Won Awards",img: medalIcon,acheivementNo: "250+",bgColor: "var(--color-golden-sand)",},
  {label: "Happy Customers",img: customerIcon,acheivementNo: "8K+",bgColor: "var(--color-lime-green)",},
  {label: "Positive Reviews",img: userIcon,acheivementNo: "12K+",bgColor: "var(--color-pale-lavendar)",},
]; 

export const blogsInfo = [
  {
    type: "Doctor",
    date: "24 Dec, 2023",
    title: "In this section, we delve into various aspects of health",
    desc: "Explore the world of medical specialties through our blog's spotlight feature. From cardiology to pediatrics, we share in-depth articles written by our expert physicians.",
    img: blog1Img
  },
  {
    type: "Doctor",
    date: "24 Dec, 2023",
    title: "Discover a treasure trove of practical tips for enhancing",
    desc: "From nutrition advice to exercise routines, we're here to support your journey toward a healthier",
    img: blog2Img
  },
  {
    type: "Doctor",
    date: "24 Dec, 2023",
    title: "Our patients' journeys are filled with courage, resilience, and triumph.",
    desc: "In this section, we share inspiring narratives of individuals who have overcome health challenges.",
    img: blog3Img
  },
  {
    type: "Doctor",
    date: "24 Dec, 2023",
    title: "From organizing health fairs to partnering with local organizations",
    desc: "Find out how you can participate in community events and contribute to the health.",
    img: blog4Img
  },
]

export const footerContactInfo = [
  { id: "address", label: "123 Road, Dhaka, Bangladesh", icon: locationIcon },
  { id: "phone",   label: "+88017010767000",             icon: phoneIcon },
  { id: "email",   label: "sajiburdemo121@gmail.com",     icon: emailIcon },
];

export const footerQuickLinks = [
  { id: "home",     label: "Home",     href: "/" },
  { id: "about",    label: "About",    href: "/" },
  { id: "services", label: "Services", href: "/" },
  { id: "careers",  label: "Careers",  href: "/" },
  { id: "contact",  label: "Contact",  href: "/" },
];

export const footerSpecialties = [
  { id: "anesthesiology",   label: "Anesthesiology",   href: "#" },
  { id: "psychiatry",       label: "Psychiatry",        href: "#" },
  { id: "general-surgery",  label: "General surgery",   href: "#" },
  { id: "family-medicine",  label: "Family medicine",   href: "#" },
  { id: "pediatrics",       label: "Pediatrics",        href: "#" },
];

export const footerServices = [
  { id: "medical",      label: "Medical",      href: "#" },
  { id: "operation",    label: "Operation",    href: "#" },
  { id: "laboratory",   label: "Laboratory",   href: "#" },
  { id: "icu",          label: "ICU",          href: "#" },
  { id: "patient-ward", label: "Patient Ward", href: "#" },
];

export const footerSocialLinks = [
  { id: "facebook",  icon: fbIcon,       href: "#", label: "Facebook"  },
  { id: "linkedin",  icon: linkedinIcon, href: "#", label: "LinkedIn"  },
  { id: "instagram", icon: instaIcon,    href: "#", label: "Instagram" },
  { id: "youtube",   icon: ytubeIcon,    href: "#", label: "YouTube"   },
];