import {Slider, Stack, TextField} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function Sidebar({searchValueChange}) {

    const [keyword, setKeyword] = useState("");
    const [price, setPrice] = useState([0, 500]);

    const onSearchValue = () => {
        searchValueChange({keyword, price});
    }

    const handleChangePrice = (event, newValue) => {
        console.log(newValue);
        setPrice(newValue);
    }
    return (
        <Stack spacing={1}>
            <TextField label="Name" onChange={(e) => setKeyword(e.target.value)}></TextField>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Typography variant="body2" color="text.primary">
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
            <Button variant="contained" onClick={onSearchValue}>Search</Button>
        </Stack>
    )
}