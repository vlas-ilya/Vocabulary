import { Component } from 'react';
import { Content } from '../../view/common/containers/Content/Content';

type LessonsProps = {};
type LessonsState = {};

export class Lessons extends Component<LessonsProps, LessonsState> {
  render() {
    return <Content className="Lessons">Lessons</Content>;
  }
}
