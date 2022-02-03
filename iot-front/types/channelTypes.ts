export interface ChannelProps {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    field1: string;
    field2: string;
    created_at: Date | string;
    updated_at: Date;
    last_entry_id: number;
}

export interface LineChartProps {
    channel: ChannelProps;
    feeds: Feed[]
}

export interface Feed {
    created_at: string;
    entry_id: number;
    field1: string;
}

