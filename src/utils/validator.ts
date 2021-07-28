import * as zod from "zod";
import { ZodError } from "zod";
import phone from "phone";

const validateSafe = <A, B, C>(
  validator: zod.ZodType<A, B, C>,
  data: unknown,
):
  | {
      success: true;
      data: A;
    }
  | {
      success: false;
      error: ZodError;
    } => {
  return validator.safeParse(data);
};

export const validatorUtils = {
  validate: <A, B, C>(
    validator: zod.ZodType<A, B, C>,
    data: unknown,
    errorMessage?: string,
  ): A => {
    const result = validateSafe<A, B, C>(validator, data);
    if (result.success) {
      return result.data;
    } else {
      throw errorMessage ? new Error(errorMessage) : result.error;
    }
  },
  validateSafe,
  validatePhone: (value: string): boolean => {
    return !!phone(value).isValid;
  },
};

export { zod };
