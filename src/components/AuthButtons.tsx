'use client';

import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <button
      className="w-fit flex items-center gap-2 py-2 px-5 rounded shadow bg-gray-200 hover:bg-green-200 transition ease-in duration-75"
      onClick={() =>
        signIn('google', { callbackUrl: '/dashboard'})
      }
    >
      Se connecter
      <img
        width={20}
        height={20}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
        alt="Google"
      />
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      className="w-fit py-2 px-5 rounded shadow bg-gray-200 hover:bg-red-200 transition ease-in duration-75"
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      Se déconnecter
    </button>
  );
};