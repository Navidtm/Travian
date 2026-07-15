export type StreamEvent<T> =
	| {
			type: 'data' | 'done';
			data: T;
	  }
	| {
			type: 'error';
			message: string;
	  };
