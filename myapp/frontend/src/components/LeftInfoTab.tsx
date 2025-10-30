// components/academics/LeftInfoTab.tsx
"use client";

import ViewReport from "./left/ViewReport";
import SectionLinks from "./left/SectionLink";
import IconBook from "./left/IconBook";

export default function LeftInfoTab() {
  return (
    <div className="space-y-4">
      <ViewReport />
      <SectionLinks />
      {/* <IconBook /> */}
    </div>
  );
}
