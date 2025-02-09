require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const notes = require('./api/notes');
const users = require('./api/users');
const authentications = require('./api/authentications');
const collaborations = require('./api/collaborations');
const _exports = require('./api/exports');
const uploads = require('./api/uploads');
const NotesService = require('./services/postgres/NotesService');
const UsersService = require('./services/postgres/UsersService');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const CollaborationsService = require('./services/postgres/CollaborationService');
const ProducerService = require('./services/rabbitmq/ProducerService');
const StorageService = require('./services/S3/StorageService');
const CacheSerivice = require('./services/redis/CacheService');
const TokenManager = require('./tokenize/TokenManager');
const { NoteValidator, UserValidator, AuthenticationValidator, CollaborationValidator, ExportNoteValidator, UploadValidator } = require('./validator');

const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const cacheService = new CacheSerivice();
  const collaborationsService = new CollaborationsService(cacheService);
  const notesService = new NotesService(collaborationsService, cacheService);
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const storageService = new StorageService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt
    },

    {
      plugin: Inert
    }
  ]);

  server.auth.strategy('notesapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NoteValidator,
      }
    },

    {
      plugin: users,
      options: {
        service: usersService,
        validator: UserValidator
      }
    },

    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationValidator
      }
    },

    {
      plugin: collaborations,
      options: {
        collaborationsService,
        notesService,
        validator: CollaborationValidator
      }
    },

    {
      plugin: _exports,
      options: {
        service: ProducerService,
        validator: ExportNoteValidator
      }
    },

    {
      plugin: uploads,
      options: {
        service: storageService,
        validator: UploadValidator
      }
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message
      });

      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();