export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password? : string;
    email_verified_at?: string;
    created_at?: string | null;
    updated_at?: string | null;
}