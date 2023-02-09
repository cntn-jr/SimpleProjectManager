export type Task = {
    id: number;
    title: string;
    description: string;
    priority: "high" | "middle" | "low" | string;
    due: string;
    is_finished: number;
    user_id: number;
    created_at?: string | null;
    updated_at?: string | null;
};
