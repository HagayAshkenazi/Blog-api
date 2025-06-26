import {
  NoForbiddenWords,
  IsMostlyHebrew,
} from 'src/common/decorators/validators.validator';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty({ message: 'validation.REQUIRED' })
  @IsString()
  @MaxLength(200, { message: 'validation.MAX_LENGTH_25' })
  @NoForbiddenWords()
  title: string;

  @IsNotEmpty({ message: 'validation.REQUIRED' })
  @IsString()
  @MaxLength(200, { message: 'validation.MAX_LENGTH_200' })
  @IsMostlyHebrew()
  content: string;
}
