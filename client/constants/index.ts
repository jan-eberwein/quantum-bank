export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transactions",
    label: "Transactions",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transactionsApi",
    label: "Transactions (API)",
  },
  {
    imgURL: "/icons/user.svg",
    route: "/account",
    label: "Account Settings",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];


export const topCategoryStyles = {
  "Food & Beverages": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/food-drink.svg",
  },
  "Travel": {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/travel.svg",
  },
  "Shopping": {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
  default: {
    bg: "bg-gray-25",
    circleBg: "bg-gray-100",
    text: {
      main: "text-gray-900",
      count: "text-gray-700",
    },
    progress: {
      bg: "bg-gray-100",
      indicator: "bg-gray-700",
    },
    icon: "/icons/category.svg",
  }
};

export const transactionCategoryStyles = {
  "Food & Beverages": {
    borderColor: "border-pink-600",
    backgroundColor: "bg-pink-500",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Salary": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Shopping": {
    borderColor: "border-blue-600",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Taxes": {
    borderColor: "border-red-600",
    backgroundColor: "bg-red-500",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Housing": {
    borderColor: "border-purple-600",
    backgroundColor: "bg-purple-500",
    textColor: "text-purple-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Friends & Family": {
    borderColor: "border-indigo-600",
    backgroundColor: "bg-indigo-500",
    textColor: "text-indigo-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Entertainment": {
    borderColor: "border-yellow-600",
    backgroundColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Travel": {
    borderColor: "border-green-600",
    backgroundColor: "bg-green-500",
    textColor: "text-green-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Transport": {
    borderColor: "border-cyan-600",
    backgroundColor: "bg-cyan-500",
    textColor: "text-cyan-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Electronics": {
    borderColor: "border-gray-600",
    backgroundColor: "bg-gray-500",
    textColor: "text-gray-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Utilities": {
    borderColor: "border-orange-600",
    backgroundColor: "bg-orange-500",
    textColor: "text-orange-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Subscription": {
    borderColor: "border-teal-600",
    backgroundColor: "bg-teal-500",
    textColor: "text-teal-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Shipping": {
    borderColor: "border-sky-600",
    backgroundColor: "bg-sky-500",
    textColor: "text-sky-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Services": {
    borderColor: "border-lime-600",
    backgroundColor: "bg-lime-500",
    textColor: "text-lime-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Vehicle": {
    borderColor: "border-amber-600",
    backgroundColor: "bg-amber-500",
    textColor: "text-amber-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Processing": {
    borderColor: "border-[#ffc629]",
    backgroundColor: "bg-[#b0891c]",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#ffe291]",
  },
  "Success": {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};