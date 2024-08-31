import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import databaseService from "../supabase/database";
import { numFormat, timeFormat } from "../utils/Helper";

function Leaderboard() {
  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(teams.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return teams.slice(start, end);
  }, [page, teams]);

  const columns = [
    { key: "number", name: "SL No." },
    { key: "name", name: "Team Name" },
    { key: "level", name: "Level" },
    { key: "last_submitted", name: "Last submitted" },
  ];

  const renderCell = useCallback((team, columnKey) => {
    const { name, level, last_submitted } = team;
    switch (columnKey) {
      case "number":
        return <p>{numFormat(teams.indexOf(team) + 1)}</p>;
      case "name":
        return <p>{name}</p>;
      case "level":
        return <p>{numFormat(level)}</p>;
      case "last_submitted":
        return <p>{timeFormat(last_submitted)}</p>;
    }
  });

  useEffect(() => {
    databaseService.get_leaderboard().then(({ data }) => setTeams(data));
  });

  return (
    <div className="flex flex-col items-center lg:w-[75%] w-full space-y-6">
      <p className="text-2xl font-bold text-white">Leaderboard</p>
      <Table
        isStriped
        selectionMode="multiple"
        aria-label="wallet-transactions"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination isCompact showControls showShadow page={page} total={pages} onChange={setPage} />
          </div>
        }
      >
        <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.name}</TableColumn>}</TableHeader>
        <TableBody items={items} emptyContent="No teams">
          {(team) => <TableRow key={team.id}>{(columnKey) => <TableCell>{renderCell(team, columnKey)}</TableCell>}</TableRow>}
        </TableBody>
      </Table>
    </div>
  );
}

export default Leaderboard;
