import type { H3Event } from 'h3';

export function defineStreamEventHandler<T>(
	handler: (event: H3Event & { emit(data: T): void }) => T | Promise<T>,
) {
	return defineEventHandler(async event => {
		const res = event.node.res;

		res.setHeader('Content-Type', 'text/event-stream');
		res.setHeader('Cache-Control', 'no-cache');
		res.setHeader('Connection', 'keep-alive');

		const send = (payload: StreamEvent<T>) => {
			res.write(`data: ${JSON.stringify(payload)}\n\n`);
		};

		const ctx = Object.assign(event, {
			emit(data: T) {
				send({ type: 'data', data });
			},
		});

		try {
			const result = await handler(ctx);

			send({
				type: 'done',
				data: result,
			});
		} catch (error) {
			send({
				type: 'error',
				message: error instanceof Error ? error.message : 'Unknown error',
			});
		} finally {
			res.end();
		}
	});
}
