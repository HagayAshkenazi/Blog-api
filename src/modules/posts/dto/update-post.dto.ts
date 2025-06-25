import {
  NoForbiddenWords,
  IsMostlyHebrew,
} from 'src/common/decorators/validators.validator';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  @NoForbiddenWords()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @IsMostlyHebrew()
  content: string;
}
