export class ValidatorService {
  static min(inputValue, min) {
    if (inputValue.length < min) {
      return `Cant be less than ${min} characters`;
    }
  }

  static max(inputValue, max) {
    if (inputValue.length > max) {
      return `Cant be more than ${max} characters`;
    }
  }
}