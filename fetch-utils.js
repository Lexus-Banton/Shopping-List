const SUPABASE_URL = 'https://qvhrjswtuaxdusdfevmt.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2aHJqc3d0dWF4ZHVzZGZldm10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ0ODQ1MjAsImV4cCI6MTk4MDA2MDUyMH0.JgHTmXXsZb8eN6QRS77uzbmXFUAddB-3P78OpMalu4k';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createLists(item) {
    return await client.from('lists').insert(item).single();
}

export async function getLists() {
    return await client.from('lists').select('*').order('created_at');
}
//git
