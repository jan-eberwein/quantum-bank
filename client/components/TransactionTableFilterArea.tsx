import React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterAreaProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    dateFilter: { from: Date | undefined; to: Date | undefined };
    setDateFilter: (filter: { from: Date | undefined; to: Date | undefined }) => void;
    selectedStatus: string;
    setSelectedStatus: (value: string) => void;
    availableStatuses: string[];
    transactionType: string;
    setTransactionType: (value: string) => void;
}

const TransactionTableFilterArea: React.FC<FilterAreaProps> = ({
                                                                   searchQuery,
                                                                   setSearchQuery,
                                                                   selectedCategory,
                                                                   setSelectedCategory,
                                                                   dateFilter,
                                                                   setDateFilter,
                                                                   selectedStatus,
                                                                   setSelectedStatus,
                                                                   availableStatuses,
                                                                   transactionType,
                                                                   setTransactionType,
                                                               }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const formatDate = (date: Date | undefined) =>
        date ? format(date, "MMM dd, yyyy") : "";

    // Helper function to update query params and reset page
    const updateQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set(key, value);
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    // Copilot readable filters
    useCopilotReadable({
        description: "All active filters for the transaction table.",
        value: { searchQuery, selectedCategory, dateFilter, selectedStatus, transactionType },
    });

    // Copilot action to update filters
    useCopilotAction({
        name: "updateFilters",
        description: "Update filters for the transaction table.",
        parameters: [
            {
                name: "filterType",
                type: "string",
                description: "Type of filter to update (e.g., searchQuery, category, date, status, transactionType).",
                required: true,
            },
            {
                name: "value",
                type: "string",
                description: "New value for the specified filter.",
                required: true,
            },
        ],
        handler: async ({ filterType, value }: { filterType: string; value: string }) => {
            if (filterType === "searchQuery") {
                setSearchQuery(value);
                updateQueryParams("searchQuery", value);
            } else if (filterType === "category") {
                setSelectedCategory(value);
                updateQueryParams("category", value);
            } else if (filterType === "date") {
                const [from, to] = value.split("_");
                const parsedFrom = from ? new Date(from) : undefined;
                const parsedTo = to ? new Date(to) : undefined;
                setDateFilter({ from: parsedFrom, to: parsedTo });
                updateQueryParams("date", value);
            } else if (filterType === "status") {
                console.log(value);
                setSelectedStatus(value);
                updateQueryParams("status", value);
            } else if (filterType === "transactionType") {
                console.log(value);
                setTransactionType(value);
                updateQueryParams("transactionType", value);
            }
        },
    });

    return (
        <div className="filters mb-4 flex flex-wrap gap-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search transactions"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    updateQueryParams("searchQuery", e.target.value);
                }}
                className="px-4 py-2 border rounded-lg"
            />

            {/* Category Dropdown */}
            <Select
                onValueChange={(value) => {
                    setSelectedCategory(value);
                    updateQueryParams("category", value);
                }}
            >
                <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder={selectedCategory || "Select Category"} />
                </SelectTrigger>
                <SelectContent>
                    {[
                        "All Categories",
                        "Food & Beverages",
                        "Shopping",
                        "Travel",
                        "Entertainment",
                        "Housing",
                        "Friends & Family",
                        "Health & Fitness",
                        "Transportation",
                        "Utilities",
                        "Education",
                        "Personal Care",
                        "Insurance",
                        "Savings",
                        "Gifts",
                        "Others",
                    ].map((category) => (
                        <SelectItem key={category} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Transaction Type Dropdown */}
            <Select
                onValueChange={(value) => {
                    setTransactionType(value);
                    updateQueryParams("transactionType", value);
                }}
            >
                <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder={transactionType || "Select Transaction Type"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Incoming & Outgoing">Incoming & Outgoing</SelectItem>
                    <SelectItem value="incoming">Incoming payments only</SelectItem>
                    <SelectItem value="outgoing">Outgoing payments only</SelectItem>
                </SelectContent>
            </Select>

            {/* Status Dropdown */}
            <Select
                onValueChange={(value) => {
                    setSelectedStatus(value);
                    updateQueryParams("status", value);
                }}
            >
                <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder={selectedStatus || "Select Status"} />
                </SelectTrigger>
                <SelectContent>
                    {availableStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                            {status}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Date Range Picker */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-[250px] justify-start")}>
                        {dateFilter?.from && dateFilter?.to
                            ? `${formatDate(dateFilter.from)} - ${formatDate(dateFilter.to)}`
                            : dateFilter?.from
                                ? formatDate(dateFilter.from)
                                : "Select Date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn("popover-content w-auto p-0 bg-white")} align="start">
                    <Calendar
                        mode="range"
                        selected={{
                            from: dateFilter.from,
                            to: dateFilter.to,
                        }}
                        onSelect={(range) => {
                            setDateFilter({
                                from: range?.from ?? undefined,
                                to: range?.to ?? undefined,
                            });
                            const from = range?.from ? range.from.toISOString() : "";
                            const to = range?.to ? range.toISOString() : "";
                            updateQueryParams("date", `${from}_${to}`);
                        }}
                        numberOfMonths={1}
                        initialFocus
                        defaultMonth={dateFilter?.from}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default TransactionTableFilterArea;
