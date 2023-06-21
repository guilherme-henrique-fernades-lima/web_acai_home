import useSWR from "swr";
import { useContext, useState } from "react";

//Context
import { AuthContext } from "@/context/AuthContext";

export function useFetch(url) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const { data, error, isLoading } = useSWR(url, async (url) => {
    if (user?.token.length > 0) {
      const response = await fetch(url, {
        headers: {
          Authorization: user.token,
        },
      });

      if (response.status == 200) {
        const data = await response.json();
        setLoading(false);
        return data;
      }
    }
  });

  return { data, error, loading };
}
