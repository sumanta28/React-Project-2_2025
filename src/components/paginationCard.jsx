import React from "react";
import { Card, CardContent, Button, Box, Typography } from "@mui/material";

const PaginationCard = ({ page, setPage, totalPages }) => {
  const isLastPage = page + 1 >= totalPages;

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 420,
        boxShadow: 4,
        textAlign: "center",
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <CardContent>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "text.secondary" }}
        >
          Page: {page + 1} / {totalPages}
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          flexWrap="wrap"
          mt={1}
        >
          {/* Previous Button */}
          <Button
            variant="contained"
            color="secondary"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            sx={{
              borderRadius: "20px",
              px: 3,
              py: 1.2,
              fontWeight: "bold",
              textTransform: "none",
              minWidth: "110px",
              visibility: page === 0 ? "hidden" : "visible",
            }}
          >
            ⬅ Previous
          </Button>

          {/* Next Button */}
          <Button
            variant="contained"
            color="primary"
            disabled={isLastPage}
            onClick={() => setPage(page + 1)}
            sx={{
              borderRadius: "20px",
              px: 3,
              py: 1.2,
              fontWeight: "bold",
              textTransform: "none",
              minWidth: "110px",
              visibility: isLastPage ? "hidden" : "visible",
            }}
          >
            Next ➡
          </Button>

          {/* Last Page Button */}
          <Button
            variant="outlined"
            color="primary"
            disabled={isLastPage}
            onClick={() => setPage(totalPages - 1)}
            sx={{
              borderRadius: "20px",
              px: 3,
              py: 1.2,
              fontWeight: "bold",
              textTransform: "none",
              minWidth: "110px",
              visibility: isLastPage ? "hidden" : "visible",
            }}
          >
            Last ⏭
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaginationCard;
