'use server'

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../../lib/supabase";
import { redirect } from "next/navigation";

export async function signUp(FormData: FormData) { 
    const supabase = await createServerSupabaseClient();
    const email = FormData.get("email") as string;
    const password = FormData.get("password") as string;
    const username= FormData.get("username") as string;

    const { error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            }
        }
    })

    if (error) return { data: null, error: error.message }

    const {data: {user} } = await supabase.auth.getUser();
    if (user) {
        await supabase .from("profiles").update({username}).eq('id', user.id)
    }
    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signIn(FormData: FormData) {
    const supabase = await createServerSupabaseClient();
    const email = FormData.get("email") as string;
    const password = FormData.get("password") as string;

    const { error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) return { data: null, error: error.message }
    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signOut() {
    const supabase = await createServerSupabaseClient();
    const { error} = await supabase.auth.signOut();
    if (error) return console.error("Error signing out:", error);
    revalidatePath('/', 'layout')
    redirect('/')
}