import { Component } from 'react';
import { Content } from '../../view/common/containers/Content/Content';

type TrainingProps = {};
type TrainingState = {};

export class Trainings extends Component<TrainingProps, TrainingState> {
  render() {
    return <Content className="Training">Trainings</Content>;
  }
}
