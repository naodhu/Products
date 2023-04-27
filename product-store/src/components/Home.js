import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import { animated, useSpring } from "react-spring";
import ParticlesBg from "particles-bg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";

const Home = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 2000 },
  });

  const slideIn = useSpring({
    from: { transform: "translate3d(-100%, 0, 0)" },
    to: { transform: "translate3d(0%, 0, 0)" },
    config: { duration: 1000 },
  });

  const scaleUp = useSpring({
    from: { transform: "scale(0.5)" },
    to: { transform: "scale(1)" },
    config: { duration: 1000 },
  });

  const slideDown = useSpring({
    from: { transform: "translate3d(0, -50px, 0)" },
    to: { transform: "translate3d(0, 0, 0)" },
    config: { duration: 1000 },
  });

  return (
    <>
      <ParticlesBg type="cobweb" bg={true} />
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, mt: 4 }}>
        <animated.div style={fadeIn}>
          <Typography variant="h2" align="center" gutterBottom>
            Welcome to the Product Store
          </Typography>
        </animated.div>
        <animated.div style={slideDown}>
          <Typography variant="h6" align="center" gutterBottom>
            Discover a wide range of products, handpicked to suit your needs!
          </Typography>
        </animated.div>
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <animated.div style={scaleUp}>
            <StoreIcon fontSize="large" />
          </animated.div>
          <animated.div style={scaleUp}>
            <ShoppingCartIcon fontSize="large" />
          </animated.div>
        </Box>
        <animated.div style={{ ...slideIn, ...scaleUp }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            component={Link}
            to="/products"
          >
            View Products
          </Button>
        </animated.div>
      </Container>
    </>
  );
};

export default Home;
