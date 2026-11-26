import { D1AuraEditFallenAngels } from "./D1AuraEditFallenAngels";
import { Statement } from "./S3Statement";
import { ProofPositions } from "./ProofPositions";
import { Work } from "./W1Work";
import { WK7StackSwissAxis } from "./WK7StackSwissAxis";
import { OffSwiss } from "./OffSwiss";
import { K1ContactTheFinalCut } from "./K1ContactTheFinalCut";
import { Intertitle } from "./Intertitle";
import { BeyondGit } from "./BeyondGit";
import { useGlide } from "./Scroll";
import "./Unified.css";

/* PORTFOLIO · UNIFIED. The full page after the unification pass: one ink, one paper, one red (the hero's red field only on
   the bookends); Archivo (62 display / 100 text), Instrument Serif and Martian Mono only; one section numbering in page order
   that the menu matches (01 Measured · 02 Work, with the Stack as its kit · 03 Off the clock · 04 Contact); one scroll engine
   owned by the page; about a third less scroll; and the email copies on a single click. */
export const PortfolioUnified = () => {
  useGlide();
  return <main className="s3-page uni">
      <D1AuraEditFallenAngels />
      <Statement />
      <Intertitle tone="paper" lines={["Claims are easy.", "Here's what was measured."]} />
      <ProofPositions />
      <Work layout="wrap" siuPhoto="/assets/site/25a95b185d3ccc533f42b8546444da5c7494660b961baf7d7a54c626a94fe0f4.webp" />
      <WK7StackSwissAxis />
      <BeyondGit />
      <OffSwiss />
      <K1ContactTheFinalCut />
    </main>;
};
