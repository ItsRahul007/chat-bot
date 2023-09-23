import { useState } from "react";

type UseStringArrayReturnType = {
    summary: string[];
    addSummary: (newItem: string) => void;
    clearSummary: () => void;
};

export default function useSummary(): UseStringArrayReturnType{
    const [summary, setSummaryCollection] = useState<string[]>([]);

    const addSummary = (newItem: string) => {
        setSummaryCollection((prevItem) => [...prevItem, newItem]);
    };

    const clearSummary = () => {
        setSummaryCollection([]);
    };

    return {
        summary,
        addSummary,
        clearSummary
    };
};