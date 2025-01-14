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
import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

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

    const categories = [
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
    ];

    // Make filters readable by Copilot
    useCopilotReadable({
        description: "All available filter options for the user's transaction list",
        value: {
            searchQuery,
            selectedCategory,
            dateFilter,
        },
    });

    // Define Copilot action for filters
    useCopilotAction({
        name: "updateFilters",
        description: "Update the active filters for the transaction list",
        parameters: [
            {
                name: "filterType",
                type: "string",
                description: "The type of filter to update (searchQuery, category, or date)",
                required: true,
            },
            {
                name: "value",
                type: "string",
                description: "The new value for the filter",
                required: true,
            },
        ],
        handler: async ({ filterType, value }: { filterType: string; value: string }) => {
            try {
                if (filterType === "searchQuery") {
                    setSearchQuery(value);
                    updateQueryParams("searchQuery", value);
                } else if (filterType === "category") {
                    setSelectedCategory(value);
                    updateQueryParams("category", value);
                } else if (filterType === "date") {
                    // Handle the date input
                    let from: Date | null = null;
                    let to: Date | null = null;

                    console.log(value);
                    // Check if the input contains a range (e.g., "2024-07-01 to 2024-07-02")
                    if (value.includes(" to ")) {
                        const [fromRaw, toRaw] = value.split(" to ");
                        from = new Date(fromRaw.trim());
                        to = new Date(toRaw.trim());

                        // Validate the dates
                        if (isNaN(from.getTime()) || isNaN(to.getTime())) {
                            throw new Error("Invalid date range provided.");
                        }

                        // Format dates for query params
                        const formattedFrom = from.toISOString();
                        const formattedTo = to.toISOString();
                        updateQueryParams("date", `${formattedFrom}_${formattedTo}`);
                        setDateFilter({ from, to });
                    } else {
                        // Single date input (e.g., "2024-07-01")
                        from = new Date(value.trim());

                        // Validate the date
                        if (isNaN(from.getTime())) {
                            throw new Error("Invalid single date provided.");
                        }

                        // Format the single date for query params
                        const formattedFrom = from.toISOString();
                        updateQueryParams("date", formattedFrom);
                        setDateFilter({ from, to: undefined });
                    }
                } else {
                    console.error("Invalid filterType provided");
                }

                console.log(`Updated ${filterType}:`, value);
            } catch (error) {
                console.error("Error updating filters:", error.message);
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
                className="w-2/3 space-y-6"
                onValueChange={(value) => {
                    setSelectedCategory(value);
                    updateQueryParams("category", value);
                }}
            >
                <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder={selectedCategory || "Select Category"} />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                            {category}
                        </SelectItem>
                    ))}
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
                    className={cn("popover-content w-auto p-0 bg-white")}
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
                                );
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
