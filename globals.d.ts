export {};  // Ensure this file is treated as a module

declare global {
    interface Window {
        autoBloggerData: {
            nonce: string;
            apiUrl: string;
        };
    }
}