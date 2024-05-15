export class Validation {

  static email(email) {
    if (!value) {
      return { valid: false, error: 'Email not informed' };
    }
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = regex.test(String(email).toLowerCase());

    if (!validEmail) {
      return { valid: false, error: 'Invalid email format' };
    }

    return { valid: true };
  }

  static text({ value, minLength = 3, propName = 'field' }) {
    if (!value) {
      return { valid: false, error: `The ${propName} not informed` };
    } else if (value.length < minLength) {
      return { valid: false, error: `The ${propName} must contain at least ${minLength} characters` };
    }

    return { valid: true };
  }

  static rating(value) {
    if (!value) {
      return { valid: false, error: 'Rating not informed' };
    }
  
    const isValidNumber = /^\d+$/.test(value);
    const isBetween0And5 = value >= 0 && value <= 5;
  
    if (!isValidNumber) {
      return { valid: false, error: 'The rating value must be an integer' };
    }
  
    if (!isBetween0And5) {
      return { valid: false, error: 'The ranting value must be between 0 and 5' };
    }
  
    return { valid: true };
  }
}