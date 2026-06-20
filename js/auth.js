// ============================================
// Elite Members — Supabase Auth Guard
// Include this on every protected page
// ============================================
const SUPABASE_URL = 'https://eiyexnuhqdscomilwpqg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeWV4bnVocWRzY29taWx3cHFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzI4NTcsImV4cCI6MjA2MjEwODg1N30.tQCwDfOWB-sMTPCVKxUhMvXNpkQ60m3iEz39DP_VUC4';

(async () => {
  // Load Supabase SDK
  if (!window.supabase) {
    await new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.onload = resolve;
      document.head.appendChild(s);
    });
  }
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window._sb = sb;

  const { data: { session } } = await sb.auth.getSession();
  const isLoginPage = window.location.pathname.includes('login.html');

  if (!session && !isLoginPage) {
    // Redirect to login
    const depth = window.location.pathname.split('/pages/').length > 1 ? '../' : '';
    window.location.href = depth + 'pages/login.html';
    return;
  }

  if (session) {
    const user = session.user;
    // Populate user info anywhere on the page
    document.querySelectorAll('[data-user-name]').forEach(el => {
      el.textContent = user.user_metadata?.full_name || user.email.split('@')[0];
    });
    document.querySelectorAll('[data-user-email]').forEach(el => {
      el.textContent = user.email;
    });
    document.querySelectorAll('[data-user-avatar]').forEach(el => {
      el.src = user.user_metadata?.avatar_url || 'https://img.icons8.com/color/96/user-male-circle--v1.png';
    });
  }

  // Global sign out function
  window.signOut = async () => {
    await sb.auth.signOut();
    window.location.href = '../pages/login.html';
  };
})();
