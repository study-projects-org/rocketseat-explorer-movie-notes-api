import bcrypt from 'bcryptjs';
import { Validation } from "../util/validations.js";
import { AppError } from "../errors/app-error.js";
import { knexApp } from '../database/knex/config.js';

export class UsersController {

  async crate(request, response) {
    const { name, email, password } = request.body;

    const nameValidation = Validation.text({ value: name, minLength: 3, propName: 'name' });
    const emailValidation = Validation.email(email);
    const passwordValidation = Validation.text({ value: password, minLength: 6, propName: 'password'});

    const errors = [];

    if (nameValidation.valid === false) {
      errors.push(nameValidation.error);
    }

    if (emailValidation) {
      errors.push(emailValidation.error);
    }

    if (passwordValidation.valid === false) {
      errors.push(passwordValidation.error);
    }

    console.log(errors);
    if (errors.length > 0) {
      throw new AppError(errors.join(', '));
    }

    const emailAlreadyExists = await knexApp('users').where({ email }).first();
    if (emailAlreadyExists) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await knexApp('users')
      .insert(
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: hashedPassword
        });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    if (!name && !email && !password) {
      throw new AppError('At least one field must be filled');
    }

    const nameValidation = Validation.text({ value: name, minLength: 3, propName: 'name'});
    const emailValidation = Validation.email(email);
    const passwordValidation = Validation.text({ value: password, minLength: 6, propName: 'password' });

    const errors = [];

    if (name && nameValidation.valid === false) {
      errors.push(nameValidation.error);
    }

    if (email && emailValidation.valid === false) {
      errors.push(emailValidation.error);
    }

    if (password && passwordValidation.valid === false) {
      errors.push(passwordValidation.error);
    }

    if (errors.length > 0) {
      throw new AppError(errors.join(', '));
    }

    const user = await knexApp('users').where({ id }).first();

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await knexApp('users').where({ email }).first();
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== Number(id)) {
      throw new AppError('Email already in use');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError('The old password must be informed');
    }

    if (password && old_password) {
      const oldPasswordIsValid = await bcrypt.compare(old_password, user.password);

      if (!oldPasswordIsValid) {
        throw new AppError('Old password is incorrect');
      }

      user.password = await bcrypt.hash(password, 8);
    }

    await knexApp('users')
      .where({ id })
      .update(
        {
          name: user.name.trim(),
          email: user.email.trim().toLowerCase(),
          password: user.password,
          updated_at: new Date().toISOString().replace('T', ' ').split('.')[0]
        });

    return response.json();
  }
}