type Listener = {
	events: Set<string>;
	controller: ReadableStreamDefaultController<string>;
};

class SSEEventEmitter {
	_listeners: Listener[] = [];

	addListener(controller: ReadableStreamDefaultController<string>, events: Set<string> | string[]) {
		this._listeners.push({
			events: new Set(events),
			controller
		});
	}

	removeListener(controller: ReadableStreamDefaultController<string>) {
		this._listeners = this._listeners.filter((listener) => listener.controller !== controller);
	}

	registerNewEvent(event: string, listenerHas: string) {
		this._listeners.forEach((listener) => {
			if (listener.events.has(listenerHas)) listener.events.add(event);
		});
	}

	_eventMatches(event: string, listener: Listener) {
		if (listener.events.size === 0) return false;
		if (listener.events.has(event)) return true;
	}

	emit(event: string) {
		this._listeners.forEach((listener) => {
			try {
				if (this._eventMatches(event, listener)) listener.controller.enqueue(`data: ${event}\n\n`);
			} catch (e) {
				if (e instanceof TypeError) this.removeListener(listener.controller);
			}
		});
	}
}

export const SSEEvents = new SSEEventEmitter();
