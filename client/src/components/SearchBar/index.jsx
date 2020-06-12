import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { BsSearch } from 'react-icons/bs';

import './styles.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
  }

  handleFormSubmission = (event) => {
    event.preventDefault();
    const { term } = this.state;
    if (term.length > 0) this.props.history.push(`/search?term=${term}`);
  };

  handleTermInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      term: value
    });
  };

  render() {
    return (
      <form className='search-bar flex flex-row' onSubmit={this.handleFormSubmission}>
        <div>
          <button>
            <BsSearch />
          </button>
        </div>
        <div>
          <input
            type='search'
            placeholder='Find more...'
            value={this.state.term}
            onChange={this.handleTermInputChange}
          />
        </div>
      </form>
    );
  }
}

// In the search bar component, we'll need to use the history prop
// that is passed by the router to any view
// Since this component IS NOT a view (it's not being passed to a Route component)
// we need to wrap it in the `withRouter` function
const SearchBarWithRouterProps = withRouter(SearchBar);

export default SearchBarWithRouterProps;
