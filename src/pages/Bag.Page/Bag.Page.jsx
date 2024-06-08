import { Container, Grid, Box, Typography, Button } from "@mui/material";
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

  const totalItems = res ? res.length : 0;
  const totalPrice = res ? res.reduce((sum, item) => sum + item.price, 0) : 0;

  return (
    <>
      <SearchAppBar />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <Typography variant='h5'>Savatingiz,</Typography>
              <Typography variant="h5" sx={{ color: 'lightgray', ml: 1 }}>1 ta mahsulot</Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              {res && res.map((data) => <BagCard goods={data} key={data.id} />)}
              <Typography variant="h5" sx={{ mt: 4, fontWeight: '500' }}>Bu mahsulot bilan quyidagilar xarid qilinadi:</Typography>
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
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                border: "1px solid lightgray",
                width: "100%",
                height: "250px",
                mt: { xs: 5, md: 9 },
                p: 2,
                ml: 10,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',  // Center vertically
                alignItems: 'center'       // Center horizontally
              }}
            >
              <Typography variant="h6" align="center">Buyurtmangiz</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                <Typography>Mahsulotlar ({totalItems})</Typography>
                <Typography>{totalPrice.toLocaleString()} so'm</Typography>
              </Box>
              <Typography variant='body2' sx={{ border: "1px solid #7000ff", mt: 1, fontSize: '13px', color: '#7000ff', textAlign: 'center', width: '100%' }}>
                Yetkazib berish M06 8 (Ertaga)
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: "30px", width: '100%' }}>
                <Typography>Jami:</Typography>
                <Typography variant="h6">{totalPrice.toLocaleString()} so'm</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Typography variant="body2" sx={{ color: 'green' }}>
                  Tejovingiz: 0 so'm
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Button sx={{ bgcolor: '#7733FF', width: "90%", height: "6vh", borderRadius: "10px", mt: 2, color: 'white', '&:hover': { bgcolor: '#572EB3' } }}>
                Rasmiylashtirishga o'tish
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BagPage;
