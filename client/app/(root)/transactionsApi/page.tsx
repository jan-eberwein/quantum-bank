/*"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionTable from "@/components/TransactionTable";
import useTransactions from "@/hooks/useTransactions";

const Transactions = () => {
    const searchParams = useSearchParams(); // Retrieve search params
    const page = searchParams.get("page"); // Get the 'page' param
    const currentPage = Number(page) || 1;

    // Replace the hardcoded account ID with the actual account ID you'd like to fetch
    const accountId = 1; // Belongs to user id=7 (alice)
    //const accountId = 2; // Belongs to user id=7 (bob)
    //const accountId = 3; // Belongs to user id=7 (charlie)
    //const accountId = 4; // Belongs to user id=4 (testuser)
    //const accountId = 5; // Belongs to user id=7 (newuser2)
    const rowsPerPage = 14;

    // Use the custom hook to fetch transactions
    const { transactions, loading, error } = useTransactions(accountId);

    if (loading) {
        return <div>Loading transactions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Calculate pagination details
    const totalPages = Math.ceil((transactions?.length || 0) / rowsPerPage);
    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
    const currentTransactions = transactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

    // Simulate account details (replace with actual account data if available via API)
    const account = {
        name: "Jan Eberwein",
        officialName: "",
        mask: "1010",
        currentBalance: "€10,000.00", // Replace with actual balance if needed
    };

    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox title="Transactions (API)" subtext={""} />
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

                <section className="flex w-full flex-col gap-6">
                    <TransactionTable transactions={currentTransactions} />
                    {totalPages > 1 && (
                        <div className="my-4 w-full">
                            <Pagination totalPages={totalPages} page={currentPage} />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Transactions;
*/

/*"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionTable from "@/components/TransactionTable";
import useTransactions from "@/hooks/useTransactions";
import useUser from "@/hooks/useUser";

const Transactions = () => {
    const searchParams = useSearchParams(); // Retrieve search params
    const page = searchParams.get("page"); // Get the 'page' param
    const currentPage = Number(page) || 1;
    const rowsPerPage = 14;

    // Fetch user data
    const { user, loading: userLoading, error: userError } = useUser();

    if (userLoading) return <div>Loading user data...</div>;
    if (userError) return <div>Error fetching user: {userError}</div>;
    if (!user) return <div>No user data available.</div>;

    // Use the user's ID to fetch transactions
    const accountId = user.user_id; // Assuming the user's ID is used for transactions
    const { transactions, loading: transactionsLoading, error: transactionsError } =
        useTransactions(accountId);

    if (transactionsLoading) return <div>Loading transactions...</div>;
    if (transactionsError) return <div>Error fetching transactions: {transactionsError}</div>;

    // Calculate pagination details
    const totalPages = Math.ceil((transactions?.length || 0) / rowsPerPage);
    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
    const currentTransactions = transactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

    // User data for display
    const userDisplayData = {
        name: user.username,
        email: user.email,
        userId: user.user_id,
        creationDate: new Date(user.created_at).toLocaleDateString(), // Format as needed
    };

    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox title="Transactions (API)" subtext="" />
            </div>

            <div className="space-y-6">
                <div className="transactions-account">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-18 font-bold text-white">{userDisplayData.name}</h2>
                        <p className="text-14 text-blue-25">{userDisplayData.email}</p>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            User ID: {userDisplayData.userId}
                        </p>
                        <p className="text-14 text-blue-25">Joined: {userDisplayData.creationDate}</p>
                    </div>
                </div>

                <section className="flex w-full flex-col gap-6">
                    <TransactionTable transactions={currentTransactions} />
                    {totalPages > 1 && (
                        <div className="my-4 w-full">
                            <Pagination totalPages={totalPages} page={currentPage} />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Transactions;
*/

/*"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionTable from "@/components/TransactionTable";
import useTransactions from "@/hooks/useTransactions";
import useUser from "@/hooks/useUser";

const Transactions = () => {
    const searchParams = useSearchParams(); // Retrieve search params
    const page = searchParams.get("page"); // Get the 'page' param
    const currentPage = Number(page) || 1;
    const rowsPerPage = 14;

    // Fetch user data
    const { user, loading: userLoading, error: userError } = useUser();

    console.log("here");
    console.log(user);
    // Determine accountId (but always call the hook)
    const accountId = user?.user_id || 0; // Default to 0 if user is not loaded

    // Fetch transactions for the account
    const { transactions, loading: transactionsLoading, error: transactionsError } =
        useTransactions(accountId);

    // Handle user loading or error state
    if (userLoading) return <div>Loading user data...</div>;
    if (userError) return <div>Error fetching user: {userError}</div>;
    if (!user) return <div>No user data available.</div>;

    // Handle transactions loading or error state
    if (transactionsLoading) return <div>Loading transactions...</div>;
    if (transactionsError) return <div>Error fetching transactions: {transactionsError}</div>;

    // Calculate pagination details
    const totalPages = Math.ceil((transactions?.length || 0) / rowsPerPage);
    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
    const currentTransactions = transactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

    // User data for display
    const userDisplayData = {
        name: user.username,
        email: user.email,
        userId: user.user_id,
        creationDate: new Date(user.created_at).toLocaleDateString(), // Format as needed
    };

    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox title="Transactions (API)" subtext="" />
            </div>

            <div className="space-y-6">
                <div className="transactions-account">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-18 font-bold text-white">{userDisplayData.name}</h2>
                        <p className="text-14 text-blue-25">{userDisplayData.email}</p>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            User ID: {userDisplayData.userId}
                        </p>
                        <p className="text-14 text-blue-25">Joined: {userDisplayData.creationDate}</p>
                    </div>
                </div>

                <section className="flex w-full flex-col gap-6">
                    <TransactionTable transactions={currentTransactions} />
                    {totalPages > 1 && (
                        <div className="my-4 w-full">
                            <Pagination totalPages={totalPages} page={currentPage} />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Transactions;
*/

