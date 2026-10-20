import { useState, type ChangeEvent, type FormEvent } from "react";

interface UseSearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

export const useSearchBar = ({ onSearch, initialValue = "" }: UseSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue);

  const onSearchBarChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    onSearchBarChange,
    handleOnSubmit,
  };
};

export default useSearchBar;
