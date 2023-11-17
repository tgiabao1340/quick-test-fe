import * as React from "react";
import {FormControl, Select, Slider, Stack, TextField} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import './Sidebar.css';
import Typography from "@mui/material/Typography";

export function Sidebar({searchValueChange, onClearFilter}) {

    const [keyword, setKeyword] = useState("");
    const [price, setPrice] = useState([0, 500]);
    const [sortDate, setSortDate] = useState("");

    const onSearchValue = () => {
        searchValueChange({keyword, price});
    }

    const handleChangePrice = (event, newValue) => {
        setPrice(newValue);
    }

    const handleClearFilter = () => {
        setKeyword("");
        setPrice([0, 500]);
        setSortDate("");
        onClearFilter();
    }

    return (
        <Stack spacing={2} ml={1}>
            <TextField label="Name" value={keyword} onChange={(e) => setKeyword(e.target.value)}></TextField>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Typography variant="body2" color="text.secondary" className="filter-label">
                    Price
                </Typography>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={price}
                    onChange={handleChangePrice}
                    valueLabelDisplay="auto"
                    min={0}
                    max={500}
                />
            </Stack>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={sortDate}
                    onChange={(e) => setSortDate(e.target.value)}
                    label="Created Date"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="desc">Desc</MenuItem>
                    <MenuItem value="asc">Asc</MenuItem>
                </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary" className="filter-label">
                Time
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={sortDate}
                    onChange={(e) => setSortDate(e.target.value)}
                    label="Time"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="desc">Desc</MenuItem>
                    <MenuItem value="asc">Asc</MenuItem>
                </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary" className="filter-label">
                Tier
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={sortDate}
                    onChange={(e) => setSortDate(e.target.value)}
                    label="Time"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="desc">Desc</MenuItem>
                    <MenuItem value="asc">Asc</MenuItem>
                </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary" className="filter-label">
                Price
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={sortDate}
                    onChange={(e) => setSortDate(e.target.value)}
                    label="Time"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="desc">Desc</MenuItem>
                    <MenuItem value="asc">Asc</MenuItem>
                </Select>
            </FormControl>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Button variant="outlined" fullWidth onClick={handleClearFilter}>Clear Filter</Button>
                <Button variant="contained" fullWidth color="primary" onClick={onSearchValue}>Search</Button>
            </Stack>
        </Stack>
    )
}