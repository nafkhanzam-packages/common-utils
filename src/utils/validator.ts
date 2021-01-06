import * as zod from "zod";
import {ZodError} from "zod";

const validateSafe = <T>(
  validator: zod.ZodType<T, any>,
  data: unknown,
):
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: ZodError;
    } => {
  return validator.safeParse(data);
};

export const validatorUtils = {
  validate: <T>(
    validator: zod.ZodType<T, any>,
    data: unknown,
    errorMessage?: string,
  ): T => {
    const result = validateSafe(validator, data);
    if (result.success) {
      return result.data;
    } else {
      throw errorMessage ? new Error(errorMessage) : result.error;
    }
  },
  validateSafe,
};

export {zod};
