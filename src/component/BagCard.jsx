import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Box, Button, Checkbox, CircularProgress, Divider, Typography } from "@mui/material";
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
            p: 2,
            height: "170px",
            width: "820px", // Set the fixed width
            border: "1px solid #ccc", // Add border with light gray color
            position: "relative", // Set position to relative
            borderRadius: '8px', // Add rounded corners
          }}
        >
          <Checkbox sx={{ position: 'absolute', top: '8px', left: '14px' }} />
          <Typography variant='h8' sx={{ position: 'absolute', left: '54px' }}>Hammasini yechish</Typography>
          <Typography variant='h8' sx={{ position: 'absolute', left: '64%', fontSize: '12px', color: 'gray' }}>Yetkazib berishning eng yaqin sanasi:</Typography>
          <Typography variant='h8' sx={{ border: "1px solid #7000ff", position: 'absolute', left: '88%', fontSize: '13px', color: '#7000ff' }}>M06 8(Ertaga)</Typography>
          <Divider sx={{ bgcolor: '#E6E6E6', position: "absolute", top: "52px", width: "96%" }} /> {/* Horizontal line above the content */}

          <Box display="flex" alignItems="center" justifyContent="space-between" height="100%" sx={{ marginTop: '12px' }}>
            <Box display="flex" alignItems="center">
              <Checkbox />
              <Avatar src={goods.media[0]} alt={goods.title} sx={{ width: 100, height: 90, ml: 1 }} />
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="flex-start" ml={2}>
              <Typography variant="h7" sx={{ color: 'grey', marginLeft: '-77%', marginTop: '-19px', position: 'absolute' }} >{goods.title.slice(0, 40)}</Typography>
              <Typography variant='h7' sx={{ color: "lightgrey", marginTop: '20px', marginLeft: '-77%', position: 'absolute' }}>Sotuvchi:</Typography>
            </Box>
            <Button
              onClick={handleDelete}
              variant="contained"
              sx={{
                mt: -7,
                bgcolor: "#fff",
                color: "gray",
                boxShadow: "none",
                p: '8px 16px', // Adjust padding
                "&:hover": {
                  color: "black",
                },
                position: 'absolute', // Position the button
                right: '20px', // Adjust right position
              }}
            >
              {isDeleting ? <CircularProgress size={24} /> : (
                <>
                  <DeleteIcon sx={{ mr: 1 }} />
                  Yo'q qilish
                </>
              )}
            </Button>
            <Typography variant="h6" sx={{ position: 'absolute', right: '20px', bottom: '50px' }}>{goods.price} so'm</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default BagCard;
