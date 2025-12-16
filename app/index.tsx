import { getData } from "@/helpers";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [redirectTo, setRedirectTo] = useState<"/login" | "/(tabs)" | null>(
    null
  );

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getData("token");

      if (token) {
        setRedirectTo("/login");
      } else {
        setRedirectTo("/(tabs)");
      }
    };

    checkAuth();
  }, []);

  if (!redirectTo) return null; // or splash/loading screen

  return <Redirect href={redirectTo} />;
}
