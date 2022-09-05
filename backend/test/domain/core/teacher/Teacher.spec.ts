import { TeacherProfile } from '../../../../src/domain/core/teacher/entities/TeacherProfile.value';
import { RandomIdGenerator } from '../../../../src/utils/RandomIdGenerator';
import { Teacher, TeacherId } from '../../../../src/domain/core/teacher/Teacher.entity';
import { initWordSet } from '../../../test-utils/initWordSet';
import { TeacherProfileWasChangedEvent } from '../../../../src/domain/core/teacher/events/TeacherProfileWasChanged.event';
import { TeacherProfileName } from '../../../../src/domain/core/teacher/entities/TeacherName.value';

describe('Domain tests for Teacher', () => {
  describe('Test fillProfile method', () => {
    it('fill profile', () => {
      // Given
      const teacherId = 'teacherId';
      const profile = new TeacherProfile(new TeacherProfileName('test'));
      const randomIdGenerator = {} as RandomIdGenerator;
      const teacher = new Teacher(new TeacherId(teacherId), profile, [], [initWordSet('0000', 3)], randomIdGenerator);

      // When
      teacher.fillProfile(new TeacherProfile(new TeacherProfileName('test2')));

      // Then
      const events = teacher.getEvents();
      expect(events.length).toBe(1);
      expect(events[0]).toEqual(
        new TeacherProfileWasChangedEvent(
          new TeacherId('teacherId'),
          new TeacherProfile(new TeacherProfileName('test2')),
        ),
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

  describe('Test addStudent method', () => {
    it('add student', () => {
      // Given
      // TODO
      // When
      // TODO
      // Then
      // TODO
    });

    it('student not found', () => {
      // Given
      // TODO
      // When
      // TODO
      // Then
      // TODO
    });

    it('student already exists', () => {
      // Given
      // TODO
      // When
      // TODO
      // Then
      // TODO
    });
  });

  describe('Test removeStudent method', () => {
    it('remove student', () => {
      // Given
      // TODO
      // When
      // TODO
      // Then
      // TODO
    });

    it('student not found', () => {
      // Given
      // TODO
      // When
      // TODO
      // Then
      // TODO
    });
  });
});
