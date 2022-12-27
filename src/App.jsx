import ScrollToTop from "@/base-components/scroll-to-top/Main";
import { RecoilRoot } from "recoil";
import IndexModal from "./layouts/modals/IndexModal";
import Router from "./router";

function App() {
  return (

      <RecoilRoot>
        <IndexModal />
        <Router />
        <ScrollToTop />
      </RecoilRoot>
  );
}

export default App;
