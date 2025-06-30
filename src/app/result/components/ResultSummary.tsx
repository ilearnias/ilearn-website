"use client";
import React from 'react';
import { Container } from "react-bootstrap";
import SubHeading from '@/components/common/SubHeading';
import TextLabel from '@/components/common/TextLabel';

interface ResultRow {
  year: number;
  totalSelections: number;
}

const resultData: ResultRow[] = [
  { year: 2024, totalSelections: 42 },
  { year: 2023, totalSelections: 38 },
  { year: 2022, totalSelections: 35 },
  { year: 2021, totalSelections: 31 },
  { year: 2020, totalSelections: 28 }
];

const ResultSummary = () => {
  return (
    <Container className="py-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <SubHeading text="Results Summary" color="black" size="medium" />
        
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left">
                <th className="py-4 px-4">
                  <TextLabel text="Year" variant="button" color="gray" />
                </th>
                <th className="py-4 px-4">
                  <TextLabel text="Total Selections" variant="button" color="gray" />
                </th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((row) => (
                <tr key={row.year}>
                  <td className="py-4 px-4">
                    <TextLabel text={row.year} color="black" variant="nav" />
                  </td>
                  <td className="py-4 px-4">
                    <TextLabel text={row.totalSelections} color="green" variant="nav" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TextLabel 
          text="* Data includes selections in Civil Services, Indian Forest Service, and other UPSC services." 
          color="gray" 
          variant="default" 
          className="mt-6 italic"
        />
      </div>
    </Container>
  );
};

export default ResultSummary; 