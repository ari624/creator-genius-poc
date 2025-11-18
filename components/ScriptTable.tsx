'use client';

import { ScriptRow } from '@/lib/types';

interface ScriptTableProps {
  rows: ScriptRow[];
}

export default function ScriptTable({ rows }: ScriptTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="gradient-primary">
            <th className="px-6 py-4 text-left text-white font-semibold text-lg w-1/2">
              A-Roll (Spoken)
            </th>
            <th className="px-6 py-4 text-left text-white font-semibold text-lg w-1/2">
              B-Roll (Visual)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <td className="px-6 py-4 align-top">
                <div className="text-gray-800 whitespace-pre-wrap">{row.a_roll}</div>
              </td>
              <td className="px-6 py-4 align-top bg-purple-50/50">
                <div className="text-gray-700 whitespace-pre-wrap italic">
                  {row.b_roll}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
