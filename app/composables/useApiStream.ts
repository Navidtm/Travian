export function useApiStream<TMessage = Message, TResult = Result>(
	options: UseApiStreamOptions<TMessage, TResult> = {},
) {
	const pending = ref(false);
	const error = ref<Error>();

	const controller = shallowRef<AbortController>();

	const start = async (url: string, startOptions: StreamStartOptions = {}) => {
		pending.value = true;
		error.value = undefined;

		controller.value = new AbortController();

		try {
			const stream = await $fetch<ReadableStream>(url, {
				method: startOptions.method ?? 'POST',
				body: startOptions.body,
				headers: startOptions.headers ?? {},
				signal: controller.value.signal,
				responseType: 'stream',
			});

			const reader = stream.pipeThrough(new TextDecoderStream()).getReader();

			let buffer = '';

			while (true) {
				const { done, value } = await reader.read();

				if (done) break;

				buffer += value;

				while (true) {
					const index = buffer.indexOf('\n\n');
					if (index === -1) break;

					const raw = buffer.slice(0, index);
					buffer = buffer.slice(index + 2);
					const line = raw.split('\n').find(v => v.startsWith('data:'));
					if (!line) continue;

					const event = JSON.parse(line.slice(5).trim()) as StreamEvent<TMessage, TResult>;

					switch (event.type) {
						case 'message':
							await options.onMessage?.(event.data);
							break;

						case 'done':
							await options.onDone?.(event.data);
							break;

						case 'error': {
							const err = new Error(event.message);
							error.value = err;
							await options.onError?.(err);
							return;
						}
					}
				}
			}

			reader.releaseLock();
		} catch (err) {
			const e = err instanceof Error ? err : new Error(String(err));

			error.value = e;

			await options.onError?.(e);
		} finally {
			pending.value = false;
		}
	};

	const cancel = () => {
		controller.value?.abort();
	};

	return {
		start,
		cancel,
		pending: readonly(pending),
		error: readonly(error),
	};
}
