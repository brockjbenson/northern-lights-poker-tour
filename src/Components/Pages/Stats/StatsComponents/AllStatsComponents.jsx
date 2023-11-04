import React from "react";
import "./AllStatsComponents.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function AllStatsComponents({ props }) {
  return (
    <div className="cash-component-container">
      <div className="cash-component-header"></div>
      <TableContainer className="cash-games-table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="cash games table">
          <TableHead className="cash-table-head">
            <TableRow>
              <TableCell className="cash-white">Player</TableCell>
              <TableCell className="cash-white" align="right">
                Net Profit
              </TableCell>
              <TableCell className="cash-white" align="right">
                Profits
              </TableCell>
              <TableCell className="cash-white" align="right">
                Losses
              </TableCell>
              <TableCell className="cash-white" align="right">
                Session Net
              </TableCell>
              <TableCell className="cash-white" align="right">
                Avg Win
              </TableCell>
              <TableCell className="cash-white" align="right">
                Avg Loss
              </TableCell>
              <TableCell className="cash-white" align="right">
                Buy-ins Per
              </TableCell>
              <TableCell className="cash-white" align="right">
                Sessions
              </TableCell>
              <TableCell className="cash-white" align="right">
                Wins
              </TableCell>
              <TableCell className="cash-white" align="right">
                Losses
              </TableCell>
              <TableCell className="cash-white" align="right">
                Win %
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.allCashGames.map((cash) => (
              <TableRow
                key={cash.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="cash-white" component="th" scope="row">
                  {cash.first_name} {cash.last_name}
                </TableCell>
                <TableCell
                  className={
                    cash.net_profit < 0
                      ? "cash-negative"
                      : cash.net_profit === "0.00"
                      ? "cash-white"
                      : "cash-positive"
                  }
                  align="right"
                >
                  {cash.net_profit}
                </TableCell>
                <TableCell
                  className={
                    cash.net_profit < 0
                      ? "cash-negative"
                      : cash.net_profit === "0.00"
                      ? "cash-white"
                      : "cash-positive"
                  }
                  align="right"
                >
                  {cash.gross_winnings}
                </TableCell>
                <TableCell className="cash-negative" align="right">
                  {cash.gross_losses}
                </TableCell>
                <TableCell
                  className={
                    cash.avg_net_profit < 0
                      ? "cash-negative"
                      : cash.net_profit === "0.00"
                      ? "cash-white"
                      : "cash-positive"
                  }
                  align="right"
                >
                  ${cash.avg_net_profit}
                </TableCell>
                <TableCell
                  className={
                    cash.avg_net_profit < 0
                      ? "cash-negative"
                      : cash.net_profit === "0.00"
                      ? "cash-white"
                      : "cash-positive"
                  }
                  align="right"
                >
                  $ {cash.avg_win}
                </TableCell>
                <TableCell className="cash-negative" align="right">
                  $ {cash.avg_loss}
                </TableCell>
                <TableCell className="cash-white" align="right">
                  {cash.average_buy_in}
                </TableCell>
                <TableCell className="cash-white" align="right">
                  {cash.sessions_played}
                </TableCell>
                <TableCell className="cash-white" align="right">
                  {cash.wins}
                </TableCell>
                <TableCell className="cash-white" align="right">
                  {cash.losses}
                </TableCell>
                <TableCell className="cash-white" align="right">
                  {cash.win_percentage}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
