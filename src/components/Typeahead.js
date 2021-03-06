import React from 'react';
import styled from 'styled-components';
import Button from './Button';


const Typeahead = ({ suggestions, handleSelect, categories }) => {
    const [value, setValue] = React.useState('');

    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(0);

    const [displayingSuggestions, setDisplayingSuggestions] = React.useState(false);

    let matchedSuggestions = suggestions
        .filter((suggestion) => {
            const minimumCharacters = value.length > 1;
            const containValue = suggestion.title
                .toLowerCase()
                .includes(value.toLowerCase());

            return minimumCharacters && containValue;
        })

    const showSuggestions = matchedSuggestions.length > 0 && displayingSuggestions;

    return (
        <div>
            <Search>
                <Input
                    type='text'
                    value={value}
                    onChange={(ev) => {
                        setValue(ev.target.value);
                        if (ev.target.value.length >= 1) {
                            setDisplayingSuggestions(true);
                        }
                    }}
                    onKeyDown={(ev) => {
                        switch (ev.key) {
                            case "Enter": {
                                handleSelect(matchedSuggestions[selectedSuggestionIndex].title);
                                return;
                            }
                            case "ArrowUp": {
                                if (matchedSuggestions.length >= 1) {
                                    if (selectedSuggestionIndex === 0) {
                                        return;
                                    }
                                    setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                                }
                                return;
                            }
                            case "ArrowDown": {
                                if (matchedSuggestions.length >= 1) {
                                    if (selectedSuggestionIndex === matchedSuggestions.length - 1) {
                                        return;
                                    }
                                    setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                                }
                                return;
                            }
                            case "Escape": {
                                setDisplayingSuggestions(false);
                                return;
                            }
                        }
                    }}
                />
                <Button onClick={() => setValue('')}>Clear</Button>
            </Search>
            {showSuggestions && (<SuggestionList>
                {matchedSuggestions.map((suggestion, index) => {

                    const isSelected = selectedSuggestionIndex === index;

                    return (
                        <Suggestions
                            key={suggestion.id}
                            style={{
                                background: isSelected ? 'beige' : 'transparent',
                            }}
                            onClick={() => handleSelect(suggestion.title)}
                            onMouseEnter={() => { setSelectedSuggestionIndex(index); }}
                        >
                            <span>
                                {suggestion.title.slice(0, suggestion.title.toLowerCase().indexOf(value) + value.length)}
                                <Prediction>{suggestion.title.slice(suggestion.title.toLowerCase().indexOf(value) + value.length)} </Prediction>
                                in <Category> {suggestion.categoryId}</Category>
                            </span>

                        </Suggestions>
                    );
                })}
            </SuggestionList>)}
        </div>
    )
}

const Search = styled.section`
    display: flex;
`

const Input = styled.input`
    border-radius: 10px;
    outline: none;
    font-size: 16px;
    padding: 0 5px;
`

const SuggestionList = styled.ul`
    list-style-type: none;
    margin-top: 5px;
    border-bottom-right-radius: 30px;
    border: 2px solid black;
    box-shadow: 1px 1px 3px 3px grey;
`

const Suggestions = styled.li`
    padding: 10px;
    border-bottom: 1px solid black;

    &:last-of-type{
        border-bottom-right-radius: 30px;
        border-bottom: none
    }
`

const Prediction = styled.span`
  font-weight: bold;
`

const Category = styled.span`
    font-style: italic;
    color: purple;
`

export default Typeahead;