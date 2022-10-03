import { Component } from 'react';
import { Content } from '../../view/common/containers/Content/Content';

type WordsProps = {};
type WordsState = {};

export class Words extends Component<WordsProps, WordsState> {
  render() {
    return <Content className="Words">Words</Content>;
  }
}
