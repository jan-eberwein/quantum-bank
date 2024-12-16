import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatAmount, formatDateTime, removeSpecialCharacters } from "@/lib/utils";
import { transactionCategoryStyles } from "@/constants";

const CategoryBadge = ({ category }: { category: string }) => {
    const {
        borderColor,
        backgroundColor,
        textColor,
        chipBackgroundColor,
    } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;

    return (
        <div className={`category-badge ${borderColor} ${chipBackgroundColor}`}>
            <div className={`size-2 rounded-full ${backgroundColor}`} />
            <p className={`text-[12px] font-medium ${textColor}`}>{category}</p>
        </div>
    );
};

const TransactionTable = ({ transactions }: { transactions: Transaction[] }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Filtering Logic
    const filteredTransactions = transactions
        .filter(
            (t) =>
                selectedCategory === "All" ||
                t.category.toLowerCase() === selectedCategory.toLowerCase()
        )
        .filter((t) =>
            removeSpecialCharacters(t.name)
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredTransactions.map((t) => (
                    <TableRow key={t.$id}>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{removeSpecialCharacters(t.name)}</span>
                            </div>
                        </TableCell>
                        <TableCell
                            className={`font-semibold ${
                                t.amount < 0 ? "text-red-600" : "text-green-600"
                            }`}
                        >
                            {formatAmount(t.amount)}
                        </TableCell>
                        <TableCell>
                            <span>{t.pending ? "Pending" : "Completed"}</span>
                        </TableCell>
                        <TableCell>{formatDateTime(new Date(t.date)).dateTime}</TableCell>
                        <TableCell>
                            <CategoryBadge category={t.category} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TransactionTable;
