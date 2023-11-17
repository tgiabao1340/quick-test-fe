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

// eslint-disable-next-line react/prop-types
export default function ProductCard({product}) {
    const {name, description, url, price} = product;
    return (
        <Card className="product-card">
            <CardMedia
                component="img"
                height="320"
                image={url}
                alt=""
            />
            <CardContent>
                <Stack
                    direction="row"
                    justifyContent="space-between
"
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