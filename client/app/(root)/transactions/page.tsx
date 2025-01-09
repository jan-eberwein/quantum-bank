"use client"; // Marks this file as a Client Component

import React from "react";
import { useState } from "react";
import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionTable from "@/components/TransactionTable";
import TransactionTableFilterArea from "@/components/TransactionTableFilterArea"; // Import the new component

const mockAccounts = [
  {
    id: "12345",
    name: "Jan Eberwein",
    officialName: "",
    mask: "1010",
    currentBalance: "€10,000.00",
    transactions: [
      {
        $id: "1",
        name: "Johannes Eder",
        accountId: "12345",
        amount: -50.0,
        pending: true,
        category: "Friends & Family",
        date: "2024-12-15",
        $createdAt: "2024-12-15T10:00:00Z",
      },
      {
        $id: "2",
        name: "Salary Payment",
        accountId: "12345",
        amount: 2500.0,
        pending: false,
        category: "Salary",
        date: "2024-12-15",
        $createdAt: "2024-12-15T10:00:00Z",
      },
      {
        $id: "3",
        name: "McDonalds",
        accountId: "12345",
        amount: -18.0,
        pending: true,
        category: "Food & Beverages",
        date: "2024-06-03",
        $createdAt: "2024-06-03T10:00:00Z",
      },
      {
        $id: "4",
        name: "Amazon",
        accountId: "12345",
        amount: -45.0,
        pending: false,
        category: "Shopping",
        date: "2024-06-04",
        $createdAt: "2024-06-04T10:00:00Z",
      },
      {
        $id: "5",
        name: "Billa",
        accountId: "12345",
        amount: -72.0,
        pending: false,
        category: "Shopping",
        date: "2024-06-05",
        $createdAt: "2024-06-05T10:00:00Z",
      },
      {
        $id: "6",
        name: "Hofer",
        accountId: "12345",
        amount: -60.0,
        pending: false,
        category: "Shopping",
        date: "2024-06-06",
        $createdAt: "2024-06-06T10:00:00Z",
      },
      {
        $id: "7",
        name: "Tax Payment",
        accountId: "12345",
        amount: -300.0,
        pending: false,
        category: "Taxes",
        date: "2024-06-07",
        $createdAt: "2024-06-07T10:00:00Z",
      },
      {
        $id: "8",
        name: "Ikea",
        accountId: "12345",
        amount: -120.0,
        pending: false,
        category: "Shopping",
        date: "2024-06-08",
        $createdAt: "2024-06-08T10:00:00Z",
      },
      {
        $id: "9",
        name: "Florian Guggenberger",
        accountId: "12345",
        amount: -150.0,
        pending: false,
        category: "Friends & Family",
        date: "2024-06-09",
        $createdAt: "2024-06-09T10:00:00Z",
      },
      {
        $id: "10",
        name: "Linz Rent Payment",
        accountId: "12345",
        amount: -800.0,
        pending: true,
        category: "Housing",
        date: "2024-06-10",
        $createdAt: "2024-06-10T10:00:00Z",
      },
      {
        $id: "11",
        name: "Starbucks",
        accountId: "12345",
        amount: -7.5,
        pending: true,
        category: "Food & Beverages",
        date: "2024-06-11",
        $createdAt: "2024-06-11T10:00:00Z",
      },
      {
        $id: "12",
        name: "Netflix",
        accountId: "12345",
        amount: -15.0,
        pending: true,
        category: "Entertainment",
        date: "2024-06-12",
        $createdAt: "2024-06-12T10:00:00Z",
      },
      {
        $id: "13",
        name: "Lufthansa Flight",
        accountId: "12345",
        amount: -250.0,
        pending: true,
        category: "Travel",
        date: "2024-06-13",
        $createdAt: "2024-06-13T10:00:00Z",
      },
      {
        $id: "14",
        name: "McDonalds",
        accountId: "12345",
        amount: -22.0,
        pending: false,
        category: "Food & Beverages",
        date: "2024-06-14",
        $createdAt: "2024-06-14T10:00:00Z",
      },
      {
        $id: "15",
        name: "Hofer",
        accountId: "12345",
        amount: -55.0,
        pending: false,
        category: "Shopping",
        date: "2024-06-15",
        $createdAt: "2024-06-15T10:00:00Z",
      },
      {
        $id: "16",
        name: "Apple",
        accountId: "12345",
        amount: -1500.0,
        pending: false,
        category: "Electronics",
        date: "2024-06-16",
        $createdAt: "2024-06-16T10:00:00Z",
      },
      {
        $id: "17",
        name: "Florian Guggenberger",
        accountId: "12345",
        amount: -90.0,
        pending: false,
        category: "Friends & Family",
        date: "2024-06-17",
        $createdAt: "2024-06-17T10:00:00Z",
      },
      {
        $id: "18",
        name: "Vodafone",
        accountId: "12345",
        amount: -30.0,
        pending: false,
        category: "Utilities",
        date: "2024-06-18",
        $createdAt: "2024-06-18T10:00:00Z",
      },
      {
        $id: "19",
        name: "McDonalds",
        accountId: "12345",
        amount: -19.0,
        pending: false,
        category: "Food & Beverages",
        date: "2024-06-19",
        $createdAt: "2024-06-19T10:00:00Z",
      },
      {
        $id: "20",
        name: "Billa",
        accountId: "12345",
        amount: -45.0,
        pending: false,
        category: "Shopping",
        date: "2024-06-20",
        $createdAt: "2024-06-20T10:00:00Z",
      },
      {
        $id: "21",
        name: "Ryanair Flight",
        accountId: "12345",
        amount: -120.0,
        pending: false,
        category: "Travel",
        date: "2024-06-21",
        $createdAt: "2024-06-21T10:00:00Z",
      },
      {
        $id: "22",
        name: "Uber",
        accountId: "12345",
        amount: -18.0,
        pending: false,
        category: "Transport",
        date: "2024-06-22",
        $createdAt: "2024-06-22T10:00:00Z",
      },
      {
        $id: "23",
        name: "Johannes Eder",
        accountId: "12345",
        amount: -200.0,
        pending: false,
        category: "Friends & Family",
        date: "2024-06-23",
        $createdAt: "2024-06-23T10:00:00Z",
      },
      {
        $id: "24",
        name: "Müller",
        accountId: "12345",
        amount: -35.0,
        pending: false,
        category: "Shopping",
        date: "2024-06-24",
        $createdAt: "2024-06-24T10:00:00Z",
      },
      {
        $id: "25",
        name: "Spotify",
        accountId: "12345",
        amount: -10.0,
        pending: false,
        category: "Entertainment",
        date: "2024-06-25",
        $createdAt: "2024-06-25T10:00:00Z",
      },
      {
        $id: "26",
        name: "Tax Payment",
        accountId: "12345",
        amount: -350.0,
        pending: false,
        category: "Taxes",
        date: "2024-06-26",
        $createdAt: "2024-06-26T10:00:00Z",
      },
      {
        $id: "27",
        name: "OEBB Train Ticket",
        accountId: "12345",
        amount: -25.0,
        pending: false,
        category: "Transport",
        date: "2024-06-27",
        $createdAt: "2024-06-27T10:00:00Z",
      },
      {
        $id: "28",
        name: "Ikea",
        accountId: "12345",
        amount: -150.0,
        pending: false,
        category: "Shopping",
        date: "2024-06-28",
        $createdAt: "2024-06-28T10:00:00Z",
      },
      {
        $id: "29",
        name: "Dominos Pizza",
        accountId: "12345",
        amount: -20.0,
        pending: false,
        category: "Food & Beverages",
        date: "2024-06-29",
        $createdAt: "2024-06-29T10:00:00Z",
      },
      {
        $id: "30",
        name: "Flughafen Taxi",
        accountId: "12345",
        amount: -40.0,
        pending: false,
        category: "Transport",
        date: "2024-06-30",
        $createdAt: "2024-06-30T10:00:00Z",
      },
      {
        $id: "31",
        name: "Spotify",
        accountId: "12345",
        amount: -10.0,
        pending: false,
        category: "Entertainment",
        date: "2024-07-01",
        $createdAt: "2024-07-01T10:00:00Z",
      },
      {
        $id: "32",
        name: "Amazon",
        accountId: "12345",
        amount: -29.0,
        pending: false,
        category: "Shopping",
        date: "2024-07-02",
        $createdAt: "2024-07-02T10:00:00Z",
      },
      {
        $id: "33",
        name: "Netflix",
        accountId: "12345",
        amount: -15.0,
        pending: false,
        category: "Entertainment",
        date: "2024-07-03",
        $createdAt: "2024-07-03T10:00:00Z",
      },
      {
        $id: "34",
        name: "Uber Eats",
        accountId: "12345",
        amount: -32.0,
        pending: false,
        category: "Food & Beverages",
        date: "2024-07-04",
        $createdAt: "2024-07-04T10:00:00Z",
      },
      {
        $id: "35",
        name: "McDonalds",
        accountId: "12345",
        amount: -17.0,
        pending: false,
        category: "Food & Beverages",
        date: "2024-07-05",
        $createdAt: "2024-07-05T10:00:00Z",
      },
      {
        $id: "36",
        name: "GoPro",
        accountId: "12345",
        amount: -320.0,
        pending: false,
        category: "Electronics",
        date: "2024-07-06",
        $createdAt: "2024-07-06T10:00:00Z",
      },
      {
        $id: "37",
        name: "Volkswagen Car Payment",
        accountId: "12345",
        amount: -600.0,
        pending: false,
        category: "Vehicle",
        date: "2024-07-07",
        $createdAt: "2024-07-07T10:00:00Z",
      },
      {
        $id: "38",
        name: "Amazon Prime",
        accountId: "12345",
        amount: -70.0,
        pending: false,
        category: "Subscription",
        date: "2024-07-08",
        $createdAt: "2024-07-08T10:00:00Z",
      },
      {
        $id: "39",
        name: "Ikea",
        accountId: "12345",
        amount: -140.0,
        pending: false,
        category: "Shopping",
        date: "2024-07-09",
        $createdAt: "2024-07-09T10:00:00Z",
      },
      {
        $id: "40",
        name: "DHL Shipment",
        accountId: "12345",
        amount: -25.0,
        pending: false,
        category: "Shipping",
        date: "2024-07-10",
        $createdAt: "2024-07-10T10:00:00Z",
      },
      {
        $id: "41",
        name: "Spotify",
        accountId: "12345",
        amount: -10.0,
        pending: false,
        category: "Entertainment",
        date: "2024-07-11",
        $createdAt: "2024-07-11T10:00:00Z",
      },
      {
        $id: "42",
        name: "Post Office",
        accountId: "12345",
        amount: -25.0,
        pending: false,
        category: "Services",
        date: "2024-07-12",
        $createdAt: "2024-07-12T10:00:00Z",
      },
      {
        $id: "43",
        name: "Flughafen Wien Parking",
        accountId: "12345",
        amount: -22.0,
        pending: false,
        category: "Transport",
        date: "2024-07-13",
        $createdAt: "2024-07-13T10:00:00Z",
      },
      {
        $id: "44",
        name: "Urban Outfitters",
        accountId: "12345",
        amount: -75.0,
        pending: false,
        category: "Shopping",
        date: "2024-07-14",
        $createdAt: "2024-07-14T10:00:00Z",
      },
      {
        $id: "45",
        name: "Uber",
        accountId: "12345",
        amount: -18.0,
        pending: false,
        category: "Transport",
        date: "2024-07-15",
        $createdAt: "2024-07-15T10:00:00Z",
      },
      {
        $id: "46",
        name: "H&M Shopping",
        accountId: "12345",
        amount: -65.0,
        pending: false,
        category: "Shopping",
        date: "2024-07-16",
        $createdAt: "2024-07-16T10:00:00Z",
      },
      {
        $id: "47",
        name: "Vodafone",
        accountId: "12345",
        amount: -35.0,
        pending: false,
        category: "Utilities",
        date: "2024-07-17",
        $createdAt: "2024-07-17T10:00:00Z",
      },
      {
        $id: "48",
        name: "T-Mobile",
        accountId: "12345",
        amount: -40.0,
        pending: false,
        category: "Utilities",
        date: "2024-07-18",
        $createdAt: "2024-07-18T10:00:00Z",
      },
      {
        $id: "49",
        name: "Spotify",
        accountId: "12345",
        amount: -10.0,
        pending: false,
        category: "Entertainment",
        date: "2024-07-19",
        $createdAt: "2024-07-19T10:00:00Z",
      },
      {
        $id: "50",
        name: "Ikea",
        accountId: "12345",
        amount: -110.0,
        pending: false,
        category: "Shopping",
        date: "2024-07-20",
        $createdAt: "2024-07-20T10:00:00Z",
      }
    ],
  },
];

