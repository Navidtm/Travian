export type Message = {
	step: number;
	progress: number;
	message: string;
};

export type Result = {
	id: number;
	name: string;
};

export type StreamEvent<TMessage, TResult> =
	| {
			type: 'message';
			data: TMessage;
	  }
	| {
			type: 'done';
			data: TResult;
	  }
	| {
			type: 'error';
			message: string;
	  };

export interface StreamStartOptions {
	method?: 'GET' | 'POST';
	body?: Record<string, any>;
	headers?: HeadersInit;
}

export interface UseApiStreamOptions<TMessage, TResult> {
	onMessage?(message: TMessage): void | Promise<void>;
	onDone?(result: TResult): void | Promise<void>;
	onError?(error: Error): void | Promise<void>;
}
