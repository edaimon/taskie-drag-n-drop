// PONER CONEXIÓN CON SUPABASE

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ovhdooidkcfygufxvbei.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aGRvb2lka2NmeWd1Znh2YmVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA4Mzg2NzgsImV4cCI6MTk4NjQxNDY3OH0.A-dDFFnsRE3QAzbPo5S7kluBUXgUeOW9RhQh0RysRSY";
export const supabase = createClient(supabaseUrl, supabaseKey); //export cons añadido por Joan

// import.meta.env.VITE_SUPABASE_URL
// import.meta.env.VITE_SUPABASE_KEY