import Headers from "../components/Headers";
import Trending from "../components/Trending";
import CMCTable from "../components/cmc-table/CMCTable";
import SwapCryptoModal from "../components/SwapCryptoModal";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen max-w-full">
      <Headers />
      <SwapCryptoModal />
      <div className="mt-10" />
      <Trending />
      <div className="mt-20 lg:mt-14 sm:mt-8" />
      <CMCTable />
      <Footer />
    </div>
  );
};

export default Home;