const Transactions = ({ searchParams: { page } }: { searchParams: { page: string } }) => {
  const currentPage = Number(page) || 1;

  const account = mockAccounts[0];
  const rowsPerPage = 14;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateFilter, setDateFilter] = React.useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });


  // Filter transactions based on search and category
  // Filter logic with date filtering added
  const filteredTransactions = account.transactions
      .filter(
          (t) =>
              selectedCategory === "All" ||
              t.category.toLowerCase() === selectedCategory.toLowerCase()
      )
      .filter((t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((t) => {
        const transactionDate = new Date(t.date);
        if (dateFilter.from && dateFilter.to) {
          return transactionDate >= dateFilter.from && transactionDate <= dateFilter.to;
        } else if (dateFilter.from) {
          return transactionDate.toDateString() === dateFilter.from.toDateString();
        }
        return true; // No date filter
      });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = filteredTransactions.slice(
      indexOfFirstTransaction,
      indexOfLastTransaction
  );

  return (
      <div className="transactions">
        <div className="transactions-header">
          <HeaderBox title="Transactions" subtext="" />
        </div>

        <div className="space-y-6">
          <div className="transactions-account">
            <div className="flex flex-col gap-2">
              <h2 className="text-18 font-bold text-white">{account.name}</h2>
              <p className="text-14 text-blue-25">{account.officialName}</p>
              <p className="text-14 font-semibold tracking-[1.1px] text-white">
                ●●●● ●●●● ●●●● {account.mask}
              </p>
            </div>

            <div className="transactions-account-balance">
              <p className="text-14">Current balance</p>
              <p className="text-24 text-center font-bold">
                {account.currentBalance}
              </p>
            </div>
          </div>

          {/* Use the new Filter Component */}
          <TransactionTableFilterArea
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
          />


          <section className="flex w-full flex-col gap-6">
            {/* Table */}
            <TransactionTable transactions={currentTransactions} />
            {totalPages > 1 && (
                <div className="my-4 w-full">
                  <Pagination totalPages={totalPages} page={currentPage} />
                </div>
            )}
          </section>

          {/* No Results Message */}
          {filteredTransactions.length === 0 && (
              <div className="text-center mt-4 text-gray-600">
                No transactions match your search or filters.
              </div>
          )}
        </div>
      </div>
  );
};

export default Transactions;