/*"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionTable from "@/components/TransactionTable";
import useTransactions from "@/hooks/useTransactions";
import useUser from "@/hooks/useUser";

const Transactions = () => {
    const searchParams = useSearchParams(); // Retrieve search params
    const page = searchParams.get("page"); // Get the 'page' param
    const currentPage = Number(page) || 1;
    const rowsPerPage = 14;

    // Fetch user data
    const { user, loading: userLoading, error: userError } = useUser();

    console.log("here");
    console.log(user); // Debug log for user

    // If user data is still loading, show a loading state
    if (userLoading) return <div>Loading user data...</div>;

    // If there's an error fetching user data
    if (userError) return <div>Error fetching user: {userError}</div>;

    // Ensure user data is defined (edge case safety)
    if (!user) return <div>No user data available.</div>;

    // Use the user's ID to fetch transactions
    const accountId = user.user_id;
    const { transactions, loading: transactionsLoading, error: transactionsError } =
        useTransactions(accountId);

    if (transactionsLoading) return <div>Loading transactions...</div>;
    if (transactionsError) return <div>Error fetching transactions: {transactionsError}</div>;

    // Calculate pagination details
    const totalPages = Math.ceil((transactions?.length || 0) / rowsPerPage);
    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
    const currentTransactions = transactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

    // User data for display
    const userDisplayData = {
        name: user.username,
        email: user.email,
        userId: user.user_id,
        creationDate: new Date(user.created_at).toLocaleDateString(), // Format as needed
    };

    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox title="Transactions (API)" subtext="" />
            </div>

            <div className="space-y-6">
                <div className="transactions-account">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-18 font-bold text-white">{userDisplayData.name}</h2>
                        <p className="text-14 text-blue-25">{userDisplayData.email}</p>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            User ID: {userDisplayData.userId}
                        </p>
                        <p className="text-14 text-blue-25">Joined: {userDisplayData.creationDate}</p>
                    </div>
                </div>

                <section className="flex w-full flex-col gap-6">
                    <TransactionTable transactions={currentTransactions} />
                    {totalPages > 1 && (
                        <div className="my-4 w-full">
                            <Pagination totalPages={totalPages} page={currentPage} />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Transactions;
*/

"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionTable from "@/components/TransactionTable";
import useTransactions from "@/hooks/useTransactions";
import useUser from "@/hooks/useUser";

const Transactions = () => {
    const searchParams = useSearchParams(); // Retrieve search params
    const page = searchParams.get("page"); // Get the 'page' param
    const currentPage = Number(page) || 1;
    const rowsPerPage = 14;

    // Fetch user data
    const { user, loading: userLoading, error: userError } = useUser();

    // Ensure accountId is defined (use 0 or null if user isn't loaded yet)
    //const accountId = user?.user_id || 0;
    // Replace the hardcoded account ID with the actual account ID you'd like to fetch
    const accountId = 1; // Belongs to user id=7 (alice)
    //const accountId = 2; // Belongs to user id=7 (bob)
    //const accountId = 3; // Belongs to user id=7 (charlie)
    //const accountId = 4; // Belongs to user id=4 (testuser)
    //const accountId = 5; // Belongs to user id=7 (newuser2)


    // Always call useTransactions with a valid accountId
    const { transactions, loading: transactionsLoading, error: transactionsError } =
        useTransactions(accountId);

    // Handle user loading or error state
    if (userLoading) {
        return <div>Loading user data...</div>;
    }

    if (userError) {
        return <div>Error fetching user: {userError}</div>;
    }

    // Ensure user data is defined (safety check)
    if (!user) {
        return <div>No user data available.</div>;
    }

    // Handle transactions loading or error state
    if (transactionsLoading) {
        return <div>Loading transactions...</div>;
    }

    if (transactionsError) {
        return <div>Error fetching transactions: {transactionsError}</div>;
    }

    // Calculate pagination details
    const totalPages = Math.ceil((transactions?.length || 0) / rowsPerPage);
    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
    const currentTransactions = transactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

    // User data for display
    const userDisplayData = {
        name: user.username,
        email: user.email,
        userId: user.user_id,
        creationDate: new Date(user.created_at).toLocaleDateString(), // Format as needed
    };

    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox title="Transactions (API)" subtext="" />
            </div>

            <div className="space-y-6">
                <div className="transactions-account">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-18 font-bold text-white">{userDisplayData.name}</h2>
                        <p className="text-14 text-blue-25">{userDisplayData.email}</p>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            User ID: {userDisplayData.userId}
                        </p>
                        <p className="text-14 text-blue-25">Joined: {userDisplayData.creationDate}</p>
                    </div>
                </div>

                <section className="flex w-full flex-col gap-6">
                    <TransactionTable transactions={currentTransactions} />
                    {totalPages > 1 && (
                        <div className="my-4 w-full">
                            <Pagination totalPages={totalPages} page={currentPage} />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Transactions;