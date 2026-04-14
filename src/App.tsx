import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/DashboardLayout";
import LandingPage from "@/pages/LandingPage";
import OverviewPage from "@/pages/OverviewPage";
import AgingPage from "@/pages/AgingPage";
import SupplierPage from "@/pages/SupplierPage";
import WoodPage from "@/pages/WoodPage";
import TpecPage from "@/pages/TpecPage";
import BlockedPage from "@/pages/BlockedPage";
import VolumetryPage from "@/pages/VolumetryPage";
import AIAgentPage from "@/pages/AIAgentPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<OverviewPage />} />
            <Route path="/aging" element={<AgingPage />} />
            <Route path="/supplier" element={<SupplierPage />} />
            <Route path="/wood" element={<WoodPage />} />
            <Route path="/tpec" element={<TpecPage />} />
            <Route path="/blocked" element={<BlockedPage />} />
            <Route path="/volumetry" element={<VolumetryPage />} />
            <Route path="/ai-agent" element={<AIAgentPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
