"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionTable from "@/components/TransactionTable";
import TransactionTableFilterArea from "@/components/TransactionTableFilterArea";
import { useCopilotReadable } from "@copilotkit/react-core";
import { mockAccounts } from "@/constants/index";

const Transactions = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageParam = searchParams.get("page") || "1";
    const currentPage = Number(pageParam);

    const account = mockAccounts[0];
    const rowsPerPage = 14;

    const [searchQuery, setSearchQuery] = useState(searchParams.get("searchQuery") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All Categories");
    const [dateFilter, setDateFilter] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: undefined,
        to: undefined,
    });

    // Update query parameters and reset page to 1
    const updateQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        params.set("page", "1"); // Reset to page 1
        router.push(`?${params.toString()}`);
    };

    // Filter transactions based on filters
    const filteredTransactions = account.transactions
        .filter((t) => selectedCategory === "All Categories" || t.category.toLowerCase() === selectedCategory.toLowerCase())
        .filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
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

    useCopilotReadable({
        description: "All transactions of the user's bank account.",
        value: account.transactions,
    });

    useCopilotReadable({
        description: "All transactions of the user's bank account that apply to the currently set filters.",
        value: filteredTransactions,
    });

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
                        <p className="text-24 text-center font-bold">{account.currentBalance}</p>
                    </div>
                </div>

                {/* Filter Component */}
                <TransactionTableFilterArea
                    searchQuery={searchQuery}
                    setSearchQuery={(value) => {
                        setSearchQuery(value);
                        updateQueryParams("searchQuery", value);
                    }}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={(value) => {
                        setSelectedCategory(value);
                        updateQueryParams("category", value);
                    }}
                    dateFilter={dateFilter}
                    setDateFilter={(filter) => {
                        setDateFilter(filter);
                        const from = filter.from ? filter.from.toISOString() : "";
                        const to = filter.to ? filter.to.toISOString() : "";
                        updateQueryParams("dateFilter", `${from}_${to}`);
                    }}
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