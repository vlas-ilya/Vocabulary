import { Component } from 'react';
import { Content } from '../../view/common/containers/Content/Content';

type HomeProps = {};
type HomeState = {};

export class Home extends Component<HomeProps, HomeState> {
  render() {
    return <Content className="Home">Home</Content>;
  }
}
