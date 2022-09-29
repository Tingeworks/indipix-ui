import AdminLayout from "../../../Components/Layout/AdminLayout";
import nookies from 'nookies'
import CONFIG from "../../../CONFIG";

export default function Users({ isLoggedIn } : any) {
  return <AdminLayout isLoggedIn={isLoggedIn}>
    
  </AdminLayout>;
}

export async function getServerSideProps(context: any) {
  const cookies = nookies.get(context);
  const response = await fetch(`${CONFIG.API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });

  const data = await response.json();

  if (data.statusCode >= 400) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  } else {
    if (data.role == "user") {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    } else {
      return {
        props: {
          loggedIn: true,
          user: data,
        },
      };
    }
  }
}
