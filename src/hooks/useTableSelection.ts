import { useState } from "react";

export const useTableSelection = ({ data }: { data: any[] }) => {
  const [selections, setSelections] = useState<number[]>([]);

  const toggleRow = (id: number) =>
    setSelections((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  const toggleAll = () => {
    setSelections((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );
  };

  const reset = () => {
    setSelections([]);
  };

  return {
    selections,
    toggleRow,
    toggleAll,
    reset,
  };
};
