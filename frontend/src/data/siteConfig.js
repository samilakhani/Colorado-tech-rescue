// Central place for business info used across the site.
// Update phone/email/hours here and it updates everywhere.
export const business = {
  name: "Colorado Tech Rescue",
  phone: "(719) 357-5532",
  phoneHref: "tel:+17193575532",
  email: "Coloradotechrescue@gmail.com",
  emailHref: "mailto:Coloradotechrescue@gmail.com",
  serviceArea: "Monument, Palmer Lake, North Colorado Springs & the Tri-Lakes area",
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { days: "Saturday", time: "10:00 AM – 3:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  googleBusinessUrl: "https://www.google.com/search?q=Colorado+Tech+Rescue",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Recent Work", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/#faq" },
];

// Service categories, mirroring the requirements doc. Used on Home (summary)
// and Services (full detail) pages, and populates the Contact form's
// "Service Needed" dropdown.
export const serviceCategories = [
  {
    id: "computer-laptop-repair",
    title: "Computer & Laptop Repair",
    summary: "Diagnostics and repair for desktops and laptops that won't start, run slow, or act up.",
    items: [
      "Computer & laptop diagnostics",
      "No-power / no-display troubleshooting",
      "Hardware troubleshooting",
      "Overheating & thermal problems",
      "Windows problems & startup issues",
      "Virus & malware removal",
      "Performance tune-ups",
    ],
  },
  {
    id: "hardware-upgrades",
    title: "Hardware Repair & Upgrades",
    summary: "Give an aging machine new life with faster storage, more memory, or replacement parts.",
    items: [
      "SSD / NVMe upgrades",
      "RAM upgrades",
      "Battery replacement",
      "Laptop screen replacement",
      "Laptop hinge & case repair",
      "Keyboard replacement",
      "Cooling fan replacement",
      "Thermal paste service",
    ],
  },
  {
    id: "phone-tablet-repair",
    title: "Phone & Tablet Repair",
    summary: "Screen, battery, and charging repairs for most phone and tablet brands.",
    items: [
      "Screen replacement",
      "Battery replacement",
      "Charging & power troubleshooting",
      "Hardware diagnostics",
      "Tablet repair",
      "General mobile troubleshooting",
    ],
    note: "Availability depends on the specific device and parts on hand.",
  },
  {
    id: "data-software",
    title: "Data & Software Services",
    summary: "Keep your files safe and your software running the way it should.",
    items: [
      "Data backup",
      "Data transfer",
      "Drive replacement & migration",
      "Windows installation / reinstallation",
      "New computer setup",
      "Software troubleshooting",
      "Data recovery assessment",
    ],
  },
  {
    id: "in-home-support",
    title: "In-Home Tech Support",
    summary: "On-site help for the tech problems that are easier to fix in person.",
    items: [
      "Computer problems",
      "Wi-Fi & network troubleshooting",
      "Printer setup & repair",
      "Monitor & peripheral setup",
      "New device setup",
      "General household technology help",
    ],
  },
  {
    id: "custom-pc-builds",
    title: "Custom PC Building",
    summary: "Not sure what parts you need? We'll help you plan a build around your budget and use case.",
    items: [
      "Custom gaming PCs",
      "Workstation / productivity PCs",
      "Component selection & sourcing",
      "PC assembly",
      "Windows installation & BIOS setup",
      "Driver installation",
      "Stability & temperature testing",
      "Upgrades to existing PCs",
      "Troubleshooting customer-built PCs",
    ],
  },
  {
    id: "refurbishment",
    title: "Computer & Laptop Refurbishment",
    summary: "Before replacing your computer, let us see if it makes sense to refurbish it instead.",
    items: [
      "Refurbishing older laptops & desktops",
      "SSD & RAM upgrades",
      "Battery replacement",
      "Keyboard, screen & cosmetic repair",
      "Internal cleaning",
      "Thermal servicing",
      "Windows installation & data migration",
      "Performance testing",
    ],
  },
];
