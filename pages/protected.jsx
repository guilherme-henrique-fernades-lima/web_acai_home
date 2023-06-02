import { useSession, getSession } from 'next-auth/react';

export default function ProtectedPage() {
    const session = useSession();

  if (session.loading) {
    return <div>Carregando...</div>;
  }

  if (!session.data) {
    return <div>Você não está autenticado.</div>;
  }

  return (
    <div>
      {console.log("SESSION>>>", session.data)}
      <h1>Página Protegida</h1>
      <p>Bem-vindo, {session.data.user}!</p>
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