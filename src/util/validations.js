export class Validation {

  static email(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  static password(password) {
    return password && password.length >= 6;
  }

  static name(name) {
    return name && name.length >= 3;
  }

  static rating(value){
    return value && value >= 0 && value <= 5;
  }
}