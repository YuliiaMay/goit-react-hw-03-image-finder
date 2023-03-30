import React, {Component} from "react";
import { SearchbarContainer, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styled";
import { toast } from 'react-toastify';


class Searchbar extends Component {
    state = {
        query: '',
    }

    handelChange = ({target: {value}}) => {
        this.setState({query: value.toLowerCase()})
    }

    handelSubmit = (e) => {
        e.preventDefault();

        if (this.state.query.trim() === '') {
            toast.warn('Please enter a search query');
            return;
        }

        this.props.onSubmit(this.state.query);
        this.reset();
    }

    reset = () => {
        this.setState({query: ''})
    }



    render() {
        return (
            <SearchbarContainer>
                <SearchForm onSubmit={this.handelSubmit}>
                    <SearchFormButton type="submit">
                        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    </SearchFormButton>

                    <SearchFormInput
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="query"
                        value={this.state.query}
                        onChange={this.handelChange}
                    />
                </SearchForm>
            </SearchbarContainer>
        )
    }
}

export default Searchbar;