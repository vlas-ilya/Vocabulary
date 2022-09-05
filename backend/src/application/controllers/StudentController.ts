import { StudentProcessor } from '../../processor-interfaces/StudentProcessor';
import { StudentId } from '../../domain/core/student/Student.entity';
import { Profile } from '../../domain/other/profile/Profile.value';
import { WordSet, WordSetId } from '../../domain/other/word/WordSet.entity';
import { Transcription, Translation, Value, WordId } from '../../domain/other/word/Word.entity';
import { Usage, UsageId, UsageValue } from '../../domain/other/word/Usage.entity';
import { Antonym, AntonymId, AntonymValue } from '../../domain/other/word/Antonym.entity';
import { Synonym, SynonymId, SynonymValue } from '../../domain/other/word/Synonym.entity';
import { Response } from './common/Response';
import { Name } from '../../domain/other/profile/Name.value';
import { Gender } from '../../domain/other/profile/Gender.value';
import { Age } from '../../domain/other/profile/Age.value';

export class StudentController {
  constructor(private readonly processor: StudentProcessor) {}

  async fillProfile(studentId: String, name: String, gender: 'M' | 'G' | 'None', age: number): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) => {
        student.fillProfile(new Profile(new Name(name), new Gender(gender), new Age(age)));
      }),
    );
  }

  async createWordSet(studentId: String): Promise<Response<WordSetId>> {
    return await new Response<WordSetId>().run(() =>
      this.processor.process(new StudentId(studentId), (student) => student.createWordSet()),
    );
  }

  async removeWordSet(studentId: String, wordSetId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) => student.removeWordSet(new WordSetId(wordSetId))),
    );
  }

  async addWordToWordSet(
    studentId: String,
    wordSetId: String,
    value: String,
    translation: String,
    transcription?: String,
  ): Promise<Response<WordId>> {
    return await new Response<WordId>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.addWordToWordSet(
          new WordSetId(wordSetId),
          new Value(value),
          new Translation(translation),
          transcription ? new Transcription(transcription) : null,
        ),
      ),
    );
  }

  async removeWordFromWordSet(studentId: String, wordId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) => student.removeWordFromWordSet(new WordId(wordId))),
    );
  }

  async modifyValueOfWord(studentId: String, wordId: String, value: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.modifyValueOfWord(new WordId(wordId), new Value(value)),
      ),
    );
  }

  async modifyTranslationOfWord(studentId: String, wordId: String, translation: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.modifyTranslationOfWord(new WordId(wordId), new Translation(translation)),
      ),
    );
  }

  async modifyTranscriptionOfWord(studentId: String, wordId: String, transcription: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.modifyTranscriptionOfWord(new WordId(wordId), new Transcription(transcription)),
      ),
    );
  }

  async addUsageToWord(studentId: String, wordId: String, value: String): Promise<Response<UsageId>> {
    return await new Response<UsageId>().run(() =>
      this.processor.process(new StudentId(studentId), (student) => student.addUsageToWord(new WordId(wordId), value)),
    );
  }

  async removeUsageFromWord(studentId: String, wordId: String, usageId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.removeUsageFromWord(new WordId(wordId), new UsageId(usageId)),
      ),
    );
  }

  async modifyUsageOfWord(studentId: String, wordId: String, usageId: String, value: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.modifyUsageOfWord(new WordId(wordId), new Usage(new UsageId(usageId), new UsageValue(value))),
      ),
    );
  }

  async addSynonymToWord(studentId: String, wordId: String, value: String): Promise<Response<SynonymId>> {
    return await new Response<SynonymId>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.addSynonymToWord(new WordId(wordId), value),
      ),
    );
  }

  async removeSynonymFromWord(studentId: String, wordId: String, synonymId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.removeSynonymFromWord(new WordId(wordId), new SynonymId(synonymId)),
      ),
    );
  }

  async modifySynonymOfWord(
    studentId: String,
    wordId: String,
    synonymId: String,
    value: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.modifySynonymOfWord(new WordId(wordId), new Synonym(new SynonymId(synonymId), new SynonymValue(value))),
      ),
    );
  }

  async addAntonymToWord(studentId: String, wordId: String, value: String): Promise<Response<AntonymId>> {
    return await new Response<AntonymId>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.addAntonymToWord(new WordId(wordId), value),
      ),
    );
  }

  async removeAntonymFromWord(studentId: String, wordId: String, antonymId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.removeAntonymFromWord(new WordId(wordId), new AntonymId(antonymId)),
      ),
    );
  }

  async modifyAntonymOfWord(
    studentId: String,
    wordId: String,
    antonymId: String,
    value: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new StudentId(studentId), (student) =>
        student.modifyAntonymOfWord(new WordId(wordId), new Antonym(new AntonymId(antonymId), new AntonymValue(value))),
      ),
    );
  }

  async getWordSet(studentId: String, wordSetId: String): Promise<Response<WordSet>> {
    return await new Response<WordSet>().run(() =>
      this.processor.process(new StudentId(studentId), (student) => student.getWordSet(new WordSetId(wordSetId))),
    );
  }
}
