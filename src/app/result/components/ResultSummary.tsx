"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Heading from "@/components/common/Heading";
import SubHeading from "@/components/common/SubHeading";
import TextLabel from "@/components/common/TextLabel";
import Container from "@/components/common/Container";

interface ResultRow {
  year: number;
  totalSelections: number;
}

const resultData: ResultRow[] = [
  { year: 2024, totalSelections: 42 },
  { year: 2023, totalSelections: 38 },
  { year: 2022, totalSelections: 35 },
  { year: 2021, totalSelections: 31 },
  { year: 2020, totalSelections: 28 },
];

function useCountUp(target: number, isActive: boolean, duration = 1) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!isActive) {
      setCount(0);
      return;
    }
    let start = 0;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = (now - startTime) / 1000;
      if (elapsed < duration) {
        setCount(Math.floor(target * (elapsed / duration)));
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, target, duration]);
  return count;
}

const ResultCard: React.FC<{ row: ResultRow; index: number }> = ({
  row,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const count = useCountUp(row.totalSelections, isInView, 1.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="result-summary-card min-w-[220px] max-w-xs bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 flex flex-col items-center justify-center"
    >
      <TextLabel
        text={row.year}
        color="gray"
        variant="button"
        className="mb-2"
      />
      <span className="text-4xl font-bold text-blue-700">{count}</span>
      <TextLabel
        text="Selections"
        color="black"
        variant="nav"
        className="mt-1"
      />
    </motion.div>
  );
};

const ResultListRow: React.FC<{ row: ResultRow }> = ({ row }) => (
  <div className="flex flex-row justify-between items-center py-2 border-b last:border-b-0 px-2">
    <span className="text-base text-gray-700 font-medium">{row.year}</span>
    <span className="text-lg font-bold text-blue-700">
      {row.totalSelections}
    </span>
    <span className="text-xs text-gray-500 ml-2">Selections</span>
  </div>
);

const ResultSummary = () => {
  return (
    <Container className="py-12  ">
      <div className="bg-white rounded-lg  py-6 ">
        <Heading
          text="Results Summary"
          color="tricolor"
          className="!text-3xl md:!text-4xl lg:!text-5xl !font-bold"
          animate={true}
        />
        {/* Mobile List View */}
        <div className="block md:hidden mt-8">
          <div className="bg-blue-50 rounded-lg divide-y">
            {resultData.map((row) => (
              <ResultListRow row={row} key={row.year} />
            ))}
          </div>
        </div>
        {/* Desktop Card View */}
        <div className="hidden md:block mt-8  overflow-x-auto scrollbar-hide ">
          <div className="flex flex-row justify-between  ">
            {resultData.map((row, idx) => (
              <ResultCard row={row} index={idx} key={row.year} />
            ))}
          </div>
        </div>
        <p className="mt-6 italic text-gray-500">
          * Data includes selections in Civil Services, Indian Forest Service,
          and other UPSC services.
        </p>
      </div>
    </Container>
  );
};

export default ResultSummary;
