import { useAuthentication } from "../../hooks/auth/login.hook";
import { useGetCurrentUser } from "../../hooks/user/user.hook";

const Dashboard = () => {
  const { isAuth } = useAuthentication();
  const { data: currentUser } = useGetCurrentUser();
  console.log(currentUser);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      DASHBAORD
    </div>
  );
};

export default Dashboard;
