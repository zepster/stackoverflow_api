import React from 'react';
import { DatePicker } from 'antd';
import { Button } from 'antd';

import './index.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDate: this.props.searchDate,
      selectedDate: null,
      showBtn: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchDate !== this.props.searchDate) {
      this.setState({searchDate: nextProps.searchDate, showBtn: false});
    }
  }

  onChange (newDate) {
    const prevDate = this.state.searchDate;
    if (newDate.isSame(prevDate)) {
      this.setState({ showBtn: false, selectedDate: null });
    } else {
      this.setState({ showBtn: true, selectedDate: newDate });
    }
  }

  onClick() {
    this.props.onSearch(this.state.selectedDate.format(this.props.format));
  }

  render () {
    const { showBtn } = this.state;
    return (
      <div className='search'>
        <h2>
          5 самых популярных вопросов на StackoverFlow, 
          содержащих "{this.props.searchValue}" в наименовании,
          начиная с <DatePicker allowClear={false} onChange={this.onChange} ref='datePicker' defaultValue={this.props.searchDate} format={this.props.format}/>
          {showBtn && <Button onClick={this.onClick}>Поиск</Button>}
        </h2>
        {this.state.showBtn}
      </div>
    );
  }
}

export default Search;
