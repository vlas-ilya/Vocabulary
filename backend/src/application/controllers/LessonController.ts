import { LessonProcessor } from '../../processor-interfaces/LessonProcessor';
import { WordSetId } from '../../domain/other/word/WordSet.entity';
import { LessonId } from '../../domain/core/lesson/Lesson.entity';
import { Transcription, Translation, Value, Word, WordId } from '../../domain/other/word/Word.entity';
import { StudentId } from '../../domain/core/student/Student.entity';
import { TeacherId } from '../../domain/core/teacher/Teacher.entity';
import { Usage, UsageId, UsageValue } from '../../domain/other/word/Usage.entity';
import { Antonym, AntonymId, AntonymValue } from '../../domain/other/word/Antonym.entity';
import { Synonym, SynonymId, SynonymValue } from '../../domain/other/word/Synonym.entity';
import { Response } from './common/Response';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { Maybe } from '../../domain/other/base/Maybe';

@Controller('lesson')
export class LessonController {
  constructor(@Inject('lessonProcessor') private readonly processor: LessonProcessor) {}

  @Post('new')
  async startNewLesson(
    @Query('studentId') studentId: String,
    @Query('teacherId') teacherId: Maybe<String>,
    @Query('wordSetId') wordSetId: String,
  ): Promise<Response<LessonId>> {
    return await new Response<LessonId>().run(() =>
      this.processor.startNewLesson(
        new StudentId(studentId),
        teacherId ? new TeacherId(teacherId) : undefined,
        new WordSetId(wordSetId),
      ),
    );
  }

  @Get(':lessonId/words/')
  async getWords(@Param('lessonId') lessonId: String): Promise<Response<Word[]>> {
    return await new Response<Word[]>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) => lesson.getWords()),
    );
  }

  @Get(':lessonId/words/:wordId')
  async getWord(@Param('lessonId') lessonId: String, @Param('wordId') wordId: String): Promise<Response<Word>> {
    return await new Response<Word>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) => lesson.getWord(new WordId(wordId))),
    );
  }

  @Post(':lessonId/words/')
  async addWord(
    @Param('lessonId') lessonId: String,
    @Body('value') value: String,
    @Body('translation') translation: String,
  ): Promise<Response<WordId>> {
    return await new Response<WordId>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) =>
        lesson.addWord(new Value(value), new Translation(translation)),
      ),
    );
  }

  @Delete(':lessonId/words/:wordId')
  async removeWord(@Param('lessonId') lessonId: String, @Param('wordId') wordId: String): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) => lesson.removeWord(new WordId(wordId))),
    );
  }

  @Put(':lessonId/words/:wordId/value')
  async modifyValueOfWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Body('value') value: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) =>
        lesson.modifyValueOfWord(new WordId(wordId), new Value(value)),
      ),
    );
  }

  @Put(':lessonId/words/:wordId/translation')
  async modifyTranslationOfWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Body('translation') translation: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) =>
        lesson.modifyTranslationOfWord(new WordId(wordId), new Translation(translation)),
      ),
    );
  }

  @Put(':lessonId/words/:wordId/transcription')
  async modifyTranscriptionOfWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Body('transcription') transcription: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) =>
        lesson.modifyTranscriptionOfWord(new WordId(wordId), new Transcription(transcription)),
      ),
    );
  }

  @Post(':lessonId/words/:wordId/usage')
  async addUsageToWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Body('value') value: String,
  ): Promise<Response<UsageId>> {
    return await new Response<UsageId>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) => lesson.addUsageToWord(new WordId(wordId), value)),
    );
  }

  @Delete(':lessonId/words/:wordId/usage/:usageId')
  async removeUsageFromWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Param('usageId') usageId: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) =>
        lesson.removeUsageFromWord(new WordId(wordId), new UsageId(usageId)),
      ),
    );
  }

  @Put(':lessonId/words/:wordId/usage/:usageId')
  async modifyUsageOfWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Param('usageId') usageId: String,
    @Body('value') value: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) =>
        lesson.modifyUsageOfWord(new WordId(wordId), new Usage(new UsageId(usageId), new UsageValue(value))),
      ),
    );
  }

  @Post(':lessonId/words/:wordId/synonym')
  async addSynonymToWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Body('value') value: String,
  ): Promise<Response<SynonymId>> {
    return await new Response<SynonymId>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) => lesson.addSynonymToWord(new WordId(wordId), value)),
    );
  }

  @Delete(':lessonId/words/:wordId/synonym/:synonymId')
  async removeSynonymFromWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Param('synonymId') synonymId: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) =>
        lesson.removeSynonymFromWord(new WordId(wordId), new SynonymId(synonymId)),
      ),
    );
  }

  @Put(':lessonId/words/:wordId/synonym/:synonymId')
  async modifySynonymOfWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Param('synonymId') synonymId: String,
    @Body('value') value: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) =>
        lesson.modifySynonymOfWord(new WordId(wordId), new Synonym(new SynonymId(synonymId), new SynonymValue(value))),
      ),
    );
  }

  @Post(':lessonId/words/:wordId/antonym')
  async addAntonymToWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Body('value') value: String,
  ): Promise<Response<AntonymId>> {
    return await new Response<AntonymId>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) => lesson.addAntonymToWord(new WordId(wordId), value)),
    );
  }

  @Delete(':lessonId/words/:wordId/antonym/:antonymId')
  async removeAntonymFromWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Param('antonymId') antonymId: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) =>
        lesson.removeAntonymFromWord(new WordId(wordId), new AntonymId(antonymId)),
      ),
    );
  }

  @Put(':lessonId/words/:wordId/antonym/:antonymId')
  async modifyAntonymOfWord(
    @Param('lessonId') lessonId: String,
    @Param('wordId') wordId: String,
    @Param('antonymId') antonymId: String,
    @Body('value') value: String,
  ): Promise<Response<void>> {
    return await new Response<void>().run(() =>
      this.processor.process(new LessonId(lessonId), (lesson) =>
        lesson.modifyAntonymOfWord(new WordId(wordId), new Antonym(new AntonymId(antonymId), new AntonymValue(value))),
      ),
    );
  }
}
