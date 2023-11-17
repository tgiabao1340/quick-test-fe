import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PropTypes from "prop-types";
import moment from "moment";
import {Stack} from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function ProductCard({product}) {
    const {name, description, url, price, createdDate} = product;
    return (
        <Card>
            <CardMedia
                component="img"
                height="194"
                image={url}
                alt="Paella dish"
            />
            <CardContent>
                <Stack
                    direction="column"
                    justifyContent="space-around"
                    alignItems="stretch"
                    spacing={2}
                >
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
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
                subheader={moment(createdDate).format()}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object
}