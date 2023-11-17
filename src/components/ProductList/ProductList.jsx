import {Grid} from "@mui/material";
import ProductCard from "../ProductCard/ProductCard.jsx";
import PropTypes from "prop-types";

export default function ProductList(props) {
    const {products} = props;
    return (
        <Grid container maxWidth="100%" mt={1}>
            {products?.map((item, index) => <Grid item key={index} xs={3}><ProductCard product={item}></ProductCard></Grid>)}
        </Grid>
    )
}

ProductList.propsTypes = {
    products: PropTypes.array
}