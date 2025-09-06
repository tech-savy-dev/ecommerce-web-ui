import React from 'react';
import Modal from '../ui/Modal';
import LoginButton from './LoginButton';

const AuthModal: React.FC<{ open: boolean; onClose?: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <Modal open={open}>
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        padding: 24,
        borderRadius: 8,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        minWidth: 280,
        textAlign: 'center',
        zIndex: 1001
      }}>
        <h3 style={{ marginTop: 0 }}>Sign in</h3>
        <div style={{ margin: '12px 0' }}>
          <LoginButton />
        </div>
        {/* {onClose && (
          <button onClick={onClose} style={{ marginTop: 8 }} aria-label="close">Close</button>
        )} */}
      </div>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000 }} onClick={onClose} />
    </Modal>
  );
};

export default AuthModal;
