import 'dotenv/config';
import * as joi from 'joi';
interface EnvVars {
  PORT: number;
  USERS_MICROSERVICE_HOST: string;
  USERS_MICROSERVICE_PORT: number;
}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  USERS_MICROSERVICE_HOST: joi.string().required(),
  USERS_MICROSERVICE_PORT: joi.number().required(),
});

const { error, value } = envsSchema.validate(process.env, {
  allowUnknown: true,
});

if (error) {
  throw new Error(`Config Validation Error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  USERS_MICROSERVICE_HOST: envVars.USERS_MICROSERVICE_HOST,
  USERS_MICROSERVICE_PORT: envVars.USERS_MICROSERVICE_PORT,
};
