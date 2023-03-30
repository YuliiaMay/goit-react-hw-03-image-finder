import React from "react";
import { SearchbarContainer, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styled";


const Searchbar = () => (
    <SearchbarContainer>
        <SearchForm class="form">
            <SearchFormButton type="submit" class="button">
                <SearchFormButtonLabel class="button-label">Search</SearchFormButtonLabel>
            </SearchFormButton>

            <SearchFormInput
                class="input"
                type="text"
                autocomplete="off"
                autofocus
                placeholder="Search images and photos"
            />
        </SearchForm>
    </SearchbarContainer>
)

export default Searchbar;