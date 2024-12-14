import { useNavigate } from "react-router-dom";
import CreateInterface from "../../components/interface/createInterface";
import { useState } from "react";
import PostRequest from "../../hooks/PostRequest";
import CreatedPrompt from "../../components/prompts/createdPrompt";

function CreateTransactions() {
  const navigate = useNavigate();
  const [showCreated, setShowCreated] = useState(false);
  const [errors, setErrors] = useState({}); // Track errors for fields

  const [formValues, setFormValues] = useState({
    inventoryName: "",
    type: "",
    category: "",
    quantity: "",
    unitPrice: "",
    status: "",
    description: "",
  });

  const inventoryInput = [
    {
      label: "Inventory Name",
      type: "text",
      id: "inventoryName",
      name: "inventoryName",
      placeholder: "Enter Inventory Name",
    },
    {
      label: 'Stock Type',
      type: 'select',
      id: 'type',
      name: 'type',
      options: [
        'Goods',
        'Service'
      ]
    },
    {
      label: "Category",
      type: "select",
      id: "category",
      name: "category",
      options: [
        "Raw Materials",
        "Finished Goods",
        "Work-in-Progress",
        "Consumables",
        "Office Supplies",
        "Machinery and Equipment",
        "Furniture",
        "Electronics",
        "Vehicles",
        "Health and Safety",
        "Packaging Materials",
        "Perishable Goods",
        "Non-Perishable Goods",
        "Tools",
        "Miscellaneous",
      ],
    },
    {
      label: "Quantity",
      type: "number",
      id: "quantity",
      name: "quantity",
      placeholder: "Enter Quantity",
    },
    {
      label: "Unit Price",
      type: "number",
      id: "unitPrice",
      name: "unitPrice",
      placeholder: "Enter Unit Price",
    },
    {
      label: "Status",
      type: "select",
      id: "status",
      name: "status",
      options: [
        "In Stock",
        "Out of Stock",
        "Reserved",
        "On Order",
        "In Transit",
        "Backordered",
        "Pending",
        "Damaged",
        "Quarantined",
        "Returned",
        "Ready for Dispatch",
        "Under Maintenance",
        "Expired",
        "On Hold",
        "Sold",
        "Recalled",
        "Available for Allocation",
      ],
    },
    {
      label: "Description",
      type: "textarea",
      id: "description",
      name: "description",
      placeholder: "Enter Description",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined, // Remove error for this field on change
    }));
  };

  const validateFields = () => {
    const newErrors = {};

    // Required fields validation
    if (!formValues.inventoryName) newErrors.inventoryName = "Inventory Name is required.";
    if (!formValues.type) newErrors.type = "Stock Type is required.";
    if (!formValues.category) newErrors.category = "Category is required.";
    if (!formValues.quantity || formValues.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0.";
    if (!formValues.unitPrice || formValues.unitPrice <= 0) newErrors.unitPrice = "Unit Price must be greater than 0.";
    if (!formValues.status) newErrors.status = "Status is required.";
    if (!formValues.description) newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateFields()) {
      return;
    }

    const formData = { ...formValues };

    try {
      const response = await PostRequest(`create-inventory`, formData);
      if (!response) throw new Error("Error creating inventory item");

      setShowCreated(true);
      setTimeout(() => {
        setShowCreated(false);
        navigate(`/home/inventory`);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div>
      <CreateInterface
        mainText={`Create Inventory`}
        formInput={inventoryInput}
        formValues={formValues}
        inputChange={handleInputChange}
        errors={errors} // Pass errors to display in the form
        onClose={onClose}
        onSubmit={handleSubmit}
      />
      {showCreated && (
        <CreatedPrompt 
          subtext="The inventory item has been successfully created"
          close={() => navigate(`/home/inventory`)}
        />
      )}
    </div>
  );
}

export default CreateTransactions;
