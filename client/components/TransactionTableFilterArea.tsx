import React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface FilterAreaProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    dateFilter: { from: Date | null; to: Date | null };
    setDateFilter: (filter: { from: Date | null; to: Date | null }) => void;
}

const TransactionTableFilterArea: React.FC<FilterAreaProps> = ({
                                                                   searchQuery,
                                                                   setSearchQuery,
                                                                   selectedCategory,
                                                                   setSelectedCategory,
                                                                   dateFilter,
                                                                   setDateFilter,
                                                               }) => {
    const formatDate = (date: Date | null) =>
        date ? format(date, "MMM dd, yyyy") : "";

    return (
        <div className="filters mb-4 flex flex-wrap gap-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search transactions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border rounded-lg"
            />

            {/* Category Dropdown */}
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg"
            >
                <option value="All">All Categories</option>
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Housing">Housing</option>
                <option value="Friends & Family">Friends & Family</option>
            </select>

            {/* Date Filter */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[250px] justify-start">
                        {dateFilter && dateFilter.from && dateFilter.to
                            ? `${formatDate(dateFilter.from)} - ${formatDate(dateFilter.to)}`
                            : dateFilter && dateFilter.from
                                ? formatDate(dateFilter.from)
                                : "Select Date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50">
                    <Calendar
                        mode="range"
                        selected={dateFilter}
                        onSelect={(range) => {
                            setDateFilter({ from: range?.from ?? null, to: range?.to ?? null });
                        }}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default TransactionTableFilterArea;
