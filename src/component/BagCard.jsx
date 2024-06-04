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
        <Box bgcolor={"#fff"} boxShadow={3} p={2} m={1} height="200px">
          <Box display="flex" alignItems="center" justifyContent="space-between" height="100%">
            <Box display="flex" alignItems="center">
              <Checkbox />
              <Avatar src={goods.media[0]} alt={goods.title} style={{ width: '80px', height: '80px', marginLeft: '8px' }} />
              <Box display="flex" flexDirection="column" justifyContent="flex-start" marginLeft="16px">
                <Typography variant="h5">{goods.title.slice(0, 40)}</Typography>
              </Box>
            </Box>
            <Button onClick={handleDelete} variant="contained" color="secondary" style={{ marginTop: '16px', backgroundColor: '#fff', color: '#000' }}>
              {isDeleting ? <CircularProgress size={24} /> : (
                <>
                  <DeleteIcon style={{ marginRight: '8px' }} />
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
