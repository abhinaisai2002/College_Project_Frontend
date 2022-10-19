import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const ICONS = {
  notification: "psnhyobz.json",
  search: "xfftupfv.json",
  email: "diihvcfp.json",
  home: "osuxyevn.json",
  assignment: "kulwmpzs.json",
  assessment: "usxfmtjg.json",
  error: "bmnlikjh.json",
  settings: "hwuyodym.json",
  file: "iiixgoqp.json",
  check: "egiwmiit.json",
  book: "kipaqhoz.json",
  article: "vufjamqa.json",
  confetti: "tyvtvbcy.json",
  upload: "wfadduyp.json",
  trash: "kfzfxczd.json",
  profile: "bhfjfgqz.json",
  share: "wxhtpnnk.json",
  flatArrow: "zmkotitn.json",
  arrowUp: "xsdtfyne.json",
  arrowDown: "rxufjlal.json",
  folder: "fpmskzsv.json",
  bookmark: "gigfpovs.json",
  autoNew: "akuwjdzh.json",
  close: "nhfyhmlt.json",
  heart: "pnhskdva.json",
};

const LordIcon = ({ icon, ...otherProps }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <lord-icon
      // colors="primary:#fff"
      // colors={`primary:${theme === "dark" ? "#fff" : "#24282e"}`}
      colors={`primary:${theme === "dark" ? "#fff" : "#24282e"}`}
      src={`https://cdn.lordicon.com/${ICONS[icon]}`}
      trigger="hover"
      style={{ width: "32px", height: "32px" }}
      
      {...otherProps}
    />
  );
};

export default LordIcon;
