import { Component } from 'react';
import { Content } from '../../view/common/containers/Content/Content';

type TeacherStudentsProps = {};
type TeacherStudentsState = {};

export class TeacherStudents extends Component<TeacherStudentsProps, TeacherStudentsState> {
  render() {
    return <Content className="TeacherStudent">TeacherStudents</Content>;
  }
}
