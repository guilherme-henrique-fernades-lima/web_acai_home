import { useSession, getSession } from 'next-auth/react';

export default function ProtectedPage() {
    const session = useSession();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!session.data) {
    return <div>Você não está autenticado.</div>;
  }

  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Bem-vindo, {session.user.username}!</p>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/login',
       

//  permanent: false
//       }
//     };
//   }

//   return {
//     props: {}
//   };
// }