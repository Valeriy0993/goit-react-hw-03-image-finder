import { Component } from 'react';

import styles from './searchbar-form.module.css';

class SearchbarForm extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({
      search: '',
    });
  };
  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;
    return (
      <>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <button type="submit" className={styles.searchFormButton}>
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>

          <input
            required
            value={search}
            onChange={handleChange}
            className={styles.searchFormInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </>
    );
  }
}

export default SearchbarForm;
