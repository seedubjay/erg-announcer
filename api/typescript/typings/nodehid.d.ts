declare module nodehid {
    
    export interface Device {
        vendorId: number;
        productId: number;
        path?: string;
        serialNumber?: string;
        manufacturer?: string;
        product?: string;
        release: number;
        interface: number;
        usagePage?: number;
        usage?: number;
    }
    
    export class HID {
        constructor(path: string);
        constructor(vid: number, pid: number);
        close(): void;
        pause(): void;
        read(callback: (err: any, data: number[]) => void): void;
        readSync(): number[];
        readTimeout(time_out: number): number[];
        sendFeatureReport(data: number[]): number;
        getFeatureReport(report_id: number, report_length: number): number[];
        resume(): void;
        on(event: string, handler: (value: any) => void): void;
        once(event: string, handler: (value: any) => void): void;
        removeListener(event: string, handler: (value: any) => void): void;
        removeAllListeners(event: string): void;
        write(values: number[]): number;
        setNonBlocking(no_block: boolean): void;
    }

    export function devices(): Device[];
    export function setDriverType(type: 'hidraw' | 'libusb'): void;
  
    
}