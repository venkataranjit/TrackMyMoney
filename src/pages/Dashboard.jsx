import Heading from "../components/Heading";
import RecentTransactions from "../components/RecentTransactions";
import Boxs from "../components/Boxs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTransactions } from "../features/transactions/getTransactionsSlice";
import AvailableBalance from "../components/AvailableBalance";
import Overview from "../components/Overview";

const Dashboard = () => {
  const userDetails = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions(userDetails.user.id));
  }, []);

  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <Heading heading="Dashboard" />
        <div className="row">
          <div className="col-xl-3 col-xxl-3">
            <AvailableBalance />
          </div>
          <div className="col-xl-6 col-xxl-6 d-flex">
            <div className="w-100">
              <Boxs />
            </div>
          </div>

          <div className="col-xl-3 col-xxl-3">
            <Overview />
          </div>
        </div>
        <RecentTransactions />
      </div>
    </>
  );
};

export default Dashboard;
