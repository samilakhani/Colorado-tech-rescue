import laptopScreen from "../assets/gallery/laptop-screen-before-after.jpg";
import tabletRepair from "../assets/gallery/tablet-screen-battery-before-after.jpg";
import ssdUpgrade from "../assets/gallery/ssd-upgrade-before-after.png";
import customBuild from "../assets/gallery/custom-pc-build.png";

export const galleryItems = [
  {
    id: 1,
    category: "Laptop Repair",
    title: "Cracked screen replacement — Dell laptop",
    description: "Shattered, unusable display replaced with a new screen — clear and fully functional again.",
    image: laptopScreen,
    beforeAfter: true,
  },
  {
    id: 2,
    category: "Phone & Tablet",
    title: "Tablet screen & battery replacement",
    description: "Cracked glass and poor battery life fixed with a new screen and battery.",
    image: tabletRepair,
    beforeAfter: true,
  },
  {
    id: 3,
    category: "Upgrades",
    title: "HDD to NVMe SSD upgrade",
    description: "Swapped a slow 1TB hard drive for a Samsung 990 EVO Plus NVMe SSD — boot times dropped from ~60-90s to ~5-10s.",
    image: ssdUpgrade,
    beforeAfter: true,
  },
  {
    id: 4,
    category: "Custom PC Builds",
    title: "Ryzen + GeForce RTX custom gaming build",
    description: "Clean build with full RGB lighting, cable management, and high-performance components.",
    image: customBuild,
    beforeAfter: false,
  },
];