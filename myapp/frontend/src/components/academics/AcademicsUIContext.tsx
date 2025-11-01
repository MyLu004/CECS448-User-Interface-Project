"use client";

import React, { createContext, useCallback, useMemo, useState } from "react";

type AcademicsUIContextValue = {
  selectedReport: string | null;
  setSelectedReport: (key: string | null) => void;

  /** a counter that increments whenever we want LowerDivision to open all groups */
  lowerDivisionOpenAllTick: number;
  openAllLowerDivision: () => void;
};

export const AcademicsUIContext = createContext<AcademicsUIContextValue>({
  selectedReport: null,
  setSelectedReport: () => {},
  lowerDivisionOpenAllTick: 0,
  openAllLowerDivision: () => {},
});

export function AcademicsUIProvider({ children }: { children: React.ReactNode }) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [lowerDivisionOpenAllTick, setLowerDivisionOpenAllTick] = useState(0);

  const openAllLowerDivision = useCallback(() => {
    setLowerDivisionOpenAllTick((n) => n + 1);
  }, []);

  const value = useMemo(
    () => ({
      selectedReport,
      setSelectedReport,
      lowerDivisionOpenAllTick,
      openAllLowerDivision,
    }),
    [selectedReport, lowerDivisionOpenAllTick, openAllLowerDivision]
  );

  return (
    <AcademicsUIContext.Provider value={value}>
      {children}
    </AcademicsUIContext.Provider>
  );
}
