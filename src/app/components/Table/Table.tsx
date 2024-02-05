"use client";
import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { TableProps } from "@/app/general/interfaces";
import { tableHeaders } from "@/app/general/resources";

export default function Table({ rows }: TableProps) {
    return (
        <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((header, index) => (
                            <TableCell align="right" key={index}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(rows) &&
                        rows.length > 0 &&
                        rows &&
                        rows?.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                {Object.keys(row).map((key, index) => (
                                    <TableCell align="right" key={index}>
                                        {row[key as keyof typeof row]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
}
