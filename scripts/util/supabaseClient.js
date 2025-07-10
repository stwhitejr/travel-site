const {createClient} = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({path: '.env.local'});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ROLE_KEY;

const _createClient = async () => {
  return createClient(supabaseUrl, supabaseKey);
};

module.exports = _createClient;
