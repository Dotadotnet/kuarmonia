import { toast } from "react-hot-toast";

export const handleEdit = (item, setViewState,setModalState) => {
  setModalState(true);
  setViewState(item);
};
  
export const handleDelete = async (item, updateItem, refetch) => {
    try {
      const response = await updateItem({ id: item._id, isDeleted: true }).unwrap();
      if (response.success) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("خطا رد حذف ", error);
    }
  };

 export const handleStatus = async (item, updateItem,refetch) => {
    try {
      const newStatus = item.status === 'active' ? 'inActive' : 'active';

      const response = await updateItem({
        id: item._id,
        status: newStatus,
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("خطا در تغییر ");
      console.error("Error toggling status", error);
    }
  };
  
export const handleView = (item, setViewState, togglePopover) => {
    setViewState(item);
    togglePopover(item);
  };
  
  export const openModal = (setModalState, setViewState) => {
    setModalState(true);
    setViewState(null);
  };
  
  export const toggleTooltipPopover = (item, setViewState, setPopoverState, isPopoverOpen) => {
    setViewState(item);
    setPopoverState(!isPopoverOpen);
  };
  
  export const handleClose = (setTagToEdit, setEditModalState, setModalState) => {
    setTagToEdit(null);
    setEditModalState(false);
    setModalState(false);
  };
  

export const handleSetGalleryPreview = (event, setGalleryPreview) => {
  const files = event.target.files;
  const previewImages = [];

  if (files.length > 5) {
    alert("You can only upload a maximum of 5 images.");
    window.location.reload();
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      previewImages.push(e.target.result);
      if (previewImages.length === files.length) {
        setGalleryPreview(previewImages);
      }
    };

    reader.readAsDataURL(file);
  }
};


export const toggleFullscreen = (previewRef) => {
  if (document.fullscreenElement === previewRef.current) {
    // خروج از fullscreen
    document.exitFullscreen().catch((err) => {
      console.error("Error exiting fullscreen: ", err);
    });
  } else {
    // ورود به fullscreen
    if (previewRef.current.requestFullscreen) {
      previewRef.current.requestFullscreen().catch((err) => {
        console.error("Error entering fullscreen: ", err);
      });
    }
  }
};