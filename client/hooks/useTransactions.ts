/*"use client";

import { useEffect, useState } from 'react';
import transactionApi from '../api/transactionApi';
import {mapTransactionApiToTransaction} from "@/lib/utils";

const useTransactions = (accountId: number) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            setError(null);

            try {
                const apiTransactions: TransactionApi[] = await transactionApi.getTransactionsByAccountId(accountId);
                const mappedTransactions: Transaction[] = apiTransactions.map(mapTransactionApiToTransaction);
                setTransactions(mappedTransactions);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [accountId]);

    return { transactions, loading, error };
};

export default useTransactions;
*/

import { useEffect, useState } from "react";
import transactionApi from '../api/transactionApi';
import {mapTransactionApiToTransaction} from "@/lib/utils";

const useTransactions = (accountId: number) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            setError(null);

            try {
                const apiTransactions: TransactionApi[] =
                    await transactionApi.getTransactionsByAccountId(accountId);

                // Pass accountId to map function to adjust amount
                const mappedTransactions: Transaction[] = apiTransactions.map((transaction) =>
                    mapTransactionApiToTransaction(transaction, accountId)
                );

                setTransactions(mappedTransactions);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [accountId]);

    return { transactions, loading, error };
};

export default useTransactions;
