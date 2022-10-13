const SUPABASE_URL = 'https://sgsqhdtlconmltdgcqzd.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnc3FoZHRsY29ubWx0ZGdjcXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwODAzNzMsImV4cCI6MTk4MDY1NjM3M30.nIbCKve45Pb2NvJSQTpQlTkkQ2S8mpK6Ull7zd4lNQg';
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
    return await client.from('shopping_list').insert(item).single();
}

export async function getLists() {
    return await client.from('shopping_list').select('*').order('created_at');
}

export async function boughtItem(id) {
    return await client.from('shopping_list').update({ bought: true }).eq('id', id).single();
}

export async function deleteAllItems() {
    const user = getUser();
    return await client.from('shopping_list').delete().eq('user_id', user.id);
}
