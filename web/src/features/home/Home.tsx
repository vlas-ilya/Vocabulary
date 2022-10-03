import { Component } from 'react';
import { Content } from '../../view/common/containers/Content/Content';

type HomeState = {};

export class Home extends Component<{}, HomeState> {
  render() {
    return <Content className="Home">
      Test
    </Content>;
  }
}
