import { useAuth } from "../../hooks/useAuth";
export const Logout = () => {
  const { logout }: any = useAuth();
  const handleLogout = () => {
    logout();
  };
  handleLogout();
  return <></>;
};
