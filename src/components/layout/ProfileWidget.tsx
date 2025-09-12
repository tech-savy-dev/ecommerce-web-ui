import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authThunks';
// ...existing code...

const ProfileWidget: React.FC = () => {
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const signOut = () => {
    dispatch(logout());
  };
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  // Hooks must be called unconditionally. We'll return early after hooks.
  const imgStyle: React.CSSProperties = { width: 40, height: 40, borderRadius: '50%', border: '2px solid #000', objectFit: 'cover', cursor: 'pointer' };
  const avatarStyle: React.CSSProperties = { width: 40, height: 40, borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, cursor: 'pointer' };

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  if (!auth.isLoggedIn || !auth.user) return null;

  const name = auth.user.name || '';
  const initials = name.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase();

  // Normalize Google photo URL when possible (request a larger size)
  function normalizePhoto(url?: string | null) {
    if (!url) return null;
    try {
      const u = new URL(url);
      // If Googleusercontent style has size segment like /s96-c/, replace to s256
      u.pathname = u.pathname.replace(/s\d+-c/, 's256-c');
      // If no size param found, try adding ?sz=256
      if (!/s\d+(-c)?/.test(url)) {
        if (!u.search) u.search = '?sz=256';
        else u.searchParams.set('sz', '256');
      }
      return u.toString();
    } catch (e) {
      // fallback: append sz param if possible
      if (url.indexOf('?') === -1) return url + '?sz=256';
      try { return url; } catch { return url; }
    }
  }

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }} ref={ref}>
      {auth.user.picture ? (
        (() => {
          const src = normalizePhoto(auth.user.picture);
          // developer debug
          // eslint-disable-next-line no-console
          console.log('ProfileWidget: using image src=', src);
          return <img src={src || undefined} alt={auth.user.name} style={imgStyle} onClick={() => setOpen(v => !v)} />;
        })()
      ) : (
        <div style={avatarStyle} onClick={() => setOpen(v => !v)}>{initials || 'U'}</div>
      )}
      <div style={{ fontSize: 12, marginTop: 4 }}>{name}</div>
      {open && (
        <div style={{ position: 'absolute', right: 0, marginTop: 52, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.15)', borderRadius: 6, padding: 8, minWidth: 120 }}>
          <button onClick={() => { signOut(); setOpen(false); }} style={{ width: '100%', padding: 8, background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer' }}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default ProfileWidget;
