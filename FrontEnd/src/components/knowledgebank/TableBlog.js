import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Blog.css';
import { ThreeDPrinting } from './data';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 700,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export function TableBlog() {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">
                            3D Printing Technology
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Materials
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Applications
                        </StyledTableCell>
                        <StyledTableCell align="center">Pros</StyledTableCell>
                        <StyledTableCell align="center">Cons</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ThreeDPrinting.rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.materials}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.applications}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.pros}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.cons}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
