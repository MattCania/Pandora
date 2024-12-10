import { useNavigate } from "react-router-dom";
import CreateInterface from "../../components/interface/createInterface";
import { useState } from "react";
import PostRequest from "../../hooks/PostRequest";

function CreateTransactions() {
  const navigate = useNavigate();

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requiredFields = Object.keys(formValues).filter((key) => formValues[key] === "");

      if (requiredFields.length > 0) {
        throw new Error(`Please fill out the required field(s): ${requiredFields.join(", ")}`);
      }

      const response = await PostRequest(`create-inventory`, formValues);
      if (!response) throw new Error("Error creating inventory item");
	  else navigate(`/home/inventory`);
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
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateTransactions;
