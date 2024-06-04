type BakBridgeOptions = {
    bakToken: string;
    container: HTMLElement;
    client?: {
        baseUrl?: string;
        headers?: {
            [key: string]: string;
        };
    };
    initial?: JSONstring;
    showTransaction?: boolean;
    onLoad?: () => void;
    onSuccess?: (metadata?: {
        [key: string]: string | number | [];
    }) => void;
    onEvent?: (event_type: string, payload?: {
        [key: string]: string | number | [];
    }) => void;
    onClose?: () => void;
};
declare class BakBridge {
    bakToken: string;
    container: HTMLElement;
    baseUrl: string;
    headers?: {
        [key: string]: string;
    };
    initial?: JSONstring;
    showTransaction?: boolean;
    onLoad: () => void;
    onSuccess: (metadata?: {
        [key: string]: string | number | [];
    }) => void;
    onEvent: (event_type: string, payload?: {
        [key: string]: string | number | [];
    }) => void;
    onClose: () => void;
    constructor(options: BakBridgeOptions);
    init(): void;
    handleBridgeEvent(eventType: string, payload?: {
        [key: string]: string | number | [];
    }): void;
}
declare global {
    interface Window {
        BakBridge: typeof BakBridge;
    }
}
export default BakBridge;
export type { BakBridgeOptions };
