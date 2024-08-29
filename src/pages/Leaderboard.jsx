import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import databaseService from "../supabase/database";
import { numFormat } from "../utils/Helper";

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
    { key: "points", name: "Points" },
  ];

  const renderCell = useCallback((team, columnKey) => {
    const { name, level, points } = team;
    switch (columnKey) {
      case "number":
        return <p>{numFormat(teams.indexOf(team) + 1)}</p>;
      case "name":
        return <p>{name}</p>;
      case "level":
        return <p>{level}</p>;
      case "points":
        return <p>{points}</p>;
    }
  });

  useEffect(() => {
    databaseService.get_leaderboard().then(({ data }) => setTeams(data));
  });

  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold">Leaderboard</p>
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
