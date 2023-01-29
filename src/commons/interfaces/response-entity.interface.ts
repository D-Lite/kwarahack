export interface ResponseEntity<T> {
  message: string;
  data?: T;
  success: boolean;
}