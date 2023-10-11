import { memo } from "preact/compat";
import { useMemo, useState } from "preact/hooks";
import SUGGESTIONDATA from "./configs/suggestedItems.json";
const Autocomplete = memo(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const suggestdItemSet = new Set(SUGGESTIONDATA);

  const filteredSuggestions = useMemo(() => {
    if (searchTerm === "") return [];
    // const filteredData = SUGGESTIONDATA.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredData: Array<string> = [];
    for (let items of suggestdItemSet) {
      if (items.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        filteredData.push(items);
        if (filteredData.length >= 5) break;
      }
    }
    return filteredData;
  }, [searchTerm]);

  const handleInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    setSearchTerm(value);
    if (value === "") return setSuggestions([]);

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div class="relative container m-auto h-screen flex flex-col gap-2 justify-center items-center p-4 max-w-2xl">
      <h1 class="text-3xl">Autocomplete Dropdown</h1>

      <input type="text" class="border rounded-lg p-2 w-48" value={searchTerm} onInput={handleInputChange} />
      {suggestions.length > 0 && (
        <ul class="relative z-10 w-48 mt-2 bg-white-200  text-white border rounded-lg">
          {suggestions.map((suggestion) => (
            <li class="p-2 cursor-pointer hover:bg-white-600 hover:text-bold hover:border border-white-solid" onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

const App = () => {
  return <Autocomplete />;
};

export default App;
