const InvariantError = require('../exceptions/InvariantError');
const { NotePayloadSchema } = require('./notes/schema');
const { UserPayloadSchema } = require('./users/schema');

const NoteValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

const UserValidator = {
  validateUserPayload: (payload) => {
    const validationResult = UserPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = { NoteValidator, UserValidator };