import Swal from "sweetalert2"
import MenuItemModal from "../../components/menuItem/MenuItemModal"
import MenuItemTable from "../../components/menuItem/MenuItemTable"
import { useGetMenuItemsQuery, useCreateMenuItemMutation, useDeleteMenuItemMutation, useUpdateMenuItemMutation } from "../../store/api/menuItemsApi"
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

function MenuItemMangement() {

  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState(null)

  const { data: menuItems = [], isLoading, error, refetch } = useGetMenuItemsQuery()
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    specialTag: "",
    image: null
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      specialTag: "",
      image: null
    })
  }


  const handlecloseModal = () => {
    setShowModal(false)
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      //call api to create
      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Category", formData.category);
      formDataToSend.append("Description", formData.description);
      formDataToSend.append("Price", formData.price);
      formDataToSend.append("SpecialTag", formData.specialTag);
      if (formData.image) {
        formDataToSend.append("File", formData.image);
      }

      if (selectedMenuItem) {
        formDataToSend.append("Id", selectedMenuItem.id);
      }


       let result;
      if (selectedMenuItem) {
        //edit mode
        result = await updateMenuItem({
          id: selectedMenuItem.id,
          formData: formDataToSend,
        });
        if (result.isSuccess !== false) {
          toast.success("Menu item updated successfully!");
          refetch();
        } else {
          toast.error("Failed to updated menu item");
        }
      } else {
        result = await createMenuItem(formDataToSend);
        if (result.isSuccess !== false) {
          toast.success("Menu item created successfully!");
          refetch();
        } else {
          toast.error("Failed to create menu item");
        }
      }

      setShowModal(false)
      resetForm()
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMenuItem = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteMenuItem(item.id);

      Swal.fire({
        title: "Deleted!",
        text: "Menu Item has been deleted.",
        icon: "success",
      });
    }
  };


  const handleEditMenuItem = async (item) => {
    setSelectedMenuItem(item)

    setFormData({
      name: item.name ?? "",
      description: item.description ?? "",
      category: item.category ?? "",
      price: item.price ?? "",
      specialTag: item.specialTag ?? "",
      image: null
    });

    setShowModal(true)

  }

  const handleAddMenuItem = () => {
    resetForm()
    setSelectedMenuItem(null)
    setShowModal(true)
  }

  return (

    <>

    <div
  className="d-flex flex-column p-4"
  style={{ height: "calc(100vh - 130px)", overflow: "hidden" }}
  //                              ↑ 70px navbar + 60px footer
>  
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Menu Item Management</h2>
          <p className="text-muted mb-0">Manage your restaurant's menu items</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddMenuItem}>
          <i className="bi bi-plus-circle me-2"></i>Add Menu Item
        </button>
      </div>

      {/* Card — flex-grow so it fills all remaining height */}
      <div className="card flex-grow-1 overflow-hidden">
        <div className="card-body d-flex flex-column overflow-hidden p-0">
          <MenuItemTable
            menuItems={menuItems}
            isLoading={isLoading}
            error={error}
            onDelete={handleDeleteMenuItem}
            onEdit={handleEditMenuItem}
          />
        </div>
      </div>

      {showModal && (
        <MenuItemModal
          onClose={handlecloseModal}
          isSubmitting={isSubmitting}
          formdata={formData}
          onSubmit={handleFormSubmit}
          onChange={handleInputChange}
          isEditing={!!selectedMenuItem}
        />
      )}
    </div>
    </>
  )
}

export default MenuItemMangement