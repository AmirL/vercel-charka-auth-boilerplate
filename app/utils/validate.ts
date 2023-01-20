import type { AnyZodObject, TypeOf } from 'zod';
import { ZodError } from 'zod';

// a Zod function which takes a Zod object, validate it, and return the result of the callback
export function validated<T extends AnyZodObject, R>(schema: T, callback: (input: TypeOf<T>) => R) {
  return async (input: unknown) => {
    try {
      const validated = schema.parse(input);
      return { error: '', data: await callback(validated), success: true };
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        // get one string of joined error messages in format `${z.path} - ${z.message}`
        const message = error.errors.map((z) => `${z.path} - ${z.message}`);
        return { error: message.join('\n'), data: null, success: false };
      }

      let message = 'Something went wrong';
      // don't write the whole error for production environment
      if (process.env.NODE_ENV !== 'production') {
        if (error instanceof Error) message = error.toString();
      }
      return { error: message, data: null, success: false };
    }
  };
}
