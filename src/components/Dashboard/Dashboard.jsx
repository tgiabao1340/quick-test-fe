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
    const [filter, setFilter] = useState({type: 'ALL'})
    const listButton = ['ALL', 'COMMON', 'RARE', 'EPIC', 'LEGENDARY'];

    useEffect(() => {
        getProduct();
    }, [filter]);

    useEffect(() => {
        const intervalCall = setInterval(() => {
            getProduct();
        }, 60000);
        return () => {
            // clean up
            clearInterval(intervalCall);
        };
    }, []);

    const loadMore = () => {
        setSkip(skip => {
            getProduct(true);
            return skip + limit;
        });
    }

    const getProduct = (isLoadMore = false) => {
        const getData = setTimeout(() => {
            let url = '/api/products' + '?limit=' + limit + '&skip=' + skip;
            if(filter.type) {
                url += '&type=' + filter.type;
            }
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if(data.length < limit) {
                        setIsMore(false);
                    }else {
                        setIsMore(true);
                    }

                    if(isLoadMore) {
                        setProducts(products => [...products, ...data]);
                    } else {
                        console.log(data);
                        setProducts(data);
                    }
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
        setFilter({type: 'ALL'});
    }

    const handleTypeFilter = (type) => {
        setSkip(0);
        setFilter({...filter, type});
    }

    return (
        <>
            <ResponsiveAppBar />
            <Grid container spacing={2} mt={2}>
                <Grid item xs={3}>
                    <Sidebar searchValueChange={(value) => debouncedHandleSearch(value)} onClearFilter={handleClearFilters}></Sidebar>
                </Grid>
                <Grid item xs={9}>
                    <Stack
                        direction="row"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        {listButton.map((item, index) => <Button key={index} variant={item === filter.type ? "contained" : "outlined"} onClick={() => handleTypeFilter(item)}>{item}</Button>)}
                    </Stack>
                    <Stack
                        mt={1}
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <ProductList products={products}></ProductList>
                        {(products.length >= 8 && isMore )&& <Button onClick={loadMore} color="primary" variant="contained" className="load-more-btn" size="large">View More</Button>}
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

