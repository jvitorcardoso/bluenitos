const buttons = {
  sizes: {
    nav: {
      p: "0",
      w: "18",
      h: "18",
    },
  },
  variants: {
    solid: {
      bgColor: "brand.300",
      color: "brand.700",
      _hover: {
        bgColor: "brand.800",
      },
    },
    unstyled: {
      color: "brand.800",
      bg: "transparent",
      _hover: {
        color: "brand.300",
      },
    },
    nav: {
      color: "brand.800",
      bgColor: "transparent",
      _hover: {
        color: "brand.500",
      },
    },
  },
};

export default buttons;
