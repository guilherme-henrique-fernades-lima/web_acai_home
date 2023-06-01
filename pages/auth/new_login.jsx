import { signIn, signOut, useSession } from 'next-auth/react';


export default function LoginPage() {
    const session = useSession();
  
    const handleLogin = () => {
      signIn('credentials', { username: '', password: '' });
    };
  
    const handleLogout = () => {
      signOut();
    };
  
    if (session.loading) {
      return <div>Carregando...</div>;
    }
  
    return (
      <div>
        {!session.data ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    );
  }