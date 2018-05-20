import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Card, Spin } from 'antd';
import moment from 'moment';

import { VoteButton } from '../VoteButtons';
import { Header } from '../Header';
import { Search } from '../Search';
import { Info } from '../Info';

import { getQuestions, questionActions, getLoadingStatus } from '../../reducers/question';
import { getSearch, searchActions } from '../../reducers/search';

import { createContext, createDraggableItem } from '../../HOC/DnD';
import { Loaiding } from '../../HOC/Loading';

import './index.css';

const Container = createContext(Collapse);
const CardWrapped = Loaiding(Spin)(Card);
const Item = createDraggableItem({
  type: 'question',
  beginDrag: props => ({
    id: props.id,
    index: props.index
  })
})(Header);

const format = 'DD.MM.YYYY';

class Question extends Component {

  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.moveItem = this.moveItem.bind(this);
  }

  onVoteUp(id) {
    this.props.increment(id);
  }

  onVoteDown(id) {
    this.props.decrement(id);
  }

  componentDidMount() {
    this.props.getQuestions(moment(this.props.searhValues.date, format), this.props.searhValues.q);
  }

  onSearch(date) {
    this.props.setDate(date);
    this.props.getQuestions(moment(date, format), this.props.searhValues.q);
  }

  moveItem(from, to) {
    this.props.changeOrder(from, to);
  }

  render() {

    const { questions, searhValues, isLoading } = this.props;

    return (
      <div className='question'>
        <Search onSearch={this.onSearch} searchValue={searhValues.q} searchDate={moment(searhValues.date, format)} format={format} />
        <CardWrapped status={isLoading}>
          {questions.length > 0 ?
            <Container accordion >
              {questions.map((q, i) =>
                <Collapse.Panel
                  key={q.question_id}
                  showArrow={false}
                  header={<Item
                    id={q.question_id}
                    index={i}
                    actions={<VoteButton onUp={this.onVoteUp.bind(this, q.question_id)} onDown={this.onVoteDown.bind(this, q.question_id)} />}
                    title={q.title}
                    score={q.score}
                    active={q.is_answered}
                    moveItem={this.moveItem}
                  />
                  }>
                  <Info viewCount={q.view_count} ownerName={q.owner.display_name} ownerReputation={q.owner.reputation} />
                </Collapse.Panel>
              )}
            </Container>
            : <p>Not found</p>
          }
        </CardWrapped>
      </div>
    )
  }
}

export default connect(
  store => ({
    questions: getQuestions(store),
    isLoading: getLoadingStatus(store),
    searhValues: getSearch(store)
  }),
  {
    ...questionActions,
    ...searchActions
  }
)(Question);
