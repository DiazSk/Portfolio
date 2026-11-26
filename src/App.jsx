import { useEffect } from "react";
import { PortfolioUnified } from "./site/PortfolioUnified";

/* The whole site is one page, designed and verified on the MagicPath canvas
   ("Portfolio · Unified") and ported as-is into src/site/. */
const App = () => {
  /* A hash in the URL resolves before layout settles, so the browser lands
     short of the target. Re-run the jump once after first paint. */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    });
  }, []);

  return <PortfolioUnified />;
};

export default App;
