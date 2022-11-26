import { useRef, useEffect } from 'react';

const useEventListener: Function = (eventType: string, callback: Function, element = document) => {
    const handlerRef = useRef<Function>(() => { });

    useEffect(() => {
        handlerRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!(element && element.addEventListener)) return;

        const eventListener = (event: Event) => handlerRef.current(event);

        element.addEventListener(eventType, eventListener);

        return () => element.removeEventListener(eventType, eventListener)
    }, [eventType, element]);
}

export default useEventListener;
