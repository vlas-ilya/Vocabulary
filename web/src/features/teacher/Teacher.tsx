import { Component } from 'react';
import { Content } from '../../view/common/containers/Content/Content';

type TeacherProps = {};
type TeacherState = {};

export class Teacher extends Component<TeacherProps, TeacherState> {
  render() {
    return <Content className="Teacher">Teacher</Content>;
  }
}
