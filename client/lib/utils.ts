/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mo')
    month: "short", // abbreviated month name (e.g., 'Okt')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 24-hour clock
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mo')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // two-digit month (e.g., '10')
    day: "2-digit", // two-digit day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Okt')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 24-hour clock
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "de-DE",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "de-DE",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "de-DE",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "de-DE",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  if (typeof value !== 'string') {
    return '';  // or handle it in a way that suits your needs
  }
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  transactions &&
    transactions.forEach((transaction) => {
      const category = transaction.category;

      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }

      totalCount++;
    });

  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  const parts = url.split("/");
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type: string) => z.object({
  firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
  lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
  address1: type === "sign-in" ? z.string().optional() : z.string().max(50),
  city: type === "sign-in" ? z.string().optional() : z.string().max(50),
  state: type === "sign-in" ? z.string().optional() : z.string().min(2).max(2),
  postalCode: type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
  dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(3),
  ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const mapTransactionApiToTransaction = (
    transaction: TransactionApi,
    accountId: number
): Transaction => ({
  $id: transaction.transaction_id.toString(),
  name: transaction.description,
  accountId: transaction.sender_account_id.toString(),
  amount:
      accountId === transaction.recipient_account_id
          ? Math.abs(transaction.amount) // Positive if received
          : -Math.abs(transaction.amount), // Negative if sent
  pending: transaction.status_name === "Pending", // Map "Pending" status
  category: transaction.category_name || "Uncategorized",
  date: new Date(transaction.transaction_date).toISOString(),
  $createdAt: new Date(transaction.transaction_date).toISOString(),
});