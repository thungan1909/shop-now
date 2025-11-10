import { ROUTES_CONSTANTS } from "../../../routers/constants";

const menuConfig = {
  primary: ["Home", "Product", "Cart"],
  // more: ["Feeds", "Ranking List"],
};

export const menuItems = [
  { href: ROUTES_CONSTANTS.HOMEPAGE, label: "Home" },
  { href: ROUTES_CONSTANTS.PRODUCT, label: "Product" },
];

export const primaryMenuItems = menuItems.filter((item) =>
  menuConfig.primary.includes(item.label)
);

// export const moreMenuItems = menuItems.filter((item) =>
//   menuConfig.more.includes(item.label)
// );
