import * as zod from "zod";
import {ZodError} from "zod";
import phone from "phone";

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
  validatePhone: (value: string): boolean => {
    return !!phone(value).length;
  },
};

export {zod};
