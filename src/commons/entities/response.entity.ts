import { Expose } from "class-transformer";

export class ResponseEntity<T> {
  constructor(partial: Partial<ResponseEntity<T>>) {
    Object.assign(this, partial);
  }

  @Expose()
  message: string;

  @Expose()
  @Type(() => )
  data: T;

  @Expose()
  error: string
}