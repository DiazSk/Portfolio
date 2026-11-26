import { useMemo } from "react";

/* mockup photography from Unsplash (free licence) until Zaid's own photos arrive; the SIU still is his pick */
const U = (id: string) => (w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;
export const PH = {
  siu: (() => "/assets/site/25a95b185d3ccc533f42b8546444da5c7494660b961baf7d7a54c626a94fe0f4.webp") as (w: number) => string,
  seattle: U("photo-1502175353174-a7a70e73b362"),
  la: U("photo-1580655653885-65763b2597d0"),
  vegas: U("photo-1581351721010-8cf859cb14a4"),
  dubai: U("photo-1518684079-3c830dcef090"),
  mumbai: U("photo-1562979314-bee7453e911c"),
  shimla: U("photo-1597074866923-dc0589150358"),
  kashmir: U("photo-1598091383021-15ddea10925d"),
  goa: U("photo-1512343879784-a960bf40e7f2"),
  kerala: U("photo-1602216056096-3b40cc0c9944"),
  delhi: U("photo-1587474260584-136574528ed5"),
  stadium: U("photo-1629217855633-79a6925d6c47"),
  gym: U("photo-1583454110551-21f2fa2afe61"),
  gaming: U("photo-1616588589676-62b3bd4ff6d2"),
  music: U("photo-1505740420928-5e560c06d30e"),
  vinyl: U("photo-1483412033650-1015ddeb83d1"),
  mac: U("photo-1589362281138-e3f7ebe47f1a")
};
export const MOCK = (k: keyof typeof PH) => k !== "siu";

/* Lando's topographic ground: a few wobbly closed contours, drawn once from a fixed seed */
export const Contours = ({
  seed = 7,
  className = ""
}: {
  seed?: number;
  className?: string;
}) => {
  const paths = useMemo(() => {
    let s = seed;
    const rnd = () => (s = s * 16807 % 2147483647) / 2147483647;
    const out: string[] = [];
    for (let c = 0; c < 6; c++) {
      const cx = rnd() * 1600 - 100,
        cy = rnd() * 1000 - 50,
        R = 160 + rnd() * 260;
      const h = [1, 2, 3, 4].map(k => [rnd() * .22 / k, rnd() * 6.28]);
      for (let ring = 0; ring < 4; ring++) {
        const r0 = R * (1 + ring * .42);
        let d = "";
        for (let i = 0; i <= 96; i++) {
          const t = i / 96 * Math.PI * 2;
          const r = r0 * (1 + h.reduce((a, [amp, ph], k) => a + amp * Math.sin((k + 2) * t + ph + ring * .4), 0));
          d += (i ? "L" : "M") + (cx + r * Math.cos(t)).toFixed(1) + " " + (cy + r * .72 * Math.sin(t)).toFixed(1);
        }
        out.push(d + "Z");
      }
    }
    return out;
  }, [seed]);
  return <svg className={`contours ${className}`} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>;
};