import { Component } from 'react';
import { Content } from '../../view/common/containers/Content/Content';

type StudentProps = {};
type StudentState = {};

export class Student extends Component<StudentProps, StudentState> {
  render() {
    return <Content className="Student">Student</Content>;
  }
}
