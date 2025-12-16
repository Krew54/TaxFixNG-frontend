import { HelloWave } from "./hello-wave";

export const Username = ({ name }: { name?: string }) => {
  const firstName = name?.trim().split(" ")[0];

  return (
    <>
      Hi {firstName} <HelloWave />
    </>
  );
};
