import React from "react";

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
};

const LordIcon = ({ icon, ...otherProps }) => {
  return (
    <lord-icon
      {...otherProps}
      src={`https://cdn.lordicon.com/${ICONS[icon]}`}
      trigger="hover"
      style={{ width: "32px", height: "32px" }}
    />
  );
};

export default LordIcon;
