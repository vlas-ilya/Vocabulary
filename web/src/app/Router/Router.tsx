import { Route, Routes } from 'react-router-dom';
import { Home } from '../../features/home/Home';
import { Words } from '../../features/words/Words';
import { Lessons } from '../../features/lesson/Lesson';
import { Trainings } from '../../features/training/Trainings';
import { Student } from '../../features/student/Student';
import { Teacher } from '../../features/teacher/Teacher';
import { TeacherStudents } from '../../features/teacher/TeacherStudents';

export type RouterProps = {};

export const Router = (props: RouterProps) => (
  <div className="Router">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/words" element={<Words />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/trainings" element={<Trainings />} />
      <Route path="/student" element={<Student />} />
      <Route path="/teacher" element={<Teacher />} />
      <Route path="/teacher/students" element={<TeacherStudents />} />
    </Routes>
  </div>
);
