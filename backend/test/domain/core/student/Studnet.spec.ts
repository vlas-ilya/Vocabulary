import { Student, StudentId } from '../../../../src/domain/core/student/Student.entity';
import { Profile } from '../../../../src/domain/other/profile/Profile.value';
import { initWordSet } from '../../../test-utils/initWordSet';
import { RandomIdGenerator } from '../../../../src/utils/RandomIdGenerator';
import { StudentProfileName } from '../../../../src/domain/core/student/entities/StudentProfileName.value';
import { StudentProfileWasChangedEvent } from '../../../../src/domain/core/student/events/StudentProfileWasChanged.event';

describe('Domain tests for Student', () => {
  describe('Test fillProfile method', () => {
    it('fill profile', () => {
      // Given
      const studentId = 'studentId';
      const profile = new Profile(new StudentProfileName('test'));
      const randomIdGenerator = {} as RandomIdGenerator;
      const student = new Student(new StudentId(studentId), profile, [initWordSet('0000', 3)], randomIdGenerator);

      // When
      student.fillProfile(new Profile(new StudentProfileName('test2')));

      // Then
      const events = student.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new StudentProfileWasChangedEvent(new StudentId('studentId'), new Profile(new StudentProfileName('test2'))),
      );
    });

    it('fill invalid profile name', () => {
      // Given
      // TODO
      // When
      // TODO
      // Then
      // TODO
    });
  });
});
