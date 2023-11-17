import {Grid, Stack} from "@mui/material";
import ProductCard from "./ProductCard.jsx";
import PropTypes from "prop-types";

export default function ProductList(props) {
    const {products} = props;
    return (
        <Grid container spacing={2}>
            {products?.map((item, index) => <Grid item key={index} xs={3}><ProductCard product={item}></ProductCard></Grid>)}
        </Grid>
    )
}

ProductList.propsTypes = {
    products: PropTypes.array
}