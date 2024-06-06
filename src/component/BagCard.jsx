import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Box, Button, Checkbox, CircularProgress, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import GetGoods from "../hooks/getGoods";
import { useDeleteData, useEditData } from "../modules/context/https";

const BagCard = ({ goods }) => {
  const { bagGoods } = GetGoods();
  const [showElement, setShowElement] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteDataMutation = useDeleteData();
  const editDataMutation = useEditData();

  const res = useMemo(() => bagGoods.find((prod) => goods.id === prod.prod_id), [bagGoods, goods.id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true); // Start the loading state
      setShowElement(false); // Optimistic UI update
      await deleteDataMutation.mutateAsync(`/bag/${res.id}`);
      setIsDeleting(false); // End the loading state
    } catch (error) {
      console.error("error", error);
      setShowElement(true); // Revert optimistic UI update if error occurs
      setIsDeleting(false); // End the loading state
    }
  };

  return (
    <>
      {showElement && (
        <Box
          sx={{
            bgcolor: "#fff",
            boxShadow: 3,
            p: 2,
            m: 1,
            height: "150px",
            width: "600px", // Set the fixed width
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" height="100%">
            <Box display="flex" alignItems="center">
              <Checkbox />
              <Avatar src={goods.media[0]} alt={goods.title} sx={{ width: 80, height: 80, ml: 1 }} />
              <Box display="flex" flexDirection="column" justifyContent="flex-start" ml={2}>
                <Typography variant="h5">{goods.title.slice(0, 40)}</Typography>
              </Box>
            </Box>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
              sx={{ mt: 2, bgcolor: "#fff", color: "#000" }}
            >
              {isDeleting ? <CircularProgress size={24} /> : (
                <>
                  <DeleteIcon sx={{ mr: 1 }} />
                  Yo'q qilish
                </>
              )}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default BagCard;
