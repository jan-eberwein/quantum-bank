"use client";

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
import { useRouter, useSearchParams } from "next/navigation"; // Add hooks to manage query params
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FilterAreaProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    dateFilter: { from: Date | undefined; to: Date | undefined };
    setDateFilter: (filter: { from: Date | undefined; to: Date | undefined }) => void;
}

const TransactionTableFilterArea: React.FC<FilterAreaProps> = ({
                                                                   searchQuery,
                                                                   setSearchQuery,
                                                                   selectedCategory,
                                                                   setSelectedCategory,
                                                                   dateFilter,
                                                                   setDateFilter,
                                                               }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const formatDate = (date: Date | undefined) =>
        date ? format(date, "MMM dd, yyyy") : "";

    // Helper function to reset filters and navigate to page 1
    const updateQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set(key, value);
        params.set("page", "1"); // Always reset to page 1
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="filters mb-4 flex flex-wrap gap-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search transactions"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    updateQueryParams("searchQuery", e.target.value); // Update query params
                }}
                className="px-4 py-2 border rounded-lg"
            />

            {/* Updated Category Dropdown */}
            <Select
                className="w-2/3 space-y-6"
                onValueChange={(value) => {
                    setSelectedCategory(value);
                    updateQueryParams("category", value); // Update query params
                }}
            >
                <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder={selectedCategory || "Select Category"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Friends & Family">Friends & Family</SelectItem>
                </SelectContent>
            </Select>

            {/* Date Range Picker */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn("w-[250px] justify-start")}
                    >
                        {dateFilter?.from && dateFilter?.to
                            ? `${formatDate(dateFilter.from)} - ${formatDate(dateFilter.to)}`
                            : dateFilter?.from
                                ? formatDate(dateFilter.from)
                                : <span>Select Date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className={cn("popover-content w-auto p-0 bg-white")} /* Apply custom styles */
                    align="start"
                >
                    <div className="rounded-md border-none shadow-none">
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
                                updateQueryParams(
                                    "date",
                                    range?.from && range?.to
                                        ? `${range.from.toISOString()}_${range.to.toISOString()}`
                                        : ""
                                ); // Update query params
                            }}
                            numberOfMonths={1}
                            initialFocus
                            defaultMonth={dateFilter?.from}
                            disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                            }
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default TransactionTableFilterArea;
