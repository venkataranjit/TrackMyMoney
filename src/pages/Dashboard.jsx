import Heading from "../components/Heading";

import RecentTransactions from "../components/RecentTransactions";
import LastTransaction from "../components/LastTransaction";
import Boxs from "../components/Boxs";
import ThisMonthOverview from "../components/ThisMonthOverview";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { recentTransactions } from "../features/transactions/recentTransactionsSlice";

const Dashboard = () => {
  const userDetails = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recentTransactions(userDetails.user.id));
  }, []);

  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <Heading heading="Dashboard" />
        <div className="row">
          <div className="col-xl-6 col-xxl-6 d-flex">
            <div className="w-100">
              <Boxs />
            </div>
          </div>

          <div className="col-xl-3 col-xxl-3">
            <ThisMonthOverview />
          </div>
          <div className="col-xl-3 col-xxl-3">
            <LastTransaction />
          </div>
        </div>
        <RecentTransactions />
      </div>
    </>
  );
};

export default Dashboard;
