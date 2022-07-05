import TextInputBox from "./InputField";

const SuggestionsListComponent = () => {
  return filteredSuggestions.length ? (
    <ul class="suggestions">
      {filteredSuggestions.map((suggestion, index) => {
        let className;
        // Flag the active suggestion with a class
        if (index === activeSuggestionIndex) {
          className = "suggestion-active";
        }
        return (
          <li className={className} key={suggestion} onClick={onClick}>
            {suggestion}
          </li>
        );
      })}
    </ul>
  ) : (
    <div class="no-suggestions">
      <em>No suggestions, you're on your own!</em>
    </div>
  );
};

export const AutoComplete = (props) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClickSuggestion = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  return (
    <>
      <TextInputBox handleChange={handleInputChange} />
      {showSuggestions && input && (
        <SuggestionsListComponent onClick={onClickSuggestion} />
      )}
    </>
  );
};
