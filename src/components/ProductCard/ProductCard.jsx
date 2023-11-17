import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import PropTypes from "prop-types";
import {Stack} from "@mui/material";
import './ProductCard.css';
import Button from "@mui/material/Button";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from "@mui/material/IconButton";

// eslint-disable-next-line react/prop-types
export default function ProductCard({product}) {
    const {name, description, url, price, type} = product;
    return (
        <Card className="product-card">
            <div className="product-image">
                <CardMedia
                    component="img"
                    height="320"
                    image={url}
                    alt=""
                />
                <div className="overlay">
                    <Stack
                        width="100%"
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <Button variant="outlined">{type}</Button>
                        <IconButton color="default">
                            <FavoriteIcon />
                        </IconButton>
                    </Stack>
                </div>
            </div>
            <CardContent>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Typography variant="body2" color="text.secondary" className="description">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.primary" className="price">
                        {price}
                    </Typography>
                </Stack>
            </CardContent>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                        U
                    </Avatar>
                }
                title={name}
            />
        </Card>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object
}