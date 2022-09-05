import { TeacherProcessor } from '../../processor-interfaces/TeacherProcessor';
import { TeacherId } from '../../domain/core/teacher/Teacher.entity';
import { StudentId } from '../../domain/core/student/Student.entity';
import { WordSet, WordSetId } from '../../domain/other/word/WordSet.entity';
import { Transcription, Translation, Value, WordId } from '../../domain/other/word/Word.entity';
import { Usage, UsageId, UsageValue } from '../../domain/other/word/Usage.entity';
import { Antonym, AntonymId, AntonymValue } from '../../domain/other/word/Antonym.entity';
import { Synonym, SynonymId, SynonymValue } from '../../domain/other/word/Synonym.entity';
import { Response } from './common/Response';
import { Profile } from '../../domain/other/profile/Profile.value';
import { Name } from '../../domain/other/profile/Name.value';
import { Gender } from '../../domain/other/profile/Gender.value';
import { Age } from '../../domain/other/profile/Age.value';

export class TeacherController {
  constructor(private readonly processor: TeacherProcessor) {}

  async fillProfile(teacherId: String, name: String, gender: 'M' | 'G' | 'None', age: number): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) => {
        teacher.fillProfile(new Profile(new Name(name), new Gender(gender), new Age(age)));
      }),
    );
  }

  async addStudent(teacherId: String, studentId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.addStudent(new TeacherId(teacherId), new StudentId(studentId)),
    );
  }

  async removeStudent(teacherId: String, studentId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) => {
        teacher.removeStudent(new StudentId(studentId));
      }),
    );
  }

  async createWordSet(teacherId: String): Promise<Response<WordSetId>> {
    return await new Response<WordSetId>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) => teacher.createWordSet()),
    );
  }

  async removeWordSet(teacherId: String, wordSetId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) => teacher.removeWordSet(new WordSetId(wordSetId))),
    );
  }

  async addWordToWordSet(
    teacherId: String,
    wordSetId: String,
    value: String,
    translation: String,
    transcription?: String,
  ): Promise<Response<WordId>> {
    return await new Response<WordId>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.addWordToWordSet(
          new WordSetId(wordSetId),
          new Value(value),
          new Translation(translation),
          transcription ? new Transcription(transcription) : null,
        ),
      ),
    );
  }

  async removeWordFromWordSet(teacherId: String, wordId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) => teacher.removeWordFromWordSet(new WordId(wordId))),
    );
  }

  async modifyValueOfWord(teacherId: String, wordId: String, value: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.modifyValueOfWord(new WordId(wordId), new Value(value)),
      ),
    );
  }

  async modifyTranslationOfWord(teacherId: String, wordId: String, translation: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.modifyTranslationOfWord(new WordId(wordId), new Translation(translation)),
      ),
    );
  }

  async modifyTranscriptionOfWord(teacherId: String, wordId: String, transcription: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.modifyTranscriptionOfWord(new WordId(wordId), new Transcription(transcription)),
      ),
    );
  }

  async addUsageToWord(teacherId: String, wordId: String, value: String): Promise<Response<UsageId>> {
    return await new Response<UsageId>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) => teacher.addUsageToWord(new WordId(wordId), value)),
    );
  }

  async removeUsageFromWord(teacherId: String, wordId: String, usageId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.removeUsageFromWord(new WordId(wordId), new UsageId(usageId)),
      ),
    );
  }

  async modifyUsageOfWord(teacherId: String, wordId: String, usageId: String, value: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.modifyUsageOfWord(new WordId(wordId), new Usage(new UsageId(usageId), new UsageValue(value))),
      ),
    );
  }

  async addSynonymToWord(teacherId: String, wordId: String, value: String): Promise<Response<SynonymId>> {
    return await new Response<SynonymId>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.addSynonymToWord(new WordId(wordId), value),
      ),
    );
  }

  async removeSynonymFromWord(teacherId: String, wordId: String, synonymId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.removeSynonymFromWord(new WordId(wordId), new SynonymId(synonymId)),
      ),
    );
  }

  async modifySynonymOfWord(
    teacherId: String,
    wordId: String,
    synonymId: String,
    value: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.modifySynonymOfWord(new WordId(wordId), new Synonym(new SynonymId(synonymId), new SynonymValue(value))),
      ),
    );
  }

  async addAntonymToWord(teacherId: String, wordId: String, value: String): Promise<Response<AntonymId>> {
    return await new Response<AntonymId>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.addAntonymToWord(new WordId(wordId), value),
      ),
    );
  }

  async removeAntonymFromWord(teacherId: String, wordId: String, antonymId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.removeAntonymFromWord(new WordId(wordId), new AntonymId(antonymId)),
      ),
    );
  }

  async modifyAntonymOfWord(
    teacherId: String,
    wordId: String,
    antonymId: String,
    value: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) =>
        teacher.modifyAntonymOfWord(new WordId(wordId), new Antonym(new AntonymId(antonymId), new AntonymValue(value))),
      ),
    );
  }

  async getWordSet(teacherId: String, wordSetId: String): Promise<Response<WordSet>> {
    return await new Response<WordSet>().run(() =>
      this.processor.process(new TeacherId(teacherId), (teacher) => teacher.getWordSet(new WordSetId(wordSetId))),
    );
  }
}
