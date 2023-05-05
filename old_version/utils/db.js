import express from 'express'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('url', supabaseUrl);
console.log('key', supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey)
// console.log(supabase);