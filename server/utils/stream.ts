import type { H3Event } from 'h3';

export type StreamEventHandlerContext<TMessage> = H3Event & { emit(message: TMessage): void };

export function defineStreamEventHandler<TMessage = Message, TResult = Result>(
	handler: (event: StreamEventHandlerContext<TMessage>) => TResult | Promise<TResult>,
) {
	return defineEventHandler(async event => {
		const res = event.node.res;

		res.setHeader('Content-Type', 'text/event-stream');
		res.setHeader('Cache-Control', 'no-cache');
		res.setHeader('Connection', 'keep-alive');

		const send = (payload: StreamEvent<TMessage, TResult>) => {
			res.write(`data: ${JSON.stringify(payload)}\n\n`);
		};

		const ctx = Object.assign(event, {
			emit(message: TMessage) {
				send({
					type: 'message',
					data: message,
				});
			},
		}) satisfies StreamEventHandlerContext<TMessage>;

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
