import React, { useEffect, useRef, useState } from "react";
import { loadGoogleScript, initializeGoogleButton } from "../../features/auth/googleAuth";
import { parseJwt } from "../../features/auth/authService";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

const LoginButton: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleReady, setGoogleReady] = useState(false);

  useEffect(() => {
    if (!CLIENT_ID) return;
    let mounted = true;
    loadGoogleScript(CLIENT_ID)
      .then(() => {
        if (!mounted) return;
        setGoogleReady(true);
        if (ref.current) {
          try {
            initializeGoogleButton(ref.current, CLIENT_ID, (resp: any) => {
              if (resp.credential) {
                const user = parseJwt(resp.credential);
                // store in redux
                dispatch(setAuth({ token: resp.credential, user }));
                // developer-friendly console output
                console.log('Google sign-in successful:');
                console.log('  email:', user.email);
                console.log('  name:', user.name || '(no name)');
                console.log('  picture:', user.picture || '(no picture)');
                // raw payload (useful for debugging)
                // @ts-ignore
                console.log('  raw:', user.raw || null);
                // navigate to home so protected routes / modal behavior update
                try { navigate('/'); } catch (e) { /* ignore */ }
              }
            });
          } catch (e) {
            console.error(e);
          }
        }
      })
      .catch((e) => {
        console.error(e);
        setGoogleReady(false);
      });
    return () => { mounted = false; };
  }, [dispatch]);

  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default LoginButton;
