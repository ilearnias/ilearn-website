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
  top100Ranks: number;
  pcmClassroom: number;
  firstAttempt: number;
}

const resultData: ResultRow[] = [
  {
    year: 2025,
    totalSelections: 46,
    top100Ranks: 6,
    pcmClassroom: 11,
    firstAttempt: 1,
  },
  {
    year: 2024,
    totalSelections: 28,
    top100Ranks: 4,
    pcmClassroom: 12,
    firstAttempt: 2,
  },
  {
    year: 2023,
    totalSelections: 65,
    top100Ranks: 18,
    pcmClassroom: 52,
    firstAttempt: 25,
  },
  {
    year: 2022,
    totalSelections: 48,
    top100Ranks: 12,
    pcmClassroom: 36,
    firstAttempt: 20,
  },
  {
    year: 2021,
    totalSelections: 35,
    top100Ranks: 8,
    pcmClassroom: 28,
    firstAttempt: 15,
  },
  {
    year: 2020,
    totalSelections: 18,
    top100Ranks: 5,
    pcmClassroom: 14,
    firstAttempt: 8,
  },
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
    <Container className="py-12">
      <div className="bg-white rounded-lg py-6">
        <Heading
          text="Results Summary"
          color="tricolor"
          className="!text-3xl md:!text-4xl lg:!text-5xl !font-bold"
          animate={true}
        />
        {/* Table View */}
        <div className="mt-8 overflow-x-auto w-full">
          <table className="min-w-[600px] w-full bg-white rounded-xl shadow-md overflow-hidden text-sm md:text-base">
            <thead>
              <tr className="bg-blue-50 text-gray-700 text-left">
                <th className="py-2 px-2 md:py-3 md:px-4 font-semibold rounded-tl-xl">
                  Year
                </th>
                <th className="py-2 px-2 md:py-3 md:px-4 font-semibold">
                  Total Selections
                </th>
                <th className="py-2 px-2 md:py-3 md:px-4 font-semibold">
                  Top 100 Ranks
                </th>
                <th className="py-2 px-2 md:py-3 md:px-4 font-semibold">
                  PCM & Classroom
                </th>
                <th className="py-2 px-2 md:py-3 md:px-4 font-semibold rounded-tr-xl">
                  First Attempt
                </th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((row, idx) => (
                <tr
                  key={row.year}
                  className={`transition-all duration-200 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-100 hover:scale-[1.01] hover:shadow-sm`}
                  style={{ borderRadius: "0.75rem" }}
                >
                  <td className="py-2 px-2 md:py-3 md:px-4 font-semibold text-blue-900 rounded-l-lg">
                    {row.year}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4">
                    <span className="inline-block bg-green-50 text-green-600 rounded-full px-2 py-1 md:px-3 text-xs md:text-sm font-semibold">
                      {row.totalSelections}
                    </span>
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-center">
                    {row.top100Ranks}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-center">
                    {row.pcmClassroom}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-4 text-center rounded-r-lg">
                    {row.firstAttempt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <div className="bg-blue-50 rounded-lg p-4 text-gray-600 italic text-base">
            Consistently high Prelims-cum-Mains and classroom results—especially
            from first-attempt candidates—show our academic excellence.
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ResultSummary;
