export interface Message {
    id: number;
    user_id: number;
    content: string;
    is_system: boolean;
    created_at: string;
}
