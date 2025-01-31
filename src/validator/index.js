const InvariantError = require('../exceptions/InvariantError');
const { NotePayloadSchema } = require('./notes/schema');
const { UserPayloadSchema } = require('./users/schema');
const { PostAuthenticationPayloadSchema, PutAuthenticationPayloadSchema, DeleteAuthenticationPayloadSchema } = require('./authentications/schema');
const { collaborationPayloadSchema } = require('./collaborations/schema');
const { ExportNotesPayloadSchema } = require('./exports/schema');

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

const AuthenticationValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const validationResult = PostAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutAuthenticationPayload: (payload) => {
    const validationResult = PutAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const validationResult = DeleteAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

const CollaborationValidator = {
  validateCollaborationPayload: (payload) => {
    const validationResult = collaborationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

const ExportNoteValidator = {
  validateExportNotesPayload: (payload) => {
    const validationResult = ExportNotesPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = { NoteValidator, UserValidator, AuthenticationValidator, CollaborationValidator, ExportNoteValidator };