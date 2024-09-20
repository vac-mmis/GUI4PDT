/**
 * WebSocket service to handle connection initialization and events
 *
 * @module WebSocketService
 */
type WebSocketMessageCallback = (message: string) => void;

class WebSocketService {
    private url: string;
    private socket: WebSocket | null = null;
    private messageCallbacks: WebSocketMessageCallback[] = [];
    private isConnected: boolean = false;

    constructor(url: string) {
        this.url = url;
        this.initializeWebSocket();
    }

    private initializeWebSocket(): void {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log("WebSocket connection opened");
            this.isConnected = true;
        };

        this.socket.onclose = () => {
            console.log("WebSocket connection closed");
            this.isConnected = false;
            // Optional: Reconnect logic can go here
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        this.socket.onmessage = (event: MessageEvent) => {
            const message = event.data;
            this.messageCallbacks.forEach((callback) => callback(message));
        };
    }

    public sendMessage(message: string): void {
        if (this.socket && this.isConnected) {
            this.socket.send(message);
        } else {
            console.error("WebSocket is not open");
        }
    }

    public onMessage(callback: WebSocketMessageCallback): void {
        this.messageCallbacks.push(callback);
    }

    public offMessage(callback: WebSocketMessageCallback): void {
        this.messageCallbacks = this.messageCallbacks.filter((cb) => cb !== callback);
    }

    public isOpen(): boolean {
        return this.isConnected;
    }
}

const websocketService = new WebSocketService("ws://localhost:3030");
export default websocketService;
