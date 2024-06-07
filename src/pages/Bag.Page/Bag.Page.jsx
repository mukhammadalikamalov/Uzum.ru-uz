import { Container, Grid, Box, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import BagCard from "../../component/BagCard";
import SearchAppBar from "../../component/Layout/Header";
import ProductCard from "../../component/productCard";
import BagGoods from "../../hooks/getGoods";

const BagPage = () => {
  const [time, setTime] = useState("");
  const { Goods, res, bagLoading, goodsloading, bagError, goodError } = BagGoods();

  useEffect(() => {
    const currentDate = new Date();
    const tomorrowDate = new Date();

    tomorrowDate.setDate(currentDate.getDate() + 1);
    setTime(tomorrowDate.toDateString());
  }, []);

  const popProds = useMemo(() => (Goods ? Goods.filter((good) => good.type === "PC") : []), [Goods]);

  return (
    <>
      <SearchAppBar />
      <Box sx={{ display: 'flex', marginLeft: '12%', marginTop: " 19px" }}>
        <Typography variant='h5'> Savatingiz,  </Typography>
        <Typography variant="h5" sx={{ color: 'lightgray' }}>1 ta mahsulot</Typography>
      </Box>
      <Container>
        {res && res.map((data) => <BagCard goods={data} key={data.id} />)}
        <Grid container spacing={2}>
          {popProds.map((good) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              key={good.id}
              sx={{
                flexBasis: { xs: "100%", sm: "50%", md: "33.33%", lg: "25%", xl: "20%" },
                maxWidth: { xs: "100%", sm: "50%", md: "33.33%", lg: "25%", xl: "20%" }
              }}
            >
              <ProductCard good={good} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default BagPage;
