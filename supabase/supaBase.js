
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto'
import { AppState } from 'react-native';
const supabaseUrl = process.env.SUPABASE_URL ;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey,{auth:{
    Storage: AsyncStorage,
    autoRefreshToken: true, 
    persistSession: true,
    detectSessionInUrl: false,
}});
AppState.addEventListener('change',(state)=>{
    if (state === 'active'){
        supabase.auth.startAutoRefresh()
    }
    else{
        supabase.auth.stopAutoRefresh()
    }
})