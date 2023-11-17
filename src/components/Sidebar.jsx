import {Stack, TextField} from "@mui/material";

export function Sidebar({searchValueChange}) {

    const handleSearch = (value) => {
        searchValueChange(value);
    }
    return (
        <Stack>
            <TextField label="Name" onChange={(e) => handleSearch(e.target.value)}></TextField>
        </Stack>
    )
}