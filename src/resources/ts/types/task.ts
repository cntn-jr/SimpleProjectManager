export type Task = {
    id: number;
    title: string;
    description: string;
    priority: "high" | "middle" | "low" | string;
    due: any;
    is_finished: number;
    user_id: number;
    created_at: null;
    updated_at: null;
};
