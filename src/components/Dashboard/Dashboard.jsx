import ResponsiveAppBar from "../AppBar/AppBar.jsx";
import {Grid, Stack} from "@mui/material";
import {Sidebar} from "../Sidebar/Sidebar.jsx";
import ProductList from "../ProductList/ProductList.jsx";
import {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";
import Button from "@mui/material/Button";
import './Dashboard.css';
export default function Dashboard(){

    const limit = 8;
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [isMore, setIsMore] = useState(true);
    const listButton = ['ALL', 'Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 6', 'Product 7', 'Product 8'];

    useEffect(() => {
        getProduct();
        const intervalCall = setInterval(() => {
            setProducts(() => {
                setSkip(0);
                getProduct();
                return [];
            });
        }, 60000);
        return () => {
            // clean up
            clearInterval(intervalCall);
        };
    }, []);

    const loadMore = () => {
        setSkip(skip => {
            getProduct();
            return skip + limit;
        });
    }

    const getProduct = () => {
        const getData = setTimeout(() => {
            let url = '/api/products' + '?limit=' + limit + '&skip=' + skip;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if(data.length === 0) {
                        setIsMore(false);
                        return;
                    }
                    setIsMore(true);
                    setProducts(products => [...products, ...data]);
                })
                .catch((err) => {
                    console.log(err.message);
                });
            return () => {
                clearTimeout(getData);
            }
        }, 500); // Debounce 500ms

    }
    const handleSearch = (search) => {
        const {price, keyword} = search;
        let url = '/api/products' + '?limit=' + limit + '&skip=' + skip + '&name=' + keyword + '&priceMin=' + price[0] + '&priceMax=' + price[1];
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);

    const handleClearFilters = () => {
        setProducts(() => {
            setSkip(0);
            getProduct();
            return [];
        });
    }

    return (
        <>
            <ResponsiveAppBar />
            <Grid container spacing={2} mt={2}>
                <Grid item xs={3}>
                    <Sidebar searchValueChange={(value) => debouncedHandleSearch(value)} onClearFilters={handleClearFilters}></Sidebar>
                </Grid>
                <Grid item xs={9}>
                    <Stack
                        direction="row"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        {listButton.map((item, index) => <Button key={index} variant={index === 0 ? "contained" : "outlined"}>{item}</Button>)}
                    </Stack>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                    >
                        <ProductList products={products}></ProductList>
                        {(products.length >= 8 && isMore )&& <Button onClick={loadMore} color="primary" variant="contained" className="load-more-btn">Load More</Button>}
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

