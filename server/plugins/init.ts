import { extendZodWithOpenApi } from 'zod-openapi';
import { z } from 'zod';

export default defineNitroPlugin(() => {
    extendZodWithOpenApi(z);
});
