import Heading from "../components/Heading";

import RecentTransactions from "../components/RecentTransactions";
import LastTransaction from "../components/LastTransaction";
import Boxs from "../components/Boxs";
import ThisMonthOverview from "../components/ThisMonthOverview";

const Dashboard = () => {
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
