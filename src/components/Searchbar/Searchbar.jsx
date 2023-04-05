import React, {Component} from "react";
import { SearchbarContainer, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";
import { toast } from 'react-toastify';
import { FcSearch } from "react-icons/fc";


class Searchbar extends Component {
    state = {
        query: '',
        page: 1,
    }

    resetPage() {
        this.setState({page: 1})
    }

    incrementPage() {
        this.setState(prevState => {
            return { page: prevState.page + 1 };
        })
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
                        <FcSearch size={32}/>
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